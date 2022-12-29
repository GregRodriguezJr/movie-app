import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavoritesIcon from "./components/AddFavoritesIcon";
import RemoveFavorites from "./components/RemoveFavorites";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase";
import { async } from "@firebase/util";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
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
    const q = query(collection(db, "favorite_movies"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let favMoviesArr = [];
      QuerySnapshot.forEach((doc) => {
        favMoviesArr.push({ ...doc.data(), id: doc.id });
      });
      setFavMovies(favMoviesArr);
    });
    return () => unsubscribe;
  }, []);

  // When search value changes getSearchedMovies is ran
  useEffect(() => {
    getSearchedMovies(searchValue);
  }, [searchValue]);

  // Onload run function only once
  useEffect(() => {
    getPopularMovies();
  }, []);

  // Create new favorite movie in firebase
  const addFavoriteMovie = async (movie) => {
    // TODO! Conditional to prevent duplicate movies
    await addDoc(collection(db, "favorite_movies"), {
      title: movie.title,
      overview: movie.overview,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
    });
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.id !== movie.id
    );
    setFavorites(newFavoriteList);
  };

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
        favComponent={AddFavoritesIcon}
        handleFavoritesClick={addFavoriteMovie}
      />
      <hr></hr>

      {/* Favorite Movies Section */}
      <MovieListHeading heading={"Favorites"} />
      <MovieList
        movies={favMovies}
        favComponent={RemoveFavorites}
        handleFavoritesClick={removeFavoriteMovie}
      />
      <hr></hr>

      {/* Popular Movies Section */}
      <MovieListHeading heading={"Popular"} />
      <MovieList
        movies={popularMovies}
        favComponent={AddFavoritesIcon}
        handleFavoritesClick={addFavoriteMovie}
      />

    </div>
  );
};

export default App;
