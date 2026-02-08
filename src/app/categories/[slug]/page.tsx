import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>; // Catch ?sort=popular
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sort } = await searchParams; // Get sort option

  // 1. Fetch Category Info
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) return notFound();

  // 2. Determine Sort Order
  let orderBy = {};
  if (sort === 'popular') {
    orderBy = { views: 'desc' };
  } else {
    orderBy = { createdAt: 'desc' }; // Default: Newest
  }

  // 3. Fetch Products with Sort
  const products = await prisma.product.findMany({
    where: { categoryId: category.id },
    orderBy: orderBy,
  });

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <span className="text-xs font-bold text-secondary uppercase tracking-widest">Collection</span>
           <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary mt-2 uppercase">{category.name}</h1>
        </div>

        {/* Sort Dropdown (Simple Links) */}
        <div className="flex gap-2 bg-white border border-gray-200 p-1 rounded-lg">
          <Link 
            href={`/categories/${slug}`} 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${!sort ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Newest
          </Link>
          <Link 
            href={`/categories/${slug}?sort=popular`} 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${sort === 'popular' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Most Popular
          </Link>
        </div>
      </header>

      {/* Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {products.map((p) => (
            <ProductCard key={p.id} name={p.name} slug={p.slug} imageUrl={p.imageUrl} />
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