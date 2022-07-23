import { createTheme } from '@mui/material';
//
export const theme = createTheme({
  palette: {
    // https://mui.com/material-ui/customization/palette/
    primary: {
      main: '#008140',
    },
    secondary: {
      main: '#aa55ee',
    },
    // Card: {
    //   maxWidth: 350,
    //   margin: 'auto',
    //   background: '#e0e0a3',
    // },
    // background: {
    //   card: '#e0e0e080',
    // },
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
