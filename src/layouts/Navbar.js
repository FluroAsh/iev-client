import { React, useEffect } from "react";
import { Toolbar, AppBar, useMediaQuery, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";

import { useGlobalState } from "../context/stateContext";
import { MobileNavbar } from "./MobileNavbar";
import { DesktopNavBar } from "./DesktopNavBar";

export const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const { dispatch } = useGlobalState();

  useEffect(() => {
    dispatch({
      type: "setLocation",
      data: location,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar
          className="nav-toolbar"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: 1366,
            width: "100%",
          }}
        >
          {isMobile ? <MobileNavbar /> : <DesktopNavBar />}
        </Toolbar>
      </AppBar>
    </>
  );
};
