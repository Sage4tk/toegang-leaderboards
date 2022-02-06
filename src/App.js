import React from 'react';


//import backend
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
  apiKey: "AIzaSyCfs951YnUAaskwOqa6cjq5Uq81tpB1720",
  authDomain: "toes-leaderboard.firebaseapp.com",
  projectId: "toes-leaderboard",
  storageBucket: "toes-leaderboard.appspot.com",
  messagingSenderId: "838638350901",
  appId: "1:838638350901:web:0eb7f9dee235ce3271b77c",
  measurementId: "G-Z90LG0ZDRQ"
})

export default function App() {
  return (
    <div className="App">
      <h1>START OF PROJECT</h1>
    </div>
  );
}
