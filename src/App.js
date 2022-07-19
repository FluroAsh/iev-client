import React, { useReducer } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './styles/main.scss';
import { Navbar } from './layouts/Navbar.js';
import SignupForm from './components/SignupForm';
import SigninForm from './components/SigninForm';

import { reducer } from './utils/reducer';
import { StateContext } from './context/stateContext';
import { NotFound } from './pages/NotFound';

function App() {
  const initialState = {
    loggedInUser: sessionStorage.getItem('username') || null,
    token: sessionStorage.getItem('token') || null,
  };

  const [store, dispatch] = useReducer(reducer, initialState);
  const { loggedInUser } = store;

  return (
    <div className="app">
      <StateContext.Provider value={{ store, dispatch }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<h1>Root Path!</h1>} />
            <Route path="/search" element={<h1>Search Path!</h1>} />
            <Route path="/auth/signup" element={<SignupForm />} />
            <Route path="/auth/signin" element={<SigninForm />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </StateContext.Provider>
    </div>
  );
}

export default App;
