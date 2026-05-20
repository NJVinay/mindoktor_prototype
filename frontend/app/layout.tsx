import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import TopNavBar from "./components/TopNavBar";
import SecondaryTabNav from "./components/SecondaryTabNav";
import Footer from "./components/Footer";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Min Doktor - Right Door Prototype",
  description: "A smarter healthcare navigation system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className={sora.className}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <TopNavBar />
        <SecondaryTabNav />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
