// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtSOW4qhi0EDTJkGWuKXBC2iyIqFApMFE",
  authDomain: "aitravel-7a10c.firebaseapp.com",
  projectId: "aitravel-7a10c",
  storageBucket: "aitravel-7a10c.firebasestorage.app",
  messagingSenderId: "30076406351",
  appId: "1:30076406351:web:29309a05a7510ca57a783a",
  measurementId: "G-8JZK0NVN73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
