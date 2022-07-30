import { React, useEffect } from "react";
import { Toolbar, AppBar, useMediaQuery, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useGlobalState } from "../context/stateContext";
import { getMyChargers, getChargers } from "../services/chargerServices";

import { MobileNavbar } from "./MobileNavbar";
import { DesktopNavBar } from "./DesktopNavBar";

export const Navbar = () => {
  /** For access to MUI Breakpoints */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const { dispatch } = useGlobalState();

  useEffect(() => {
    dispatch({
      type: "setLocation",
      data: location,
    });

    fetchData(location, dispatch);
  }, [location, dispatch]);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar
          id
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: 56,
            maxWidth: 1366,
            width: "100%",
            // p: 0,
          }}
        >
          {isMobile ? <MobileNavbar /> : <DesktopNavBar />}
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
        console.log("There's an error in fetching myChargers");
      }
    } catch (err) {
      console.log(err.message);
    }
  } else if (location.pathname === "/chargers") {
    try {
      const chargers = await getChargers();
      if (chargers) {
        dispatch({
          type: "setChargerList",
          data: chargers,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}
