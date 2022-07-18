import React from "react";
import {
  Toolbar,
  AppBar,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
// import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";

import { MobileNavbar } from "../components/MobileNavbar";

export const Navbar = () => {
  /** For access to MUI Breakpoints */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <AppBar position="sticky" className="mobile-nav">
        <Toolbar sx={{ justifyContent: "space-between", height: "56px" }}>
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
                    <a href="/" className="nav-link">
                      Log Out
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          )}
          {/* TODO: Replace this with an SVG/Custom Logo */}

          <Typography className="logo" variant="h5" component={Link} to="/">
            iEV
          </Typography>
          <SearchBar />
        </Toolbar>
      </AppBar>
    </>
  );
};
