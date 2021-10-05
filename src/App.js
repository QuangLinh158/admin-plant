import './App.css';
import Dashboard from './components/Dashboard';
import {BrowserRouter, Router, Switch, Route, Link} from "react-router-dom";
import React, { useState,useEffect } from 'react';
import { initializeApp } from "firebase/app";
import Login from './screens/Login';
import SignUp from './screens/SignUp';

import { getAuth, onAuthStateChanged } from '@firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCcJB_3XDq_kytR0-f3hboOYRCY4bK0y20",
    authDomain: "appplants-fbbf8.firebaseapp.com",
    projectId: "appplants-fbbf8",
    storageBucket: "appplants-fbbf8.appspot.com",
    messagingSenderId: "254548627166",
    appId: "1:254548627166:web:160167433651fa86f0fc4f"
  };
  
initializeApp(firebaseConfig);

const App = () => {

  const [inactive, setInactive] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  }, [])

  return (
    <div className="App">
        <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
