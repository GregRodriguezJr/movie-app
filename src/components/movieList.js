import React from "react";

const MovieList = (props) => {
    const baseImgUrl = "https://image.tmdb.org/t/p/w500";
    return (
        <>
            {props.movies.map((movie, index) => (
                <div className="m-3 image-container">
                    <img src={baseImgUrl + movie.poster_path} />
                    <div className="overlay d-flex align-items-center justify-content-center"></div>
                </div>
            ))}
        </>
    )
}

export default MovieList;