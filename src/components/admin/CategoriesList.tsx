'use client';

import { useState } from 'react';
import Image from 'next/image';
import { deleteCategory } from '@/app/actions/product-actions';
import CategoryForm from './CategoryForm';

type Props = {
  categories: any[];
};

export default function CategoriesList({ categories }: Props) {
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  if (editingCategory) {
    return (
      <CategoryForm 
        category={editingCategory} 
        onCancel={() => setEditingCategory(null)} 
      />
    );
  }

  return (
    <div className="animate-in fade-in">
      
      {/* Add New Category Button or Form */}
      {isAdding ? (
        <CategoryForm onCancel={() => setIsAdding(false)} />
      ) : (
        <button 
          onClick={() => setIsAdding(true)}
          className="w-full mb-8 p-4 bg-[#fafafa] border border-gray-100 rounded-2xl text-sm font-bold text-gray-500 hover:text-black hover:border-gray-300 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Add New Collection
        </button>
      )}

      {/* Categories List */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0 relative">
                  {cat.imageUrl ? (
                    <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover" sizes="48px" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                  )}
                </div>
              <div>
                <h3 className="font-bold text-black text-sm">{cat.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{cat._count.products} Outfits</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setEditingCategory(cat)}
                className="text-gray-500 hover:text-black px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:bg-gray-50"
              >
                Edit
              </button>
              {cat._count.products === 0 ? (
                <form action={deleteCategory}>
                  <input type="hidden" name="id" value={cat.id} />
                  <button type="submit" className="text-red-400 hover:text-red-600 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all">
                    Delete
                  </button>
                </form>
              ) : (
                <span className="text-[10px] text-gray-300 uppercase tracking-widest font-bold px-3 py-1.5 cursor-not-allowed">
                  In Use
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}