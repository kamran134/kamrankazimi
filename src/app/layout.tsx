
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteControls } from "@/components/SiteControls";
import { LanguageProvider } from "@/lib/LanguageContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import { SessionProvider } from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kamran Kazimi - Portfolio",
  description: "Frontend Engineer Portfolio - Kamran Kazimi",
  openGraph: {
    title: "Kamran Kazimi - Frontend Engineer",
    description: "Frontend Engineer Portfolio - Kamran Kazimi",
    url: "https://kamrankazimi.dev",
    siteName: "Kamran Kazimi Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamran Kazimi - Frontend Engineer",
    description: "Frontend Engineer Portfolio - Kamran Kazimi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ThemeProvider>
            <LanguageProvider>
              <SiteControls />
              <main>
                {children}
              </main>
            </LanguageProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
