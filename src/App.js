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
import { Container } from '@mui/material';
import CreateCharger from './components/CreateChargerForm';

function App() {
  const initialState = {
    loggedInUser: sessionStorage.getItem('username') || null,
    token: sessionStorage.getItem('token') || null,
  };

  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="app">
      <StateContext.Provider value={{ store, dispatch }}>
        <Router>
          <Navbar />
          <Container sx={{ pt: 2 }}>
            <Routes>
              <Route path="/" element={<h1>Root Path!</h1>} />
              <Route path="/search" element={<h1>Listing a charger...</h1>} />
              <Route path="/auth/signup" element={<SignupForm />} />
              <Route path="/auth/signin" element={<SigninForm />} />
              <Route path="/chargers/new" element={<CreateCharger />} />


              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </Router>
      </StateContext.Provider>
    </div>
  );
}

export default App;
