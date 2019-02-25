import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'sans-serif',
      '"Comic Sans MS"',
      'cursive',
    ],
    htmlFontSize: 10,
  },
});
export default theme;
