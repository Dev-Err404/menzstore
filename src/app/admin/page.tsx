import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Shirt, Layers } from "lucide-react"; 
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

  // Fetch data directly from the database
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
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-black">Admin Dashboard</h1>
          <p className="hidden sm:block text-sm font-medium text-gray-500">
            Total Outfits: <span className="text-black font-bold">{outfitsCount}</span>
          </p>
        </div>

        {/* Main Card with Responsive Padding */}
        <div className="bg-white p-5 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          
          {/* Card Header & Tabs */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-black mb-1">Dashboard</h2>
              <p className="text-gray-500 text-sm">Manage your inventory and collections.</p>
            </div>
            
            {/* Pill Navigation Tabs - Swaps text for icons on mobile */}
            <div className="flex items-center gap-1.5 md:gap-2 bg-gray-50 p-1 md:p-1.5 rounded-full border border-gray-100">
              <Link 
                href="/admin?tab=add" 
                className={`flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 rounded-full transition-all ${activeTab === 'add' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
              >
                <Plus size={18} />
                <span className="hidden md:inline text-sm font-bold">Add Outfit</span>
              </Link>
              
              <Link 
                href="/admin?tab=outfits" 
                className={`flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 rounded-full transition-all ${activeTab === 'outfits' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
              >
                <Shirt size={18} />
                <span className="hidden md:inline text-sm font-bold">
                  Outfits <span className="text-gray-400 font-medium text-xs ml-1">({outfitsCount})</span>
                </span>
                {/* Mobile-only count badge */}
                <span className="md:hidden text-[10px] font-bold bg-gray-200 text-gray-600 px-1.5 rounded-full">
                  {outfitsCount}
                </span>
              </Link>
              
              <Link 
                href="/admin?tab=categories" 
                className={`flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 rounded-full transition-all ${activeTab === 'categories' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
              >
                <Layers size={18} />
                <span className="hidden md:inline text-sm font-bold">
                  Categories <span className="text-gray-400 font-medium text-xs ml-1">({categoriesCount})</span>
                </span>
                {/* Mobile-only count badge */}
                <span className="md:hidden text-[10px] font-bold bg-gray-200 text-gray-600 px-1.5 rounded-full">
                  {categoriesCount}
                </span>
              </Link>
            </div>
          </div>

          {/* ------------------ TAB CONTENT ------------------ */}
          
          {activeTab === 'add' && (
            <div className="animate-in fade-in duration-300">
              {isSuccess && (
                <div className="p-4 mb-8 rounded-2xl font-bold text-sm bg-green-50 text-green-600 border border-green-100 flex items-center gap-3">
                  <Plus size={18} />
                  Outfit successfully added!
                </div>
              )}
              <OutfitForm categories={categories} />
            </div>
          )}

          {activeTab === 'outfits' && (
            <div className="animate-in fade-in duration-300">
               {isUpdated && (
                <div className="p-4 mb-8 rounded-2xl font-bold text-sm bg-blue-50 text-blue-600 border border-blue-100 flex items-center gap-3">
                  <Shirt size={18} />
                  Outfit updated successfully.
                </div>
              )}
              {/* Renders your OutfitsList component */}
              <OutfitsList outfits={outfits} categories={categories} />
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="animate-in fade-in duration-300">
              {/* Renders your CategoriesList component */}
              <CategoriesList categories={categories} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}