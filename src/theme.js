import { createTheme } from '@mui/material';
import { green } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#888',
    },
    secondary: {
      main: green[500],
    },
  },
});
