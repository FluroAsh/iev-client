import { React, useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { MobileMenu } from '../layouts/MobileMenu';

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
        tabIndex={0}
        className="menu-btn"
        onClick={() => setMenuOpen((prevMenuOpen) => !prevMenuOpen)}
        onKeyDown={(e) => handleKeyPress(e)}
      >
        <MenuRoundedIcon fontSize={'large'} aria-label="mobile- menu-button" />
      </div>

      {/* TODO: Add footer */}
    </>
  );
};
