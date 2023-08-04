// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBoQq-fp48nZYTgpLCZPW1oHHk_F4gLE90",
    authDomain: "page-builder-572dd.firebaseapp.com",
    databaseURL: "https://page-builder-572dd-default-rtdb.firebaseio.com",
    projectId: "page-builder-572dd",
    storageBucket: "page-builder-572dd.appspot.com",
    messagingSenderId: "189702000838",
    appId: "1:189702000838:web:6c1d0a5b87063add3c87c7",
    measurementId: "G-1LGGD545JN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
