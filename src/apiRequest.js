import axios from "axios";
const key = process.env.REACT_APP_MOVIE_DB_Key;

export const getPopularMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1&include_adult=false`;
  const { data } = await axios.get(url);
  return data.results;
};

export const getSearchedMovies = async (searchValue, setMovies) => {
  // Pass searchValue from user input to enter into search query
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${searchValue}`;
  const { data } = await axios.get(url);
  const resultsList = data.results;
  // Filter out movies with no poster
  const filteredList = resultsList.filter((item) => item.poster_path !== null);
  setMovies(filteredList);
};

export const getMoviesByGenre = async (genreId, setter) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${genreId}&language=en-US`;
  const { data } = await axios.get(url);
  console.log(data.results);
  setter(data.results);
};

export const getTrailer = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}&language=en-US`;
  try {
    const { data } = await axios.get(url);
    return data.results[0];
  } catch (error) {
    return error;
  }
};
