'use client';

import { useState } from 'react';
import Image from 'next/image';
import { addProduct, updateProduct } from '@/app/actions/product-actions';

type Props = {
  categories: any[];
  outfit?: any; // If provided, we are in "Edit" mode
  onCancel?: () => void;
};

export default function OutfitForm({ categories, outfit, onCancel }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(outfit?.imageUrl || null);
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
      setImagePreview(outfit?.imageUrl || null);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    if (outfit) {
      await updateProduct(formData);
    } else {
      await addProduct(formData);
    }
    setIsSubmitting(false);
  };

  return (
    <form action={handleSubmit} className="space-y-8 animate-in fade-in">
      {outfit && <input type="hidden" name="id" value={outfit.id} />}

      {/* Image Upload & Preview */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">
          Outfit Image
        </label>
        <div className="flex items-start gap-6">
          <div className="w-32 h-40 rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden relative shrink-0">
            {imagePreview ? (
              <Image src={imagePreview} alt="Preview" fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
            )}
          </div>
          <div className="flex-grow">
            <input
              type="file"
              name="image"
              accept="image/*"
              required={!outfit} // Required only for new outfits
              onChange={handleImageChange}
              className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-[#fafafa] focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm text-gray-500 cursor-pointer file:mr-4 file:py-2 file:px-5 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-black file:text-white hover:file:bg-gray-800 file:cursor-pointer file:transition-all"
            />
            <p className="text-xs text-gray-400 mt-2">
              {outfit ? "Upload a new image to replace the current one." : "Upload a high-quality image of the outfit."}
            </p>
          </div>
        </div>
      </div>

      {/* Row 1: Name & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Outfit Name</label>
          <input type="text" name="name" defaultValue={outfit?.name} required className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-[#fafafa] focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium" placeholder="e.g. Summer Linen Set" />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Category</label>
          <select name="categoryId" defaultValue={outfit?.categoryId} required className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-[#fafafa] focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium appearance-none">
            <option value="">Select a Collection</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Description</label>
        <textarea name="description" defaultValue={outfit?.description || ''} rows={3} required className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-[#fafafa] focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium resize-none" placeholder="Designed for the modern minimalist..."></textarea>
      </div>

      {/* Row 2: Affiliate Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-blue-500 mb-3">Top Affiliate Link</label>
          <input type="url" name="topAffiliate" defaultValue={outfit?.topAffiliate || ''} className="w-full px-5 py-4 rounded-2xl border border-blue-50 bg-[#fafafa] focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium" placeholder="Paste affiliate link here..." />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-green-500 mb-3">Bottom Affiliate Link</label>
          <input type="url" name="bottomAffiliate" defaultValue={outfit?.bottomAffiliate || ''} className="w-full px-5 py-4 rounded-2xl border border-green-50 bg-[#fafafa] focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all text-sm font-medium" placeholder="Paste affiliate link here..." />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex items-center gap-4">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-8 py-5 bg-white text-black font-bold text-lg rounded-[1.25rem] border border-gray-200 hover:bg-gray-50 transition-all">
            Cancel
          </button>
        )}
        <button type="submit" disabled={isSubmitting} className="flex-grow bg-black text-white font-bold text-lg py-5 rounded-[1.25rem] hover:bg-gray-800 transition-all shadow-[0_8px_20px_rgb(0,0,0,0.15)] hover:shadow-[0_8px_25px_rgb(0,0,0,0.25)] disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? (outfit ? 'Updating...' : 'Publishing...') : (outfit ? 'Update Outfit' : 'Publish Outfit')}
        </button>
      </div>
    </form>
  );
}