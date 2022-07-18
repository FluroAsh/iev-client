import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import { SearchBar } from './SearchBar';
import { MobileMenu } from '../layouts/MobileMenu';

export const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {menuOpen && <MobileMenu />}
      <div
        className="menu-btn"
        onClick={() => setMenuOpen((prevMenuOpen) => !prevMenuOpen)}
      >
        <MenuRoundedIcon fontSize={'large'} aria-label="mobile-menu-button" />
      </div>
      {/* TODO: Replace this with an SVG/Custom Logo */}
      <Typography className="logo" variant="h5" component={Link} to="/">
        iEV
      </Typography>
      <SearchBar />
      {/* TODO: Add footer */}
    </>
  );
};
