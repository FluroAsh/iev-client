import { React, useEffect } from "react";
import { Toolbar, AppBar, useMediaQuery, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useGlobalState } from "../context/stateContext";
import { getMyChargers, getChargers } from "../services/chargerServices";
import { useNavigate } from "react-router-dom";

import { MobileNavbar } from "./MobileNavbar";
import { DesktopNavBar } from "./DesktopNavBar";

export const Navbar = () => {
  /** For access to MUI Breakpoints */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const { store, dispatch } = useGlobalState();
  const { loggedInUser, bookingDates } = store;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("THIS IS LOCATION", location);
    dispatch({
      type: "setLocation",
      data: location,
    });

    fetchData(location, dispatch, loggedInUser);
  }, [location, dispatch]);

  console.log("THIS IS dates array", bookingDates);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ height: 56, justifyContent: "space-between" }}>
          {isMobile ? <MobileNavbar /> : <DesktopNavBar />}
        </Toolbar>
      </AppBar>
    </>
  );
};

async function fetchData(location, dispatch, loggedInUser) {
  if (location.pathname === "/chargers/mychargers") {
    try {
      const myChargers = await getMyChargers();
      if (myChargers) {
        dispatch({
          type: "setChargerList",
          data: myChargers,
        });
      } else {
        console.log("There's an error in fetching myChargers");
      }
    } catch (err) {
      console.log(err.message);
    }
  } else if (location.pathname === "/chargers") {
    try {
      const chargers = await getChargers();
      if (chargers) {
        const activeList = chargers.filter(
          (charger) =>
            charger.status === "active" &&
            charger.User.username !== loggedInUser
        );
        dispatch({
          type: "setChargerList",
          data: activeList,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}
