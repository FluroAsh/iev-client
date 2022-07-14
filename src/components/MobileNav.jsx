import { Toolbar, AppBar } from '@mui/material';
import React from 'react';

export const MobileNav = () => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <span>Hamburger</span>
          <span>Logo</span>
          <span>Search Bar</span>
        </Toolbar>
      </AppBar>
    </>
  );
};
