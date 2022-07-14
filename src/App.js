import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './styles/main.scss';
import { MobileNav } from './components/MobileNav';

function App() {
  return (
    <div className="app">
      <Router>
        <MobileNav className="mobile-nav" />
        <Routes>
          <Route path="/" element={<h1>Root Path!</h1>} />
          <Route path="/search" element={<h1>Search Path!</h1>} />
          <Route path="*" element={<h1>404 Path!</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
