'use client';

import { useState } from 'react';
import Image from 'next/image';
import { deleteProduct } from '@/app/actions/product-actions';
import OutfitForm from './OutfitForm';
import { Edit2, Trash2, Eye } from 'lucide-react'; // Added icons

type Props = {
  outfits: any[];
  categories: any[];
};

export default function OutfitsList({ outfits, categories }: Props) {
  const [editingOutfit, setEditingOutfit] = useState<any | null>(null);

  if (editingOutfit) {
    return (
      <div className="mb-10 p-5 md:p-6 bg-[#fafafa] border border-gray-100 rounded-[2rem] md:rounded-[2.5rem] animate-in fade-in slide-in-from-bottom-4">
        <OutfitForm 
          categories={categories} 
          outfit={editingOutfit} 
          onCancel={() => setEditingOutfit(null)} 
        />
      </div>
    );
  }

  if (outfits.length === 0) {
    return <div className="py-12 text-center text-gray-400">No outfits uploaded yet.</div>;
  }

  return (
    <div className="space-y-4 animate-in fade-in">
      {outfits.map((outfit) => (
        <div key={outfit.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 transition-all gap-4 shadow-sm sm:shadow-none">
          
          {/* Top/Left Section: Image and Details */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0 relative">
              {outfit.imageUrl && (
                <Image src={outfit.imageUrl} alt={outfit.name} fill className="object-cover" sizes="64px" />
              )}
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-black text-sm line-clamp-1">{outfit.name}</h3>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                  {outfit.category.name}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                  <Eye size={12} /> {outfit.views}
                </span>
              </div>
            </div>
          </div>
          
          {/* Bottom/Right Section: Action Buttons */}
          <div className="flex items-center justify-end gap-2 border-t border-gray-50 sm:border-0 pt-3 sm:pt-0">
            <button 
              onClick={() => setEditingOutfit(outfit)}
              className="flex items-center justify-center gap-1.5 text-gray-600 hover:text-black px-4 sm:px-3 py-2 bg-gray-50 sm:bg-transparent rounded-xl text-xs font-bold transition-all hover:bg-gray-100 flex-1 sm:flex-none"
            >
              <Edit2 size={14} />
              <span>Edit</span>
            </button>
            <form action={deleteProduct} className="flex-1 sm:flex-none">
              <input type="hidden" name="id" value={outfit.id} />
              <button type="submit" className="w-full flex items-center justify-center gap-1.5 text-red-500 hover:text-red-700 px-4 sm:px-3 py-2 bg-red-50 sm:bg-transparent rounded-xl text-xs font-bold transition-all hover:bg-red-100">
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </form>
          </div>

        </div>
      ))}
    </div>
  );
}