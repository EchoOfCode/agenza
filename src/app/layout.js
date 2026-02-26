"use client";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Agenza — Deploy. Don&apos;t Prompt.</title>
        <meta
          name="description"
          content="A ruthless, neobrutalist marketplace for autonomous AI agents that execute real academic and professional workflows end-to-end."
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
