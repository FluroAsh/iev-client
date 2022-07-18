import { React, useState } from 'react';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

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

      {/* TODO: Add footer */}
    </>
  );
};
