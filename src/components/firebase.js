import React from 'react'
import {initializeApp } from 'firebase/app'
import {getFirestore }  from 'firebase/firestore'
import {getAuth} from 'firebase/auth'  

const firebaseApp = initializeApp({
    apiKey: "AIzaSyD8_MOCBIaQQrbz8tulIfqFOLrxkiRQitI",
    authDomain: "e-commerce-48555.firebaseapp.com",
    projectId: "e-commerce-48555",
    storageBucket: "e-commerce-48555.appspot.com",
    messagingSenderId: "691013161068",
    appId: "1:691013161068:web:d16e35d5762641deb38849",
    measurementId: "G-PH27MXSPGP"
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export default firebaseApp;
