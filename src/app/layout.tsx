import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import GamificationHUD from "@/components/GamificationHUD"; // 👈 Import HUD
import { Toaster } from 'react-hot-toast';

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL('https://menzstore.vercel.app'),
  title: {
    default: "MENZSTORE | Curated Minimalist Fashion",
    template: "%s | MENZSTORE"
  },
  description: "A curated selection of aesthetic outfits for the modern creator.",
  verification: {
    google: 'vt_RewrRZrEnGz1Mmd8OOKtZSR1NwKF8RCHnXrInb2Y',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body 
        suppressHydrationWarning={true}
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans bg-cream text-primary antialiased flex flex-col min-h-screen`}
      >
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        <Navbar />
        
        <div className="flex-grow">
          {children}
        </div>

        <Footer />
        <CookieBanner />
        <Analytics />
        <GamificationHUD /> {/* 👈 Added HUD here */}
      </body>
    </html>
  );
}