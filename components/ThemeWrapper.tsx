'use client';

import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { ReactNode, useMemo } from 'react';

// Создаем тему на клиенте, чтобы избежать гидратации
// Используем те же значения, что и в CSS переменных globals.css
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E9CCA', // --primary-500
      dark: '#29648A', // --primary-600
      light: '#AAABB8', // --primary-700
    },
    secondary: {
      main: '#464866', // --primary-800
    },
    background: {
      default: '#25274D', // --primary-900
      paper: '#464866', // --primary-800
    },
    text: {
      primary: '#AAABB8', // --primary-700
      secondary: '#2E9CCA', // --primary-500
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
