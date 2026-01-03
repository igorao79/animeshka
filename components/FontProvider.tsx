'use client';

import { useEffect } from 'react';

export default function FontProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Принудительное применение шрифтов ко всем MUI компонентам
    const applyFonts = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        /* Агрессивное переопределение MUI шрифтов */
        .MuiButton-root,
        .MuiTypography-root,
        .MuiCard-root,
        .MuiPaper-root,
        .MuiChip-root,
        .MuiMenuItem-root,
        .MuiListItem-root,
        .MuiInput-root,
        .MuiFormLabel-root,
        .MuiTab-root,
        .MuiAppBar-root {
          font-family: 'Yanone Kaffeesatz', 'Roboto', 'Helvetica', 'Arial', sans-serif !important;
        }

        .MuiTypography-root.MuiTypography-h1,
        .MuiTypography-root.MuiTypography-h2,
        .MuiTypography-root.MuiTypography-h3,
        .MuiTypography-root.MuiTypography-h4,
        .MuiTypography-root.MuiTypography-h5,
        .MuiTypography-root.MuiTypography-h6 {
          font-family: 'Dela Gothic One', 'Roboto', 'Helvetica', 'Arial', sans-serif !important;
        }

        /* Переопределение через все возможные селекторы */
        *[class*="Mui"] {
          font-family: 'Yanone Kaffeesatz', 'Roboto', 'Helvetica', 'Arial', sans-serif !important;
        }

        *[class*="MuiTypography-h"] {
          font-family: 'Dela Gothic One', 'Roboto', 'Helvetica', 'Arial', sans-serif !important;
        }
      `;
      document.head.appendChild(style);
    };

    applyFonts();

    // Повторное применение через небольшую задержку на случай асинхронной загрузки
    setTimeout(applyFonts, 100);
    setTimeout(applyFonts, 500);
    setTimeout(applyFonts, 1000);
  }, []);

  return <>{children}</>;
}
