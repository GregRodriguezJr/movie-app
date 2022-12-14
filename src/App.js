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
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [drama, setDrama] = useState([]);

  // API call to moviedb to get current popular movies
  useEffect(() => {
    const getPopularData = async () => {
      const popularData =  await getPopularMovies();
      setPopularMovies(popularData);
    }
    getPopularData();
  }, []);

  useEffect(() => {
    // Read favorites from firebase
    getFavorites(db,setFavMovies);
    // API call for genres
    getMoviesByGenre(28, setAction);
    getMoviesByGenre(35, setComedy);
    getMoviesByGenre(18, setDrama);
    getMoviesByGenre(27, setHorror);
  }, []);

  // When search value changes getSearchedMovies is ran
  useEffect(() => {
    if(!searchValue) return;
    getSearchedMovies(searchValue, setMovies);
  }, [searchValue]);

  return (
    <div className="container py-4 pt-lg-0">

      {/* Header */}
      <div className="d-flex align-items-center justify-content-evenly flex-wrap">
        <img 
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
          className="mx-2"
        />
        <div className="d-flex align-items-center flex-wrap my-4">
          <h1 className="mx-3">Movie App</h1>
          <SearchBox value={searchValue} setSearchValue={setSearchValue} />
          <Button className="m-3" onClick={()=> setSearchValue("")}>Clear Results</Button>
        </div>
      </div>
      <hr></hr>

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

      {/* Action Movies Section */}
      <MovieListHeading heading={"Action"} />
      <MovieList
        movies={action}
        favComponentIcon={AddFavoritesIcon}
        handleFavoritesClick={addFavoriteMovie}
      />
      <hr></hr>

      {/* Comedy Movies Section */}
      <MovieListHeading heading={"Comedy"} />
      <MovieList
        movies={comedy}
        favComponentIcon={AddFavoritesIcon}
        handleFavoritesClick={addFavoriteMovie}
      />
      <hr></hr>

      {/* Horror Movies Section */}
      <MovieListHeading heading={"Horror"} />
      <MovieList
        movies={horror}
        favComponentIcon={AddFavoritesIcon}
        handleFavoritesClick={addFavoriteMovie}
      />
      <hr></hr>

      {/* Drama Movies Section */}
      <MovieListHeading heading={"Drama"} />
      <MovieList
        movies={drama}
        favComponentIcon={AddFavoritesIcon}
        handleFavoritesClick={addFavoriteMovie}
      />
      
    </div>
  );
};

export default App;
