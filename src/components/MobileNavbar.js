import { React, useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { MobileMenu } from '../layouts/MobileMenu';
// import { DrawerComponent } from ''

export const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <AnimatePresence>
        {menuOpen && <MobileMenu setMenuOpen={setMenuOpen} />}
      </AnimatePresence>
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
