// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuV7rp-hqRDqvyi8HXDNoXxJGDxHDwlzs",
  authDomain: "react-kanban-18a26-5d047.firebaseapp.com",
  projectId: "react-kanban-18a26-5d047",
  storageBucket: "react-kanban-18a26-5d047.firebasestorage.app",
  messagingSenderId: "480328820050",
  appId: "1:480328820050:web:bcf0d488efca959953c68b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()