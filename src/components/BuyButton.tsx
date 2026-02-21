"use client";

import { trackAction } from "@/app/actions/gamification";
import { toast } from "react-hot-toast";

export default function BuyButton({ link, price }: { link: string, price: number }) {
  const handleClick = async () => {
    // 1. Trigger the points logic (Gamification)
    // We use a try/catch so the button works even if gamification fails
    try {
        trackAction('CLICK').then((res) => {
            if(res) toast.success(`+${res.added} Points!`, { icon: '🪙' });
        });
    } catch (e) {
        console.log("Gamification skipped");
    }
    
    // 2. Open the affiliate link in a new tab
    window.open(link, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-black text-white font-bold text-lg py-4 rounded-full hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
    >
      <span>Buy Now</span>
      <span className="bg-white/20 px-2 py-0.5 rounded text-sm">${price}</span>
    </button>
  );
}