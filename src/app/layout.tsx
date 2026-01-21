import type { Metadata } from "next";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
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
