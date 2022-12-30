import axios from "axios";

export const getPopularMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_Key}&language=en-US&page=1&include_adult=false`;
  const { data } = await axios.get(url);
  return data.results;
};

export const getSearchedMovies = async (searchValue, setMovies) => {
  // Pass searchValue from user input to enter into search query
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_Key}&language=en-US&page=1&include_adult=false&query=${searchValue}`;
  const { data } = await axios.get(url);
  const resultsList = data.results;
  // Filter out movies with no poster
  const filteredList = resultsList.filter((item) => item.poster_path !== null);
  setMovies(filteredList);
};
