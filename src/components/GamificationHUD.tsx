"use client";
import { useState, useEffect } from 'react';
import { getOrCreateVisitor } from '@/app/actions/gamification';

export default function GamificationHUD() {
  const [points, setPoints] = useState(0);
  const [name, setName] = useState('Loading...');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only load on mount, no polling to reduce server requests
    getOrCreateVisitor().then(data => {
        if(data) {
            setPoints(data.points);
            setName(data.name);
            setIsLoaded(true);
        }
    });
  }, []);

  if (points === 0) return null; // Hide if loading or no points

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-fade-in-up">
      <div className="bg-black/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4">
        {/* Level Circle */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 w-10 h-10 rounded-full shadow-lg">
           <span className="text-[10px] font-black text-black leading-none">LVL</span>
           <span className="text-sm font-bold text-black leading-none">{Math.floor(points / 500) + 1}</span>
        </div>
        
        {/* Info */}
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{name}</span>
          <span className="text-lg font-mono font-bold text-white leading-none">
            {points.toLocaleString()} <span className="text-yellow-400 text-sm">PTS</span>
          </span>
        </div>
      </div>
    </div>
  );
}