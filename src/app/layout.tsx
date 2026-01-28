import type { Metadata } from "next";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Preloader from "@/components/preloader/Preloader";
import ContentWrapper from "@/components/preloader/ContentWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Balazsi Gallery",
  description: "Balazsi Gallery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/AmericanGrotesk-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AmericanGrotesk-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AmericanGrotesk-MediumItalic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/neuehaasgrotdispround-65medium-trial.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Preloader />
        <ContentWrapper>
          <Header />
          {children}
          <Footer />
        </ContentWrapper>
      </body>
    </html>
  );
}
