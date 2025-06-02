import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import {getAuth} from 'firebase/auth';
import "firebase/compat/firestore"
import "firebase/compat/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLTOoZWqVM4nlQl7TsYYAwbqDQLYLdLNY",
  authDomain: "clone-130b8.firebaseapp.com",
  projectId: "clone-130b8",
  storageBucket: "clone-130b8.firebasestorage.app",
  messagingSenderId: "54148806453",
  appId: "1:54148806453:web:31538ff58c25c7b23fbe7c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=app.firestore()