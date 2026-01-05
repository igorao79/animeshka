import type { Metadata } from "next";
import CssBaseline from '@mui/material/CssBaseline';
import "./globals.css";
import Navigation from "../components/Navigation";
import FontProvider from "../components/FontProvider";
import PageTransition from "../components/PageTransition";
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Animeshka - Просмотр Аниме",
  description: "Платформа для просмотра аниме с оффлайн поддержкой",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Animeshka"
  },
  formatDetection: {
    telephone: false
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Animeshka",
    "application-name": "Animeshka"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2E9CCA"
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
          <ServiceWorkerRegistration />
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
            <PageTransition>
              {children}
            </PageTransition>
          </Suspense>
        </FontProvider>
      </body>
    </html>
  );
}
