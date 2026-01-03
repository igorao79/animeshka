import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2E9CCA', // Основной синий
      dark: '#29648A', // Темно-синий
      light: '#AAABB8', // Светло-серый
    },
    secondary: {
      main: '#464866', // Средний темный
    },
    background: {
      default: '#25274D', // Самый темный - основной фон
      paper: '#464866', // Карточки и панели
    },
    text: {
      primary: '#AAABB8', // Основной текст
      secondary: '#2E9CCA', // Вторичный текст
    },
  },
  typography: {
    fontFamily: '"Yanone Kaffeesatz", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Dela Gothic One", sans-serif',
      fontSize: '2.5rem',
      fontWeight: 400,
      marginBottom: '1rem',
    },
    h2: {
      fontFamily: '"Dela Gothic One", sans-serif',
      fontSize: '2rem',
      fontWeight: 400,
    },
    h3: {
      fontFamily: '"Dela Gothic One", sans-serif',
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    h4: {
      fontFamily: '"Dela Gothic One", sans-serif',
      fontSize: '1.25rem',
      fontWeight: 400,
    },
    h5: {
      fontFamily: '"Dela Gothic One", sans-serif',
      fontSize: '1.125rem',
      fontWeight: 400,
    },
    h6: {
      fontFamily: '"Dela Gothic One", sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#25274D',
          color: '#AAABB8',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontFamily: 'var(--font-primary)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-primary)',
        },
        h1: {
          fontFamily: 'var(--font-headings)',
        },
        h2: {
          fontFamily: 'var(--font-headings)',
        },
        h3: {
          fontFamily: 'var(--font-headings)',
        },
        h4: {
          fontFamily: 'var(--font-headings)',
        },
        h5: {
          fontFamily: 'var(--font-headings)',
        },
        h6: {
          fontFamily: 'var(--font-headings)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-primary)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-primary)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-primary)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-primary)',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-primary)',
        },
      },
    },
  },
});
