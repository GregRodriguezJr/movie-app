import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/movieList';

const App = () => {
  const [movies, setMovies] = useState([
    {
      "adult": false,
      "backdrop_path": "/oTPSjQyETTFYDehdbiG8yi2oDmL.jpg",
      "genre_ids": [
          28,
          16,
          878,
          10751
      ],
      "id": 13640,
      "original_language": "en",
      "original_title": "Superman: Doomsday",
      "overview": "When LexCorp accidentally unleashes a murderous creature, Superman meets his greatest challenge as a champion. Based on the \"The Death of Superman\" storyline that appeared in DC Comics' publications in the 1990s.",
      "popularity": 64.839,
      "poster_path": "/itvuWm7DFWWzWgW0xgiaKzzWszP.jpg",
      "release_date": "2007-09-18",
      "title": "Superman: Doomsday",
      "video": false,
      "vote_average": 6.7,
      "vote_count": 504
    },
    {
      "adult": false,
      "backdrop_path": "/v6MVBFnQOscITvmAy5N5ras2JKZ.jpg",
      "genre_ids": [
          878,
          28,
          12
      ],
      "id": 1924,
      "original_language": "en",
      "original_title": "Superman",
      "overview": "Mild-mannered Clark Kent works as a reporter at the Daily Planet alongside his crush, Lois Lane. Clark must summon his superhero alter-ego when the nefarious Lex Luthor launches a plan to take over the world.",
      "popularity": 40.771,
      "poster_path": "/d7px1FQxW4tngdACVRsCSaZq0Xl.jpg",
      "release_date": "1978-12-13",
      "title": "Superman",
      "video": false,
      "vote_average": 7.1,
      "vote_count": 3141
    },
    {
      "adult": false,
      "backdrop_path": "/v6MVBFnQOscITvmAy5N5ras2JKZ.jpg",
      "genre_ids": [
          878,
          28,
          12
      ],
      "id": 1924,
      "original_language": "en",
      "original_title": "Superman",
      "overview": "Mild-mannered Clark Kent works as a reporter at the Daily Planet alongside his crush, Lois Lane. Clark must summon his superhero alter-ego when the nefarious Lex Luthor launches a plan to take over the world.",
      "popularity": 40.771,
      "poster_path": "/d7px1FQxW4tngdACVRsCSaZq0Xl.jpg",
      "release_date": "1978-12-13",
      "title": "Superman",
      "video": false,
      "vote_average": 7.1,
      "vote_count": 3141
    },
  ]);

  const getSearchedMovies = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_Key}&language=en-US&page=1&include_adult=false&query=superman`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
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
