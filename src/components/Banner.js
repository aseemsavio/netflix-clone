import React, { useState, useEffect } from 'react'
import axios from '../axios';
import requests from '../requests';
import './Banner.css'

function Banner() {

    const [movie, setmovie] = useState({})
    const baseUrl = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(requests.fetchNetflixOriginals);
            setmovie(response.data.results[Math.floor(Math.random() * response.data.results.length - 1)]);
            return response;
        }
        fetchData();
    }, []);

    function truncateString(str, num) {
        if (str?.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(${baseUrl}${movie?.backdrop_path})`,
                backgroundPosition: "center center"
            }}>
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

                <div className="banner__buttons">
                    <button className="banner__button">
                        Play
                </button>
                    <button className="banner__button">
                        My List
                </button>
                </div>
                <div className="banner__description">
                    <h4>{truncateString(movie?.overview, 150)}</h4>
                </div>
            </div>
            <div className="banner__fadeBottom" />
        </header>
    )
}

export default Banner
