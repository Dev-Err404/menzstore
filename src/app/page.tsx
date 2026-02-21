import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';

// Cache for 1 hour (3600 seconds) - products don't change that often
export const revalidate = 3600;

export default async function Home() {
  const newArrivals = await prisma.product.findMany({ take: 4, orderBy: { createdAt: 'desc' } });
  const categories = await prisma.category.findMany();

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto">
      
      {/* 1. HERO SECTION */}
      <section className="mb-32 text-center animate-fade-in-up">
        <span className="inline-block py-1 px-3 rounded-full bg-gray-100 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-6">
          Season 2026
        </span>
        <h1 className="font-heading text-6xl md:text-9xl font-bold tracking-tighter text-primary leading-[0.9] mb-8">
          WEAR THE <br /> <span className="text-gray-300">MOMENT.</span>
        </h1>
        <p className="text-secondary text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10">
          A curated selection of outfits for the digital nomad, the creator, and the minimalist.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/categories" className="bg-primary text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg">
            BROWSE COLLECTIONS
          </Link>
        </div>
      </section>

      {/* 2. TRENDING SCROLL */}
      <section className="mb-32">
        <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-4">
          <h2 className="font-heading text-4xl font-bold">Latest Drops</h2>
          <Link href="/categories" className="text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <ProductCard 
              key={product.id}
              name={product.name}
              slug={product.slug}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </section>

      {/* 3. CATEGORIES AS "MAGAZINE COVERS" */}
      <section className="mb-32">
        <h2 className="font-heading text-4xl font-bold mb-12">Curated By Style</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/categories/${cat.slug}`} className="group relative h-[600px] overflow-hidden bg-gray-100">
               {cat.imageUrl ? (
                 <Image 
                   src={cat.imageUrl} 
                   alt={cat.name}
                   fill
                   className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                 />
               ) : (
                 <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
               )}

               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
               
               <div className="absolute inset-0 flex flex-col justify-end p-10">
                 <h3 className="font-heading text-3xl text-white group-hover:translate-x-2 transition-transform duration-500">
                   {cat.name}
                 </h3>
                 <p className="text-gray-200 text-sm mt-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                   Explore Collection →
                 </p>
               </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. NEWSLETTER SECTION */}
      <section className="py-20 border-t border-gray-100 bg-white/50 rounded-3xl text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-bold mb-4">Join the Inner Circle</h2>
          <p className="text-secondary mb-8">Get exclusive access to new drops, styling tips, and hidden sales.</p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-white border border-gray-200 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
            />
            <button className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}