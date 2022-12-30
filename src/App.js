import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavoritesIcon from "./components/AddFavoritesIcon";
import RemoveFavoritesIcon from "./components/RemoveFavoritesIcon";
import { db } from "./firebase";
import { addFavoriteMovie, getFavorites, removeFavoriteMovie } from "./Crud";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favMovies, setFavMovies] = useState([]);

  const getSearchedMovies = async (searchValue) => {
    // Pass searchValue from user input to enter into search query
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_Key}&language=en-US&page=1&include_adult=false&query=${searchValue}`;
    const response = await fetch(url);
    const data = await response.json();
    const resultsList = data.results;
    // Filter out movies with no poster
    const filteredList = resultsList.filter(
      (item) => item.poster_path !== null
    );
    setMovies(filteredList);
  };

  // API call to moviedb to get current popular movies
  const getPopularMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_Key}&language=en-US&page=1&include_adult=false`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
    setPopularMovies(data.results);
    console.log(data.results);
  };

  // Read favorites from firebase
  useEffect(() => {
    getFavorites(db,setFavMovies);
  }, []);

  // When search value changes getSearchedMovies is ran
  useEffect(() => {
    getSearchedMovies(searchValue);
  }, [searchValue]);

  // Onload run function only once
  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <div className="container">

      {/* Header */}
      <div className="d-flex align-items-center justify-content-center flex-wrap my-4">
        <h1 className="m-0">Movie App</h1>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      {/* Search Results Section */}
      <MovieListHeading heading={"Search Results"} />
      <MovieList
        movies={movies}
        favComponentIcon={AddFavoritesIcon}
        handleFavoritesClick={addFavoriteMovie}
      />
      <hr></hr>

      {/* Favorite Movies Section */}
      <MovieListHeading heading={"Favorites"} />
      <MovieList
        movies={favMovies}
        favComponentIcon={RemoveFavoritesIcon}
        handleFavoritesClick={removeFavoriteMovie}
      />
      <hr></hr>

      {/* Popular Movies Section */}
      <MovieListHeading heading={"Popular"} />
      <MovieList
        movies={popularMovies}
        favComponentIcon={AddFavoritesIcon}
        handleFavoritesClick={addFavoriteMovie}
      />

    </div>
  );
};

export default App;
