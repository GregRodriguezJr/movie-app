import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavoritesIcon from "./components/AddFavoritesIcon";
import RemoveFavoritesIcon from "./components/RemoveFavoritesIcon";
import { db } from "./firebase";
import { addFavoriteMovie, getFavorites, removeFavoriteMovie } from "./Crud";
import { getPopularMovies, getSearchedMovies } from "./apiRequest";
import { Button } from "react-bootstrap";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favMovies, setFavMovies] = useState([]);

  // API call to moviedb to get current popular movies
  useEffect(() => {
    const getPopularData = async () => {
      const popularData =  await getPopularMovies();
      setPopularMovies(popularData);
    }
    getPopularData();
  }, []);

  // Read favorites from firebase
  useEffect(() => {
    getFavorites(db,setFavMovies);
  }, []);

  // When search value changes getSearchedMovies is ran
  useEffect(() => {
    if(!searchValue) return;
    getSearchedMovies(searchValue, setMovies);
  }, [searchValue]);

  const clearSearch = () => {
    setSearchValue("");
  }

  return (
    <div className="container">

      {/* Header */}
      <div className="d-flex align-items-center justify-content-center flex-wrap my-4">
        <h1 className="m-0">Movie App</h1>
        <SearchBox value={searchValue} setSearchValue={setSearchValue} />
        <Button className="m-2" onClick={clearSearch}>Clear</Button>
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
