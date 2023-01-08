import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavoritesIcon from "./components/AddFavoritesIcon";
import RemoveFavoritesIcon from "./components/RemoveFavoritesIcon";
import { db } from "./firebase";
import { addFavoriteMovie, getFavorites, removeFavoriteMovie } from "./Crud";
import { getMoviesByGenre, getPopularMovies, getSearchedMovies } from "./apiRequest";
import { Button } from "react-bootstrap";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favMovies, setFavMovies] = useState([]);
  const [ horror, setHorror] = useState([]);

  // API call to moviedb to get current popular movies
  // useEffect(() => {
  //   const getPopularData = async () => {
  //     const popularData =  await getPopularMovies();
  //     setPopularMovies(popularData);
  //   }
  //   getPopularData();
  // }, []);

  useEffect(() => {
    // Read favorites from firebase
    getFavorites(db,setFavMovies);
    // 
    getMoviesByGenre(27, setHorror);
  }, []);

  // When search value changes getSearchedMovies is ran
  useEffect(() => {
    if(!searchValue) return;
    getSearchedMovies(searchValue, setMovies);
  }, [searchValue]);

  return (
    <div className="container">

      {/* Header */}
      <div className="d-flex align-items-center justify-content-center flex-wrap my-4">
        <h1>Movie App</h1>
        <SearchBox value={searchValue} setSearchValue={setSearchValue} />
        <Button className="my-3" onClick={()=> setSearchValue("")}>Clear Results</Button>
      </div>

      {/* Search Results Section will render if input changes */}
      {searchValue && 
        <>
          <MovieListHeading heading={"Search Results"} />
          <MovieList
            movies={movies}
            favComponentIcon={AddFavoritesIcon}
            handleFavoritesClick={addFavoriteMovie}
          />
          <hr></hr>
        </>
      }

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
      <hr></hr>

      {/* Popular Movies Section */}
      <MovieListHeading heading={"Horror"} />
      <MovieList
        movies={horror}
        favComponentIcon={AddFavoritesIcon}
        handleFavoritesClick={addFavoriteMovie}
      />
      
    </div>
  );
};

export default App;
