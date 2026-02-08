"use client";
import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden pointer-events-auto">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-primary font-bold text-xl">
        {isOpen ? "✕" : "☰"}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-xl p-6 flex flex-col gap-6 animate-fade-in-up z-50">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-blue-600">Home</Link>
          <Link href="/categories" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-blue-600">Collections</Link>
          {/* Admin Link Removed */}
        </div>
      )}
    </div>
  );
}