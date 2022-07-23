import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/main.scss';
import { Navbar } from './layouts/Navbar.js';
import SignupForm from './components/SignupForm';
import SigninForm from './components/SigninForm';

import { reducer } from './utils/reducer';
import { StateContext } from './context/stateContext';
import { NotFound } from './pages/NotFound';
import { Container } from '@mui/material';
import { SearchLocation } from './pages/SearchLocation';

function App() {
  const initialState = {
    loggedInUser: sessionStorage.getItem('username') || null,
    currentUser: {
      username: '',
      firstName: '',
      lastName: '',
    },
    token: sessionStorage.getItem('token') || null,
    // chargingStation
  };

  const [store, dispatch] = useReducer(reducer, initialState);
  // const { loggedInUser } = store;

  return (
    <div className="app">
      <StateContext.Provider value={{ store, dispatch }}>
        <Router>
          <Navbar />
          <Container disableGutters>
            <Routes>
              <Route path="/" element={<h1>Root Path!</h1>} />
              <Route path="/search" element={<SearchLocation />} />
              {/* 
                TODO: Change these to /auth/session later, will need to have everything
                in one form and conditionally render the correct form based on state.
              */}
              <Route path="/auth/signup" element={<SignupForm />} />
              <Route path="/auth/signin" element={<SigninForm />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </Router>
      </StateContext.Provider>
    </div>
  );
}

export default App;
