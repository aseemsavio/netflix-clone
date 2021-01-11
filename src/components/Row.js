import React, { useState, useEffect } from 'react'
import axios from '../axios'
import './Row.css'


function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setmovies] = useState([]);
    const baseUrl = "https://image.tmdb.org/t/p/original/"

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

    return (
        <div className="row">
            <h3>{title}</h3>
            <div className='row__posters'>
                {movies.map(movie => {
                    return (<img
                        key={movie.id}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${baseUrl}${isLargeRow ? movie.poster_path: movie.backdrop_path}`}
                        alt={movie.name}
                    />);
                })}
            </div>
        </div>
    )
}

export default Row
