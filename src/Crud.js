import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

// Create
export const addFavoriteMovie = async (movie) => {
    // Query to search for a movie with the same title
    const q = query(collection(db, "favorite_movies"), where("title", "==", movie.title));
    // Execute the query
    const querySnapshot = await getDocs(q);
    // If the movie doesn't exist, add it to the firebase collection
    if(querySnapshot.empty) {
        await addDoc(collection(db, "favorite_movies"), {
          title: movie.title,
          overview: movie.overview,
          vote_average: movie.vote_average,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
        });
    } else {
        alert(`Movie "${movie.title}" already exists in favorites.`)
    }
  };

// Delete
export const removeFavoriteMovie = async (movie) => {
    await deleteDoc(doc(db, "favorite_movies", movie.id));
  };