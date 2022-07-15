import React from 'react';
import { Toolbar, AppBar, Typography } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import { SearchBar } from '../components/SearchBar';

export const MobileNav = () => {
  const toggleMenu = () => {
    console.log('Opened menu!');
  };

  return (
    <>
      <AppBar position="sticky" className="mobile-nav">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <div className="menu-btn">
            <MenuRoundedIcon onClick={toggleMenu} />
          </div>
          <Typography className="logo" variant="h5">
            iEV
          </Typography>
          <SearchBar />
        </Toolbar>
      </AppBar>
    </>
  );
};
