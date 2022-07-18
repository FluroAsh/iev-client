import { createTheme } from '@mui/material';
import { green, yellow } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: yellow[700],
    },
    secondary: {
      main: green[500],
    },
  },
  breakpoints: {
    values: {
      xs: 375,
      md: 800,
      lg: 1366,
      xl: 1920,
    },
  },
});
