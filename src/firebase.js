// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: "sentry-grabber",
    storageBucket: "sentry-grabber.appspot.com",
    messagingSenderId: "577550175553",
    appId: process.env.REACT_APP_APP_ID,
    measurementId: "G-RGGE69VMC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };