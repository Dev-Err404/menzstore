'use client';

import { useState } from 'react';
import Image from 'next/image';
import { deleteCategory } from '@/app/actions/product-actions';
import CategoryForm from './CategoryForm';
import { Edit2, Trash2, Plus, ImageIcon } from 'lucide-react';

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
      
      {isAdding ? (
        <CategoryForm onCancel={() => setIsAdding(false)} />
      ) : (
        <button 
          onClick={() => setIsAdding(true)}
          className="w-full mb-8 p-4 bg-white border border-gray-200 border-dashed rounded-2xl text-sm font-bold text-gray-500 hover:text-black hover:border-gray-400 transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus size={18} />
          Add New Collection
        </button>
      )}

      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm gap-4">
            
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0 relative flex items-center justify-center">
                  {cat.imageUrl ? (
                    <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover" sizes="48px" />
                  ) : (
                    <ImageIcon size={20} className="text-gray-300" />
                  )}
                </div>
              <div>
                <h3 className="font-bold text-black text-sm">{cat.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">{cat._count.products} Outfits</p>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-2 border-t border-gray-50 sm:border-0 pt-3 sm:pt-0">
              <button 
                onClick={() => setEditingCategory(cat)}
                className="flex items-center justify-center gap-1.5 text-gray-600 hover:text-black px-4 sm:px-3 py-2 bg-gray-50 sm:bg-transparent rounded-xl text-xs font-bold transition-all hover:bg-gray-100 flex-1 sm:flex-none"
              >
                <Edit2 size={14} />
                <span>Edit</span>
              </button>

              {cat._count.products === 0 ? (
                <form action={deleteCategory} className="flex-1 sm:flex-none">
                  <input type="hidden" name="id" value={cat.id} />
                  <button type="submit" className="w-full flex items-center justify-center gap-1.5 text-red-500 hover:text-red-700 px-4 sm:px-3 py-2 bg-red-50 sm:bg-transparent rounded-xl text-xs font-bold transition-all hover:bg-red-100">
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </form>
              ) : (
                <span className="flex-1 sm:flex-none text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold px-4 py-2 sm:px-3 bg-gray-50 rounded-xl cursor-not-allowed">
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