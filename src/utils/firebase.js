// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4aTNuM92Livxrn8mgCZhLZUSyrgZRnCA",
  authDomain: "netflixgpt-eb40f.firebaseapp.com",
  projectId: "netflixgpt-eb40f",
  storageBucket: "netflixgpt-eb40f.appspot.com",
  messagingSenderId: "282974113933",
  appId: "1:282974113933:web:8dd112379b6c35d3c9d2c4",
  measurementId: "G-9SPKZDJ2E8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
