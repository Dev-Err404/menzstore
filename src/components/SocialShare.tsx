"use client";
import { usePathname } from 'next/navigation';

export default function SocialShare({ name }: { name: string }) {
  const pathname = usePathname();
  // In production, use your actual domain. For now, we use window.location if available.
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const shareLinks = [
    { name: "WhatsApp", url: `https://wa.me/?text=${encodeURIComponent(`Check out this ${name}: ${url}`)}`, color: "hover:bg-green-500" },
    { name: "Twitter", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(name)}&url=${encodeURIComponent(url)}`, color: "hover:bg-blue-400" },
    { name: "Pinterest", url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(name)}`, color: "hover:bg-red-500" },
  ];

  return (
    <div className="flex gap-2 mt-6">
      {shareLinks.map((link) => (
        <a 
          key={link.name} 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`px-4 py-2 rounded-full border border-gray-200 text-xs font-bold text-gray-500 transition-colors ${link.color} hover:text-white hover:border-transparent`}
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}