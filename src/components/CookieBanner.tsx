"use client";
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-up">
      <p className="text-sm text-secondary text-center md:text-left">
        We use cookies to improve your experience and track affiliate performance. By using our site, you agree to our terms.
      </p>
      <div className="flex gap-3">
        <button onClick={accept} className="px-6 py-2 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-colors">
          Accept
        </button>
      </div>
    </div>
  );
}