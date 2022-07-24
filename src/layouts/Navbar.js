import { React, useEffect } from "react";
import {
  Toolbar,
  AppBar,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
// import { makeStyles } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
// import { MobileNavbar } from "../components/MobileNavbar";
import { useGlobalState } from "../context/stateContext";
import { getMyChargers, getChargers } from "../services/chargerServices";


import { MobileNavbar } from './MobileNavbar';
import { DesktopNavBar } from './DesktopNavBar';

export const Navbar = () => {
  /** For access to MUI Breakpoints */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const location = useLocation();
  const {store, dispatch } = useGlobalState();
  const { loggedInUser, bookingDates } = store
  const navigate = useNavigate()

  useEffect(() => {
    console.log("THIS IS LOCATION", location);
    
    fetchData(location, dispatch);
  }, [location, dispatch]);

  // useEffect(displayChargers(location, dispatch), [location]);

  const logout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    dispatch({
      type: "cleanState",
      data: null,
    });
    navigate("/");
  };

  console.log("THIS IS dates array", bookingDates)


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
                  <Link to="/chargers/new" className="nav-link">
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
        </Toolbar>
      </AppBar>
    </>
  );
};

async function fetchData(location, dispatch) {

  if (location.pathname === "/chargers/mychargers") {
    try {
      const myChargers = await getMyChargers();
      if (myChargers) {
        dispatch({
          type: "setChargerList",
          data: myChargers,
        });
      } else {
        console.log("There's an error in fetching myChargers")
      }

    } catch (err) {
      console.log(err.message);
    }
  } else {
    try {
      const chargers = await getChargers();
      dispatch({
        type: "setChargerList",
        data: chargers,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
}


