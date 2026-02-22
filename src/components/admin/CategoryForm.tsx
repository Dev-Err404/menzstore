'use client';

import { useState } from 'react';
import Image from 'next/image';
import { addCategory, updateCategory } from '@/app/actions/product-actions';
import { ImageIcon, X, Plus, Save } from 'lucide-react'; // Using icons for mobile clarity

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
    try {
      if (category) {
        await updateCategory(formData);
      } else {
        await addCategory(formData);
      }
      if (onCancel) onCancel();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      action={handleSubmit} 
      className="mb-10 p-5 md:p-8 bg-[#fafafa] border border-gray-100 rounded-[2rem] shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-black">
          {category ? `Edit ${category.name}` : 'Add New Collection'}
        </h3>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {category && <input type="hidden" name="id" value={category.id} />}
      
      {/* Mobile-optimized Container: Stacks on small, Rows on large */}
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        
        {/* Image Preview Area */}
        <div className="relative group">
          <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-gray-200 bg-white overflow-hidden relative shrink-0 flex items-center justify-center">
             {imagePreview ? (
                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-1 text-gray-300">
                  <ImageIcon size={28} />
                  <span className="text-[10px] font-bold uppercase">No Image</span>
                </div>
              )}
          </div>
          <input
            type="file"
            name="image"
            accept="image/*"
            required={!category}
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
        </div>

        <div className="w-full space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2 px-1">
              Collection Name
            </label>
            <input 
              type="text" 
              name="name"
              defaultValue={category?.name}
              placeholder="e.g. Winter Wear 2026" 
              required
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm font-medium bg-white transition-all shadow-sm"
            />
          </div>
          
          {/* Mobile Image Helper Text */}
          <div className="sm:hidden text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Tap the icon above to upload cover
            </p>
          </div>

          <div className="hidden sm:block">
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2 px-1">
              Update Cover Image
            </label>
            <p className="text-xs text-gray-400">
              Recommended: 1:1 Square aspect ratio for the collection covers.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons: Full width on mobile */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel} 
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold text-gray-500 hover:text-black hover:bg-gray-100 transition-all border border-transparent"
          >
            Cancel
          </button>
        )}
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full sm:w-auto bg-black text-white px-8 py-3.5 rounded-2xl text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : category ? (
            <>
              <Save size={16} />
              Update Collection
            </>
          ) : (
            <>
              <Plus size={16} />
              Add Collection
            </>
          )}
        </button>
      </div>
    </form>
  );
}