import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

// Helper to handle search params in Server Components
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q : '';

  // Fetch products that match the name OR the description
  const results = query ? await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
  }) : [];

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-zinc-900">
            Search Results for <span className="text-zinc-500">"{query}"</span>
          </h1>
          <p className="text-zinc-400 mt-2">Found {results.length} outfit(s)</p>
        </header>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {results.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                slug={product.slug}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-zinc-400 mb-4">No outfits found matching your search.</p>
            <Link href="/" className="text-zinc-900 underline font-medium">Back to Homepage</Link>
          </div>
        )}
      </div>
    </main>
  );
}