import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  // 1. Await params (Next.js 16 requirement)
  const { q } = await searchParams;

  // 2. Handle empty search
  if (!q) {
    redirect("/");
  }

  // 3. Search Products (Case-insensitive)
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    },
    orderBy: {
      views: "desc", // Show most popular results first
    },
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">
          Search Results
        </p>
        <h1 className="font-heading text-3xl md:text-5xl font-black text-primary uppercase tracking-tight">
          "{q}"
        </h1>
        <p className="text-gray-500 mt-2">
          Found {products.length} {products.length === 1 ? 'result' : 'results'}
        </p>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product) => (
            <Link 
              key={product.id} 
              // 👇 CRITICAL FIX: Safe Link to prevent crash
              href={product.affiliateLink || product.topAffiliate || '#'} 
              target="_blank" 
              className="group block"
            >
              {/* Image Card */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 mb-4 shadow-sm group-hover:shadow-md transition-all">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300">
                    No Image
                  </div>
                )}
                
                {/* Shop Button Overlay */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  SHOP NOW ↗
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <h3 className="font-bold text-lg leading-tight group-hover:text-gray-600 transition-colors">
                  {product.name}
                </h3>
                {/* Optional: Show Views if you want */}
                {/* <p className="text-xs text-gray-400">{product.views} views</p> */}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-lg mb-4">We couldn't find anything matching "{q}".</p>
          <Link 
            href="/" 
            className="inline-block px-8 py-3 bg-black text-white font-bold rounded-full hover:scale-105 transition-transform"
          >
            Browse All Collections
          </Link>
        </div>
      )}
    </div>
  );
}