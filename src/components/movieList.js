import React from "react";
import PosterHeader from "./PosterHeader";

const MovieList = (props) => {
const baseImgUrl = "https://image.tmdb.org/t/p/w500";
const FavoriteComponent = props.favComponent;
return (
  <>
    {props.movies.map((movie, index) => (
        <div className="m-3 image-container">
            <div className="header-overlay">
              <PosterHeader movie={movie}/>
            </div>
            <img src={baseImgUrl + movie.poster_path} />
            <div 
				      onClick={() => props.handleFavoritesClick(movie)}
				      className="overlay d-flex align-items-center justify-content-center">
              <FavoriteComponent />
            </div>
        </div>
    ))}
  </>
)
}

export default MovieList;