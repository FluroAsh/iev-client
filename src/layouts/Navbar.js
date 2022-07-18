import React from 'react';
import { Toolbar, AppBar, useMediaQuery, useTheme } from '@mui/material';

import { MobileNavbar } from '../components/MobileNavbar';

export const Navbar = () => {
  /** For access to MUI Breakpoints */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <AppBar position="sticky" className="mobile-nav">
        <Toolbar sx={{ justifyContent: 'space-between', height: '56px' }}>
          {isMobile ? <MobileNavbar /> : <p>TODO: Add Desktop Navbar!</p>}
        </Toolbar>
      </AppBar>
    </>
  );
};
