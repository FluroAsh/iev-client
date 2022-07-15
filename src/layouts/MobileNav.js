import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, AppBar, Typography } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import { SearchBar } from '../components/SearchBar';
import { MobileMenu } from './MobileMenu';

export const MobileNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <AppBar position="sticky" className="mobile-nav">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <MenuRoundedIcon />
          </div>
          {/* TODO: Replace this with an SVG/Custom Logo */}
          <Typography className="logo" variant="h5" component={Link} to="/">
            iEV
          </Typography>
          <SearchBar />
        </Toolbar>
      </AppBar>
      {menuOpen && <MobileMenu />}
    </>
  );
};
