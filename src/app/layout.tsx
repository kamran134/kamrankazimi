
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteControls } from "@/components/SiteControls";
import { LanguageProvider } from "@/lib/LanguageContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import { SessionProvider } from "@/components/SessionProvider";

const inter = Inter({
  variable: "--font-acronym",
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kamran Kazimi - Portfolio",
  description: "7+ il əməli təcrübəyə malik Frontend Developer olaraq, miqyaslana bilən, adaptiv və əlçatan veb tətbiqlər qurmaq üzrə ixtisaslaşıram.",
  metadataBase: new URL('https://kamrankazimi.dev'),
  openGraph: {
    title: "Kamran Kazimi - Frontend Engineer",
    description: "7+ il əməli təcrübəyə malik Frontend Developer olaraq, miqyaslana bilən, adaptiv və əlçatan veb tətbiqlər qurmaq üzrə ixtisaslaşıram.",
    url: "https://kamrankazimi.dev",
    siteName: "Kamran Kazimi Portfolio",
    locale: "az_AZ",
    type: "website",
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 1200,
        alt: 'Kamran Kazimi - Frontend Engineer',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamran Kazimi - Frontend Engineer",
    description: "7+ il əməli təcrübəyə malik Frontend Developer olaraq, miqyaslana bilən, adaptiv və əlçatan veb tətbiqlər qurmaq üzrə ixtisaslaşıram.",
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
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
