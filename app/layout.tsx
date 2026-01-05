import type { Metadata } from "next";
import CssBaseline from '@mui/material/CssBaseline';
import "./globals.css";
import Navigation from "../components/Navigation";
import FontProvider from "../components/FontProvider";
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Animeshka - Просмотр Аниме",
  description: "Платформа для просмотра аниме с удобным интерфейсом",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <FontProvider>
          <CssBaseline />
          <Navigation />
          <Suspense fallback={
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
              opacity: 0.7
            }}>
              <div>Загрузка...</div>
            </div>
          }>
            <main className="flex-1 page-transition">
              {children}
            </main>
          </Suspense>
        </FontProvider>
      </body>
    </html>
  );
}
