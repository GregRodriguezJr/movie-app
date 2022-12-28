// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_Key,
  authDomain: "movie-app-43dca.firebaseapp.com",
  projectId: "movie-app-43dca",
  storageBucket: "movie-app-43dca.appspot.com",
  messagingSenderId: "943041938312",
  appId: "1:943041938312:web:792f1f7cfb75c39bab703d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)