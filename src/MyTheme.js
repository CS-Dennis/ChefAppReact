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
      main: '#d90429',
      light: '#ff5352',
      dark: '#9f0000',
    },
    text: {
      primary: '#2b2d42',
      secondary: "#d90429"
    }
  }
})