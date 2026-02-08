"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative hidden md:block w-64">
      <input
        type="text"
        placeholder="Search outfits..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-zinc-100 border-none rounded-full py-2 px-4 pl-10 text-sm focus:ring-2 focus:ring-black outline-none transition-all"
      />
      <svg
        className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </form>
  );
}