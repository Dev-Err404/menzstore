"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter
import { useEffect } from 'react'; // Added useEffect
import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // --- SECRET SHORTCUT LOGIC ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if Ctrl + Shift + A is pressed
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault(); // Stop any default browser behavior
        router.push('/admin'); // Teleport to Admin
      }
    };

    // Attach listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup listener when component unmounts
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center pt-6 pointer-events-none px-4">
      <nav className="relative pointer-events-auto w-full md:w-auto flex items-center justify-between md:justify-start gap-4 md:gap-8 px-6 py-3 bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-full transition-all hover:bg-white/95 hover:shadow-lg">
        
        {/* Mobile Menu Trigger */}
        <div className="md:hidden z-10">
          <MobileMenu />
        </div>

        {/* LOGO (Centered on Mobile) */}
        <Link 
          href="/" 
          className="
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
            md:static md:translate-x-0 md:translate-y-0 
            font-heading font-bold text-lg tracking-tight text-primary whitespace-nowrap
          "
        >
          MENZ<span className="text-secondary font-light">STORE</span>
        </Link>

        {/* Desktop Links (No Admin Link) */}
        <div className="hidden md:flex items-center gap-6">
          <div className="w-px h-4 bg-gray-200"></div>
          <Link href="/categories" className={`text-sm font-medium transition-colors ${pathname === '/categories' ? 'text-primary' : 'text-secondary hover:text-primary'}`}>
            Collections
          </Link>
        </div>

        {/* Search */}
        <div className="hidden md:block">
           <SearchBar />
        </div>
      </nav>
    </div>
  );
}