import { createTheme } from '@mui/material/styles';

/* palatte */
/* #2b2d42, #8d99ae, #edf2f4, #ef233c, #d90429 */

export const colors = {
  "navyBlue": "#2b2d42",
  "grey": "#8d99ae",
  "lightGrey": "#edf2f4",
  "lightRed": "#ef233c",
  "red": "#d90429",
}

export const MyTheme = createTheme({
  palette: {
    primary: {
      main: colors.navyBlue,
      light: '#54566d',
      dark: '#02021c',
    },
    secondary: {
      main: colors.grey,
      light: colors.grey,
      dark: colors.grey,
    },
    text: {
      primary: colors.navyBlue,
      secondary: colors.grey
    }
  }
})

