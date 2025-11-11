
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
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
              <nav className="fixed top-0 right-0 z-50 p-4">
                <div className="flex gap-4 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-full px-4 py-2">
                  <ThemeSwitcher />
                  <LanguageSwitcher />
                </div>
              </nav>
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
