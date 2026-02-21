'use client';

import { useState } from 'react';
import Image from 'next/image';
import { deleteProduct } from '@/app/actions/product-actions';
import OutfitForm from './OutfitForm';

type Props = {
  outfits: any[];
  categories: any[];
};

export default function OutfitsList({ outfits, categories }: Props) {
  const [editingOutfit, setEditingOutfit] = useState<any | null>(null);

  if (editingOutfit) {
    return (
      <div className="mb-10 p-6 bg-[#fafafa] border border-gray-100 rounded-[2.5rem]">
        <h3 className="text-2xl font-bold mb-8">Edit Outfit</h3>
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
        <div key={outfit.id} className="flex items-center justify-between p-4 bg-[#fafafa] border border-gray-100 rounded-2xl hover:border-gray-200 transition-all">
          <div className="flex items-center gap-5">
            <div className="w-16 h-20 rounded-xl overflow-hidden bg-white border border-gray-100 shrink-0 relative">
              {outfit.imageUrl && (
                <Image src={outfit.imageUrl} alt={outfit.name} fill className="object-cover" sizes="64px" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-black text-sm">{outfit.name}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-white px-2 py-0.5 rounded-md border border-gray-100">
                  {outfit.category.name}
                </span>
                <span className="text-xs text-gray-400">{outfit.views} views</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setEditingOutfit(outfit)}
              className="text-gray-500 hover:text-black px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-gray-100"
            >
              Edit
            </button>
            <form action={deleteProduct}>
              <input type="hidden" name="id" value={outfit.id} />
              <button type="submit" className="text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl text-xs font-bold transition-all">
                Delete
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}