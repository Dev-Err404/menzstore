"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show on home page
  if (pathname === '/') return null;

  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <nav className="text-xs text-secondary mb-6 flex items-center gap-2 capitalize">
      <Link href="/" className="hover:text-primary transition-colors">Home</Link>
      
      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;

        return (
          <div key={segment} className="flex items-center gap-2">
            <span className="text-gray-300">/</span>
            {isLast ? (
              <span className="font-bold text-primary">{segment.replace(/-/g, ' ')}</span>
            ) : (
              <Link href={href} className="hover:text-primary transition-colors">
                {segment.replace(/-/g, ' ')}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}