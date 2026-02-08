"use client";
import Link from 'next/link';
import Image from 'next/image';
import WishlistButton from './WishlistButton'; // Ensure this component exists

interface ProductProps {
  name: string;
  slug: string;
  imageUrl: string;
}

export default function ProductCard({ name, slug, imageUrl }: ProductProps) {
  return (
    <Link href={`/products/${slug}`} className="group block relative">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#F0F0F0] shadow-sm transition-shadow hover:shadow-md">
        
        {/* Wishlist Button (Floating) */}
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <WishlistButton productId={slug} />
        </div>

        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* Minimalist Text */}
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="font-heading text-lg leading-tight text-primary group-hover:text-gray-600 transition-colors">
            {name}
          </h3>
          <p className="text-xs text-secondary mt-1 font-medium">Limited Edition</p>
        </div>
        <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center bg-white group-hover:bg-black group-hover:text-white transition-all shadow-sm">
          <span className="text-[10px]">↗</span>
        </div>
      </div>
    </Link>
  );
}