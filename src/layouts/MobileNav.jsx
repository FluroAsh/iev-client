import { React, useState } from 'react';
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
          <div className="menu-btn">
            <MenuRoundedIcon onClick={() => setMenuOpen(!menuOpen)} />
          </div>
          {/* TODO: Replace this with an SVG/Custom Logo */}
          <Typography className="logo" variant="h5">
            iEV
          </Typography>
          <SearchBar />
        </Toolbar>
      </AppBar>
      {menuOpen && <MobileMenu />}
    </>
  );
};
