import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics"; // <--- 1. Import this

// ... (keep your fonts and metadata same as before) ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans bg-cream text-primary antialiased flex flex-col min-h-screen`}>
        {/* ... keep your Toaster and Navbar ... */}
        <Navbar />
        
        <div className="flex-grow">
          {children}
        </div>

        <Footer />
        <CookieBanner />
        
        <Analytics /> {/* <--- 2. Add this right here at the bottom */}
      </body>
    </html>
  );
}