import { prisma } from "@/lib/prisma";
import Link from "next/link";
import OutfitForm from "@/components/admin/OutfitForm";
import OutfitsList from "@/components/admin/OutfitsList";
import CategoriesList from "@/components/admin/CategoriesList";

type Props = {
  searchParams: Promise<{ success?: string; updated?: string; tab?: string }>;
};

export default async function AdminDashboard({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const isSuccess = resolvedParams.success === 'true';
  const isUpdated = resolvedParams.updated === 'true';
  const activeTab = resolvedParams.tab || 'add';

  // Fetch data
  const categoriesCount = await prisma.category.count();
  const outfitsCount = await prisma.product.count();
  
  const categories = await prisma.category.findMany({ 
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' } 
  });
  
  const outfits = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-32 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Main Header */}
        <div className="flex justify-between items-end mb-10 px-2">
          <h1 className="text-4xl font-black tracking-tight text-black">Admin Dashboard</h1>
          <p className="text-sm font-medium text-gray-500">
            Total Outfits: <span className="text-black font-bold">{outfitsCount}</span>
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          
          {/* Card Header & Tabs */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h2 className="text-2xl font-bold text-black mb-1">Dashboard</h2>
              <p className="text-gray-500 text-sm">Manage your inventory and collections.</p>
            </div>
            
            {/* Pill Navigation Tabs */}
            <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-100">
              <Link 
                href="/admin?tab=add" 
                className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all ${activeTab === 'add' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
              >
                + Add Outfit
              </Link>
              <Link 
                href="/admin?tab=outfits" 
                className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all ${activeTab === 'outfits' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
              >
                Outfits <span className="text-gray-400 font-medium text-xs ml-1">({outfitsCount})</span>
              </Link>
              <Link 
                href="/admin?tab=categories" 
                className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all ${activeTab === 'categories' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
              >
                Categories <span className="text-gray-400 font-medium text-xs ml-1">({categoriesCount})</span>
              </Link>
            </div>
          </div>

          {/* ------------------ TAB 1: ADD OUTFIT FORM ------------------ */}
          {activeTab === 'add' && (
            <div className="animate-in fade-in duration-300">
              {isSuccess && (
                <div className="p-4 mb-8 rounded-2xl font-bold text-sm bg-green-50 text-green-600 border border-green-100 flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Outfit successfully added!
                </div>
              )}
              <OutfitForm categories={categories} />
            </div>
          )}

          {/* ------------------ TAB 2: OUTFITS LIST ------------------ */}
          {activeTab === 'outfits' && (
            <div>
               {isUpdated && (
                <div className="p-4 mb-8 rounded-2xl font-bold text-sm bg-blue-50 text-blue-600 border border-blue-100 flex items-center gap-3 animate-in fade-in">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Outfit updated successfully.
                </div>
              )}
              <OutfitsList outfits={outfits} categories={categories} />
            </div>
          )}

          {/* ------------------ TAB 3: CATEGORIES LIST ------------------ */}
          {activeTab === 'categories' && (
            <CategoriesList categories={categories} />
          )}

        </div>
      </div>
    </div>
  );
}