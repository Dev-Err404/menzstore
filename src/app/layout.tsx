import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google"; // <--- 1. Import fonts
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import { Toaster } from 'react-hot-toast';

// <--- 2. Initialize fonts (This was missing in your code)
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
    // 👇 JUST the code, no <meta> tags!
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
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans bg-cream text-primary antialiased flex flex-col min-h-screen`}>
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        <Navbar />
        
        <div className="flex-grow">
          {children}
        </div>

        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}