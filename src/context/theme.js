import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    // https://mui.com/material-ui/customization/palette/
    primary: {
      main: green[800],
    },
    secondary: {
      main: green[100],
    },
  },
  breakpoints: {
    // https://mui.com/material-ui/customization/breakpoints/
    values: {
      xs: 400,
      sm: 600,
      md: 800,
      lg: 1366,
      xl: 1920,
    },
  },
});
