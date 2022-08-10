import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";

import App from "./App";
import { theme } from "./context/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider theme={theme}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <App />
    </SnackbarProvider>
  </ThemeProvider>
);
