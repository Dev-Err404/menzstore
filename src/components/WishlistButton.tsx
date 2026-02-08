"use client";
import { useState, useEffect } from "react";

export default function WishlistButton({ productId }: { productId: string }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (saved.includes(productId)) setIsSaved(true);
  }, [productId]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent clicking the parent link
    const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
    
    if (isSaved) {
      const newSaved = saved.filter((id: string) => id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(newSaved));
      setIsSaved(false);
    } else {
      saved.push(productId);
      localStorage.setItem("wishlist", JSON.stringify(saved));
      setIsSaved(true);
    }
  };

  return (
    <button 
      onClick={toggleWishlist}
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${isSaved ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-400 hover:bg-white hover:text-red-400'}`}
    >
      {isSaved ? "♥" : "♡"}
    </button>
  );
}