import { prisma } from "@/lib/prisma";
import AdminClient from "./AdminClient";

export const dynamic = 'force-dynamic'; // Ensures admin data is always fresh

export default async function AdminPage() {
  // Fetch everything we need for the dashboard
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <main className="min-h-screen bg-[#fafafa] p-6 md:p-20 text-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <h1 className="text-4xl font-bold tracking-tighter">Admin Dashboard</h1>
          <div className="text-right">
             <p className="text-sm text-zinc-500">Total Outfits: <span className="font-bold text-zinc-900">{products.length}</span></p>
          </div>
        </div>
        
        {/* Pass data to the client component to handle tabs */}
        <AdminClient products={products} categories={categories} />
      </div>
    </main>
  );
}