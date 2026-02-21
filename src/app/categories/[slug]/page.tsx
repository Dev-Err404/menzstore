import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sort } = await searchParams;

  // 1. Fetch Category
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) return notFound();

 // Fetch Products with inline sorting logic
  const products = await prisma.product.findMany({
    where: { categoryId: category.id },
    orderBy: sort === 'popular' ? { views: 'desc' } : { createdAt: 'desc' },
  });

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto">
      
      {/* Header */}
      <header className="mb-12 flex flex-col items-start justify-between gap-6">
        <div>
           <span className="text-xs font-bold text-secondary uppercase tracking-widest">Collection</span>
           <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary mt-2 uppercase leading-none">
             {category.name}
           </h1>
        </div>

        {/* Filter UI (Pill Shape) */}
        <div className="w-fit inline-flex items-center p-1 bg-gray-100 border border-gray-200 rounded-full">
          <Link 
            href={`/categories/${slug}`}
            scroll={false}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
              !sort 
                ? "bg-black text-white shadow-sm" 
                : "text-gray-500 hover:text-black hover:bg-white/60"
            }`}
          >
            Newest
          </Link>

          <Link 
            href={`/categories/${slug}?sort=popular`}
            scroll={false}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
              sort === 'popular' 
                ? "bg-black text-white shadow-sm" 
                : "text-gray-500 hover:text-black hover:bg-white/60"
            }`}
          >
            Most Popular
          </Link>
        </div>
      </header>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {products.map((product) => (
             <Link 
              key={product.id} 
              // 👇 FIX: Changed this back to point to YOUR internal page
              href={`/products/${product.slug}`}
              // Removed target="_blank" because it's an internal link now
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
                
                {/* Optional: 'Quick View' or 'Shop' Badge */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  VIEW OUTFIT ↗
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <h3 className="font-bold text-lg leading-tight group-hover:text-gray-600 transition-colors">
                  {product.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border rounded-3xl border-dashed border-gray-200">
          <p className="text-gray-400">No products found in this collection.</p>
        </div>
      )}
    </main>
  );
}