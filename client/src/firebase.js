// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-realstate-pr-home.firebaseapp.com",
  projectId: "mern-realstate-pr-home",
  storageBucket: "mern-realstate-pr-home.appspot.com",
  messagingSenderId: "321192976658",
  appId: "1:321192976658:web:433ae4434af9670f72d3cb",
  measurementId: "G-ZDXNKZKH10"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
