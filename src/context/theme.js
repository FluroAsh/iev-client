import { createTheme } from '@mui/material';
//
export const theme = createTheme({
  palette: {
    // https://mui.com/material-ui/customization/palette/
    primary: {
      main: '#ccd5ae',
    },
    secondary: {
      main: '#d4a373',
    },
  },
  breakpoints: {
    // https://mui.com/material-ui/customization/breakpoints/
    values: {
      xs: 375,
      md: 800,
      lg: 1366,
      xl: 1920,
    },
  },
});
