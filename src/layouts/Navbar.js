import React from 'react';
import { Toolbar, AppBar, useMediaQuery, useTheme } from '@mui/material';

import { MobileNavbar } from './MobileNavbar';
import { DesktopNavBar } from './DesktopNavBar';

export const Navbar = () => {
  /** For access to MUI Breakpoints */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const styles = {
    mobile: {
      justifyContent: 'space-between',
      height: '56px',
    },
  };

  return (
    <>
      <AppBar position="sticky" className="mobile-nav">
        <Toolbar sx={isMobile && styles.mobile}>
          {isMobile ? <MobileNavbar /> : <DesktopNavBar />}
        </Toolbar>
      </AppBar>
    </>
  );
};
