// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCGFKpSOEzUFCicg0KN4Mwoydnhzy_TG_o",
    authDomain: "sentry-grabber.firebaseapp.com",
    projectId: "sentry-grabber",
    storageBucket: "sentry-grabber.appspot.com",
    messagingSenderId: "577550175553",
    appId: "1:577550175553:web:84da6ccab5c2f3fa10e5c0",
    measurementId: "G-RGGE69VMC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };