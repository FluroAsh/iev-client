import { Toolbar, AppBar } from '@mui/material';
import React from 'react';

export const MobileNav = () => {
  return (
    <>
      <AppBar position="sticky" className="mobile-nav">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <span>Hamburger</span>
          <span>iEV</span>
          <span>Search Bar</span>
        </Toolbar>
      </AppBar>
    </>
  );
};
