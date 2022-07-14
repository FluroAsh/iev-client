import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
