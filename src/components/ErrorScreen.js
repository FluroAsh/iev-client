import React from "react";
import { Typography } from "@mui/material";

export const ErrorScreen = ({ error }) => {
  return (
    <div className="error-container">
      <Typography variant="h5">{error.message}</Typography>
    </div>
  );
};
