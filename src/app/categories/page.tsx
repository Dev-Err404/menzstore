import CategoryCard from '@/components/CategoryCard';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'All Categories | Affiliate Store',
  description: 'Browse all our curated collections.',
};

export default async function AllCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 border-b border-zinc-100 pb-10">
          <h1 className="text-5xl font-bold tracking-tighter text-zinc-900 mb-4">
            Collections
          </h1>
          <p className="text-zinc-500 text-lg max-w-md">
            Explore our complete list of curated categories.
          </p>
        </header>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <CategoryCard 
                key={cat.id} 
                name={cat.name} 
                slug={cat.slug} 
                imageUrl={cat.imageUrl} 
              />
            ))
          ) : (
            <p className="text-zinc-400 italic">No categories found yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}