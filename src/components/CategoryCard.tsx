"use client";
import Link from 'next/link';
import Image from 'next/image';

interface CategoryProps {
  name: string;
  slug: string;
  imageUrl: string;
}

export default function CategoryCard({ name, slug, imageUrl }: CategoryProps) {
  return (
    <Link 
      href={`/categories/${slug}`} 
      className="group relative block overflow-hidden rounded-2xl aspect-[3/4] bg-zinc-100"
    >
      {/* Background Image with Zoom Effect */}
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      
      {/* Dark Overlay that fades in */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Slide-up Title Logic */}
      <div className="absolute inset-x-0 bottom-0 p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
        <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Collection</p>
        <h3 className="text-white text-2xl font-semibold leading-tight">
          {name}
        </h3>
        <div className="mt-4 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-700 delay-100" />
      </div>
    </Link>
  );
}