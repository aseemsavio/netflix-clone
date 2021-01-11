import React, { useState, useEffect } from 'react'
import axios from '../axios'
import './Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';


function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setmovies] = useState([]);
    const baseUrl = "https://image.tmdb.org/t/p/original/"
    const [trailerUrl, setTrailerUrl] = useState("");

    const youtubeOptions = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    // fetchUrl is added as a dependency in useEffect as it should be.
    // When ever we use an outside variable inside useEfefct, we need to mention that
    // as a dependency in useEffect's [].
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(fetchUrl);
            setmovies(response.data.results);
            return response.data.results;
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = (movie) => {
        // This will close out the youtube video that is already playing.
        if (trailerUrl) {
            setTrailerUrl("")
        } else {
            movieTrailer(movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error))
        }
    }

    return (
        <div className="row">
            <h3>{title}</h3>
            <div className='row__posters'>
                {movies.map(movie => {
                    return (<img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${baseUrl}${isLargeRow ? movie.poster_path: movie.backdrop_path}`}
                        alt={movie.name}
                    />);
                })}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={youtubeOptions}/>}
        </div>
    )
}

export default Row
