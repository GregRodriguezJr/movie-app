import { useEffect, useState } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favMovies, setFavMovies] = useState([]);

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
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_Key}&language=en-US&page=1&include_adult=false`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
    setPopularMovies(data.results);
    console.log(data.results);
  }

  // Read favorites from firebase
  useEffect(()=> {
    const q = query(collection(db,'favorite_movies'))
    const unsubscribe = onSnapshot(q, (QuerySnapshot)=> {
      let favMoviesArr = []
      QuerySnapshot.forEach((doc)=>{
        favMoviesArr.push({...doc.data(), id: doc.id})
      });
      setFavMovies(favMoviesArr)
    });
    return () => unsubscribe;
  },[])

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

      <div className='d-flex align-items-center justify-content-center flex-wrap my-2'>
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
          movies = {favMovies} 
          favComponent={RemoveFavorites} 
          handleFavoritesClick={removeFavoriteMovie} 
      />
    </div>
  );
}

export default App;
