import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getSearchedMovies = async (searchValue) => {
    // Pass searchValue from user input to enter into search query
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_Key}&language=en-US&page=1&include_adult=false&query=${searchValue}`;
    const response = await fetch(url);
    const data = await response.json();
    // Conditional to check if input has a value
    if(data.results) {
      setMovies(data.results);
    };
  }

  // API call to moviedb to get current popular movies
  const getPopularMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_Key}&language=en-US&page=1`;
    const response = await fetch(url);
    const data = await response.json();
    setPopularMovies(data.results);
    console.log(data.results);
  }

  // When search value changes getSearchedMovies is ran
  useEffect(() => {
    getSearchedMovies(searchValue);
  }, [searchValue]);

  // Onload run function only once
  useEffect(() => {
    getPopularMovies();
  }, []);

  const addFavoriteMovie = (movie) => {
    // Conditional to prevent duplicate movies
    if(favorites.includes(movie)) {
      return;
    }
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
  }

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
        (favorite) => favorite.id !== movie.id
    );
    setFavorites(newFavoriteList);
  }
  
  return (
    <div className='container'>

      {/* Header */}

      <div className='d-flex align-items-center justify-content-center flex-wrap my-3'>
        < MovieListHeading heading = {"Movie App"} />
        < SearchBox 
          searchValue={searchValue} 
          setSearchValue={setSearchValue} 
        />
      </div>

      {/* Popular Movies Section */} 

      < MovieListHeading heading = {"Popular"} />
      < MovieList 
          movies={popularMovies} 
          favComponent={AddFavorites} 
          handleFavoritesClick={addFavoriteMovie} 
      />

      {/* Search Results Section */}

      < MovieListHeading heading = {"Search Results"} />
      < MovieList 
          movies={movies} 
          favComponent={AddFavorites} 
          handleFavoritesClick={addFavoriteMovie} 
      />

      {/* Favorite Movies Section */}

      < MovieListHeading heading = {"Favorites"} />
      < MovieList 
          movies = {favorites} 
          favComponent={RemoveFavorites} 
          handleFavoritesClick={removeFavoriteMovie} 
      />
    </div>
  );
}

export default App;
