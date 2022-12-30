export const getPopularMovies = async (setPopularMovies) => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_Key}&language=en-US&page=1&include_adult=false`;
  const response = await fetch(url);
  const data = await response.json();
  setPopularMovies(data.results);
};
