import React from 'react';
import { Toolbar, AppBar, useMediaQuery, useTheme } from '@mui/material';

import { MobileNavbar } from './MobileNavbar';
import { DesktopNavBar } from './DesktopNavBar';

export const Navbar = () => {
  /** For access to MUI Breakpoints */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ height: 56, justifyContent: 'space-between' }}>
          {isMobile ? <MobileNavbar /> : <DesktopNavBar />}
        </Toolbar>
      </AppBar>
    </>
  );
};
