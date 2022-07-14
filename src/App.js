import React from 'react';

import './styles/main.scss';
import { MobileNav } from './components/MobileNav';

function App() {
  return (
    <div className="app">
      <MobileNav />
      <h1>Content</h1>
    </div>
  );
}

export default App;
