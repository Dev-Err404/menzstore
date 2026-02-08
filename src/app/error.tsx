"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an analytics service (optional)
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4 bg-cream">
      <h2 className="font-heading text-4xl font-bold mb-4 text-primary">Something went wrong!</h2>
      <p className="text-secondary mb-8">We encountered an issue loading this outfit.</p>
      
      <div className="flex gap-4">
        <button
          onClick={() => reset()} // Attempts to recover by re-rendering
          className="px-8 py-3 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors"
        >
          Try Again
        </button>
        <a href="/" className="px-8 py-3 border border-gray-200 rounded-full font-bold text-sm hover:bg-white transition-colors">
          Go Home
        </a>
      </div>
    </div>
  );
}