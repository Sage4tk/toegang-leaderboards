import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import backend
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import { useAuthState } from 'react-firebase-hooks/auth';

//components
import Home from './components/Home';
import Admin from './components/Admin'

import "./styles.scss";

firebase.initializeApp({
  apiKey: "AIzaSyCfs951YnUAaskwOqa6cjq5Uq81tpB1720",
  authDomain: "toes-leaderboard.firebaseapp.com",
  projectId: "toes-leaderboard",
  storageBucket: "toes-leaderboard.appspot.com",
  messagingSenderId: "838638350901",
  appId: "1:838638350901:web:0eb7f9dee235ce3271b77c",
  measurementId: "G-Z90LG0ZDRQ"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home auth={auth} user={user} firestore={firestore}/>} />
        <Route path='/admin' element={<Admin firestore={firestore} />} />
      </Routes>
    </Router>
  );
}

export default App;
