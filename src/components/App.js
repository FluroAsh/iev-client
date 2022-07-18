import React, {useReducer} from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import '../styles/main.scss';
import { Navbar } from '../layouts/Navbar.js';
import SignupForm from './SignupForm';
import { reducer } from '../utils/reducer';
import { StateContext } from '../utils/stateContext';
import {NotFound} from './NotFound';

function App() {

  const initialState = {
    loggedInUser: sessionStorage.getItem("username") || null,
    token: sessionStorage.getItem("token") || null
  }

  const [store, dispatch] = useReducer(reducer, initialState)
  const {loggedInUser} = store

  return (
    <div className="app">

      <StateContext.Provider value={{store, dispatch}}>

        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<h1>Root Path!</h1>} />
            <Route path="/search" element={<h1>Search Path!</h1>} />
            <Route path="/auth/signup" element={<SignupForm />} />

            <Route path="*" element={<h1>404 Path!</h1>} />
          </Routes>
        </Router>
      </StateContext.Provider>


    </div>
  );
}

export default App;
