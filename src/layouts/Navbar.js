import React from 'react';
import {
  Toolbar,
  AppBar,
  useMediaQuery,
  useTheme,
  Typography,
} from '@mui/material';
// import { makeStyles } from "@material-ui/core";
import { Link, useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';

import { MobileNavbar } from '../components/MobileNavbar';
import { useGlobalState } from '../context/stateContext';

export const Navbar = () => {
  /** For access to MUI Breakpoints */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    dispatch({
      type: 'setLoggedInUser',
      data: null,
    });
    dispatch({
      type: 'setToken',
      data: null,
    });
    navigate('/');
  };

  return (
    <>
      <AppBar position="sticky" className="mobile-nav">
        <Toolbar sx={{ justifyContent: 'space-between', height: '56px' }}>
          {isMobile ? (
            <MobileNavbar />
          ) : (
            <div>
              <ul className="menu-links">
                <li className="menu-link-item">
                  <Link to="/" className="nav-link">
                    Bookings
                  </Link>
                </li>
                <li className="menu-link-item">
                  <Link to="/" className="nav-link">
                    List Charger
                  </Link>
                </li>
                <li className="menu-link-item">
                  <Link to="/" className="nav-link">
                    Edit Vehicle
                  </Link>
                </li>
                <li className="menu-link-item">
                  <span>
                    {loggedInUser ? (
                      <a href="/" className="nav-link" onClick={logout}>
                        Log Out
                      </a>
                    ) : (
                      <ul>
                        <Link to="/auth/signin" className="nav-link">
                          Sign in
                        </Link>
                        <Link to="/auth/signup" className="nav-link">
                          Sign up
                        </Link>
                      </ul>
                    )}
                  </span>
                </li>
              </ul>
            </div>
          )}
          {/* TODO: Replace this with an SVG/Custom Logo */}

          <Typography className="logo" component={Link} to="/">
            iEV
          </Typography>
          <SearchBar />
        </Toolbar>
      </AppBar>
    </>
  );
};
