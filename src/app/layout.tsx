import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { Toaster } from 'react-hot-toast';

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "MENZSTORE | Curated Fashion",
  description: "Minimalist aesthetic outfits for men.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      {/* ADD suppressHydrationWarning HERE 👇 */}
      <body 
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans bg-cream text-primary antialiased flex flex-col min-h-screen`} 
        suppressHydrationWarning={true}
      >
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}