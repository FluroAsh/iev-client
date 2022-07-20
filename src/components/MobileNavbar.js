import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { AnimatePresence } from 'framer-motion';

import { MobileMenu } from '../layouts/MobileMenu';
import { SearchBar } from './SearchBar';

export const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    }
  };

  return (
    <>
      <AnimatePresence>
        {menuOpen && <MobileMenu setMenuOpen={setMenuOpen} />}
      </AnimatePresence>
      <div
        tabIndex={1}
        className="menu-btn"
        onClick={() => setMenuOpen((prevMenuOpen) => !prevMenuOpen)}
        onKeyDown={(e) => handleKeyPress(e)}
      >
        <MenuRoundedIcon fontSize={'large'} aria-label="mobile- menu-button" />
      </div>
      <Typography
        className="logo"
        component={Link}
        to="/"
        sx={{ position: 'absolute' }}
      >
        iEV
      </Typography>
      <SearchBar setMenuOpen={setMenuOpen} />
      {/* TODO: Add footer */}
    </>
  );
};
