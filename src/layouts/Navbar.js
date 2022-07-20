import React from 'react';
import { Toolbar, AppBar, useMediaQuery, useTheme } from '@mui/material';

import { MobileNavbar } from '../components/MobileNavbar';
import { DesktopNavBar } from '../components/DesktopNavBar';

export const Navbar = () => {
  /** For access to MUI Breakpoints */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toolbarStyles = {
    mobile: {
      justifyContent: 'space-between',
      height: '56px',
    },
    large: {
      justifyContent: 'space-around',
      height: '56px',
    },
  };

  return (
    <>
      <AppBar position="sticky" className="mobile-nav">
        <Toolbar sx={isMobile ? toolbarStyles.mobile : toolbarStyles.large}>
          {isMobile ? <MobileNavbar /> : <DesktopNavBar />}
          {/* TODO: Replace this with an SVG/Custom Logo */}
        </Toolbar>
      </AppBar>
    </>
  );
};
