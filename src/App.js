import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/movieList';

const App = () => {
  const [movies, setMovies] = useState([]);

  const getSearchedMovies = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_Key}&language=en-US&page=1&include_adult=false&query=batman`;
    const response = await fetch(url);
    const data = await response.json();
    setMovies(data.results);
  }

  useEffect(() => {
    getSearchedMovies();
  }, []);
  
  return (
    <div className='container-fluid'>
      <div className="d-flex justify-content-start movie-app-row">
        <MovieList movies = {movies} />
      </div>
    </div>
  );
}

export default App;
