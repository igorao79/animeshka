import type { Metadata } from "next";
import CssBaseline from '@mui/material/CssBaseline';
import "./globals.css";
import Navigation from "../components/Navigation";
import FontProvider from "../components/FontProvider";

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
          <main className="flex-1">
            {children}
          </main>
        </FontProvider>
      </body>
    </html>
  );
}
