import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { Metadata } from 'next';
import SocialShare from '@/components/SocialShare'; // <--- Import

// ... keep generateMetadata function ...

export default async function ProductDetails({ params }: { params: Promise<{ slug: string }> }) {
  // ... keep existing data fetching logic ...
  const { slug } = await params;
  
  let product;
  try {
     product = await prisma.product.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });
  } catch (e) { return notFound(); }

  const relatedProducts = await prisma.product.findMany({
    where: { categoryId: product.categoryId, NOT: { id: product.id } },
    take: 4,
    orderBy: { views: 'desc' }
  });

  return (
    <div className="bg-cream min-h-screen pt-24 md:pt-32 pb-20">
      <main className="flex flex-col md:flex-row max-w-[1400px] mx-auto gap-12 px-6">
        
        {/* LEFT: Image */}
        <section className="w-full md:w-1/2 md:sticky md:top-32 h-fit flex justify-center">
          <div className="relative w-full max-w-[400px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100 ring-1 ring-black/5">
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* RIGHT: Details */}
        <section className="w-full md:w-1/2 flex flex-col justify-center py-4 md:py-10">
          <div className="max-w-lg">
            {/* ... keep header (views/title/description) ... */}
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
              <span className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-secondary">Season 2026</span>
              <span className="text-xs font-mono text-secondary bg-white border border-gray-100 px-3 py-1 rounded-full shadow-sm">👁️ {product.views} Views</span>
            </div>
            
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-8 leading-none uppercase">{product.name}</h1>
            <p className="text-secondary text-lg mb-8 leading-relaxed font-light">{product.description || "Designed for the modern minimalist."}</p>

            {/* NEW: Social Share Buttons */}
            <div className="mb-12">
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Share this look</p>
               <SocialShare name={product.name} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mb-16">
               <h3 className="font-heading text-xs font-bold uppercase tracking-widest mb-4 text-primary">Shop The Look</h3>
               
               <a href={product.topAffiliate} target="_blank" className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-black hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xl group-hover:bg-black group-hover:text-white transition-colors">👕</div>
                    <div>
                      <span className="block font-bold text-primary group-hover:underline decoration-1 underline-offset-4">Upper Wear</span>
                      <span className="text-xs text-secondary">View Details</span>
                    </div>
                  </div>
                  <span className="text-xl text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all">→</span>
               </a>

               <a href={product.bottomAffiliate} target="_blank" className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-black hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xl group-hover:bg-black group-hover:text-white transition-colors">👖</div>
                    <div>
                      <span className="block font-bold text-primary group-hover:underline decoration-1 underline-offset-4">Lower Wear</span>
                      <span className="text-xs text-secondary">View Details</span>
                    </div>
                  </div>
                  <span className="text-xl text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all">→</span>
               </a>
            </div>
          </div>
        </section>
      </main>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="px-6 py-24 border-t border-gray-200 max-w-[1400px] mx-auto">
          <h2 className="font-heading text-3xl font-bold mb-12">You Might Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} name={p.name} slug={p.slug} imageUrl={p.imageUrl} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}