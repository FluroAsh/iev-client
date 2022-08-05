import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

import { SearchBar } from "../layouts/SearchBar";
import { DesktopMenu } from "./DesktopMenu";
export const DesktopNavBar = () => {
  return (
    <>
      <Typography className="logo" component={Link} to="/">
        iEV
      </Typography>
      <div className="searchbar">
        <SearchBar />
        <DesktopMenu />
      </div>
    </>
  );
};
