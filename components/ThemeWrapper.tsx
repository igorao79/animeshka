'use client';

import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { ReactNode, useMemo } from 'react';

// Создаем тему на клиенте, чтобы избежать гидратации
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E9CCA',
      dark: '#29648A',
      light: '#AAABB8',
    },
    secondary: {
      main: '#464866',
    },
    background: {
      default: '#25274D',
      paper: '#464866',
    },
    text: {
      primary: '#AAABB8',
      secondary: '#2E9CCA',
    },
  },
  typography: {
    fontFamily: '"Geist", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '1rem',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

interface ThemeWrapperProps {
  children: ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const memoizedTheme = useMemo(() => theme, []);

  return (
    <ThemeProvider theme={memoizedTheme}>
      <div suppressHydrationWarning>
        {children}
      </div>
    </ThemeProvider>
  );
}
