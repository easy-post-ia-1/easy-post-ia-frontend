import { ReactNode } from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

interface ThemeProps {
  children: ReactNode;
}

let theme = createTheme({
  colorSchemes: {
    dark: false,
    light: true, // Enable light mode
  },
  palette: {
    primary: {
      main: '#2196f3',
      dark: '#1565c0',
      light: '#97beff',
    },
    secondary: {
      main: '#ffcc33',
      dark: '#ccaa26',
      light: '#ffdb66',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 12,

    h1: {
      fontFamily: 'Roboto Slab, serif',
      fontOpticalSizing: 'auto',
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    h2: {
      fontFamily: 'Roboto Slab, serif',
      fontOpticalSizing: 'auto',
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    h3: {
      fontFamily: 'Roboto Slab, serif',
      fontOpticalSizing: 'auto',
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    h4: {
      fontFamily: 'Roboto Slab, serif',
      fontOpticalSizing: 'auto',
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    h5: {
      fontFamily: 'Roboto Slab, serif',
      fontOpticalSizing: 'auto',
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    h6: {
      fontFamily: 'Roboto Slab, serif',
      fontOpticalSizing: 'auto',
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    body1: {
      fontFamily: 'Roboto Mono, serif',
      fontOpticalSizing: 'auto',
      fontStyle: 'normal',
    },
    body2: {
      fontFamily: 'Roboto Mono, serif',
      fontOpticalSizing: 'auto',
      fontStyle: 'normal',
    },
    button: {
      fontFamily: 'Roboto Mono, serif',
      fontOpticalSizing: 'auto',
      textTransform: 'uppercase',
    },
    overline: {
      fontFamily: 'Roboto Mono, serif',
      fontOpticalSizing: 'auto',
      textTransform: 'uppercase',
    },
    caption: {
      fontFamily: 'Roboto Mono, serif',
      fontOpticalSizing: 'auto',
    },
    subtitle1: {
      fontFamily: 'Roboto Mono, serif',
      fontOpticalSizing: 'auto',
    },
    subtitle2: {
      fontFamily: 'Roboto Mono, serif',
      fontOpticalSizing: 'auto',
    },
  },
});

// TODO: Add button change theme
const Theme: React.FC<ThemeProps> = ({ children }) => {
  // const { darkTheme, lightTheme } = tankstack(state => state);
  //let theme = useMemo(() => createTheme(isDarkMode ? darkTheme : lightTheme), [darkTheme, lightTheme, isDarkMode]);
  theme = responsiveFontSizes(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
