import { createTheme } from '@mui/material/styles';
import { light } from '@mui/material/styles/createPalette';

/* palatte */
/* #2b2d42, #8d99ae, #edf2f4, #ef233c, #d90429 */



export const MyTheme = createTheme({
  palette: {
    primary: {
      main: '#2b2d42',
      light: '#54566d',
      dark: '#02021c',
    },
    secondary: {
      main: '#8d99ae',
      light: '#8d99ae',
      dark: '#8d99ae',
    },
    text: {
      primary: '#2b2d42',
      secondary: "#8d99ae"
    }
  }
})