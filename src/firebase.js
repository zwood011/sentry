// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: "sentry-grab",
    storageBucket: "sentry-grab.appspot.com",
    messagingSenderId: "231342136763",
    appId: process.env.REACT_APP_APP_ID,
    measurementId: "G-N3HHR9R98E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };