'use client';

import { useState } from 'react';
import Image from 'next/image';
import { addCategory, updateCategory } from '@/app/actions/product-actions';

type Props = {
  category?: any; // If provided, we are in "Edit" mode
  onCancel?: () => void;
};

export default function CategoryForm({ category, onCancel }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(category?.imageUrl || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(category?.imageUrl || null);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    if (category) {
      await updateCategory(formData);
    } else {
      await addCategory(formData);
    }
    setIsSubmitting(false);
    if (onCancel) onCancel(); // Close form after successful submit
  };

  return (
    <form action={handleSubmit} className="mb-10 p-6 bg-[#fafafa] border border-gray-100 rounded-[2rem] animate-in fade-in">
      <h3 className="text-lg font-bold mb-6">{category ? `Edit ${category.name}` : 'Add New Collection'}</h3>
      {category && <input type="hidden" name="id" value={category.id} />}
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Image Preview */}
        <div className="w-24 h-24 rounded-2xl border border-gray-200 bg-white overflow-hidden relative shrink-0">
           {imagePreview ? (
              <Image src={imagePreview} alt="Preview" fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
            )}
        </div>

        <div className="flex-grow space-y-4">
          {/* Name Input */}
          <div>
             <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">Collection Name</label>
            <input 
              type="text" 
              name="name"
              defaultValue={category?.name}
              placeholder="e.g. Winter Wear" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm font-medium bg-white"
            />
          </div>
          
          {/* Image Input */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">Cover Image</label>
            <input
                type="file"
                name="image"
                accept="image/*"
                required={!category} // Required only for new categories
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white file:text-black file:border-gray-200 file:border hover:file:bg-gray-50 file:cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:text-black hover:bg-gray-100 transition-all">
            Cancel
          </button>
        )}
        <button type="submit" disabled={isSubmitting} className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-sm disabled:opacity-50">
          {isSubmitting ? 'Saving...' : (category ? 'Update Collection' : 'Add Collection')}
        </button>
      </div>
    </form>
  );
}