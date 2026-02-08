import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-cream text-center px-4">
      <h1 className="font-heading text-9xl font-bold text-gray-200">404</h1>
      <p className="font-heading text-2xl font-bold text-primary -mt-8 mb-4">Out of Stock?</p>
      <p className="text-secondary mb-8 max-w-md">
        We couldn't find the page you're looking for. It might have been moved or the item is sold out.
      </p>
      <Link href="/" className="px-8 py-3 bg-black text-white rounded-full font-bold text-sm hover:scale-105 transition-transform">
        Back to Drops
      </Link>
    </div>
  );
}