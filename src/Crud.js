import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

  // Create new favorite movie in firebase
export const addFavoriteMovie = async (movie) => {
    // TODO! Conditional to prevent duplicate movies
    await addDoc(collection(db, "favorite_movies"), {
      title: movie.title,
      overview: movie.overview,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
    });
  };