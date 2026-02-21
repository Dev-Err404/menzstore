import Link from "next/link";
import Image from "next/image";
import { getSmartRecommendations } from "@/app/actions/smart-engine";

export default async function RecommendedSection({ currentProductId }: { currentProductId: string }) {
  const products = await getSmartRecommendations(currentProductId);

  if (products.length === 0) return null;

  return (
    <div className="border-t border-gray-100 pt-16 mt-16">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xl">✨</span>
        <h2 className="font-heading text-2xl font-bold uppercase tracking-tight">
          Recommended For You
        </h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.slug}`} className="group block">
            <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all">
              {p.imageUrl && (
                <Image 
                   src={p.imageUrl} 
                   alt={p.name} 
                   fill 
                   className="object-cover transition-transform duration-700 group-hover:scale-105" 
                   sizes="(max-width: 768px) 50vw, 25vw"
                />
              )}
              {/* Smart Badge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Pick for you
              </div>
            </div>
            <h3 className="font-bold text-sm text-primary truncate group-hover:text-gray-600 transition-colors">
              {p.name}
            </h3>
            <p className="text-gray-500 text-xs mt-1 font-medium">${p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}