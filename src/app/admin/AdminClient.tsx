"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast"; 
import { 
  createProduct, 
  deleteProduct, 
  updateProduct, 
  createCategory, 
  deleteCategory, 
  updateCategory 
} from "./actions";

interface AdminClientProps {
  products: any[];
  categories: any[];
}

export default function AdminClient({ products, categories }: AdminClientProps) {
  const [activeTab, setActiveTab] = useState("add-product");
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setActiveTab("add-product");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForms = () => {
    setEditingProduct(null);
    setEditingCategory(null);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/50 min-h-[800px]">
      
      {/* --- HEADER & TABS --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h2 className="font-heading text-3xl font-bold text-primary tracking-tight">Dashboard</h2>
          <p className="text-secondary text-sm mt-1">Manage your inventory and collections.</p>
        </div>
        
        {/* Modern Pill Tabs */}
        <div className="flex bg-gray-100/50 p-1.5 rounded-full border border-gray-200/50">
          <button 
            onClick={() => { setActiveTab("add-product"); resetForms(); }}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === "add-product" ? "bg-white text-black shadow-lg shadow-black/5" : "text-gray-400 hover:text-gray-600"}`}
          >
            {editingProduct ? "Edit Outfit" : "+ Add Outfit"}
          </button>
          <button 
            onClick={() => { setActiveTab("manage-products"); resetForms(); }}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === "manage-products" ? "bg-white text-black shadow-lg shadow-black/5" : "text-gray-400 hover:text-gray-600"}`}
          >
            Outfits <span className="ml-1 opacity-40 text-xs">({products.length})</span>
          </button>
          <button 
            onClick={() => { setActiveTab("categories"); resetForms(); }}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === "categories" ? "bg-white text-black shadow-lg shadow-black/5" : "text-gray-400 hover:text-gray-600"}`}
          >
            Categories <span className="ml-1 opacity-40 text-xs">({categories.length})</span>
          </button>
        </div>
      </div>

      {/* --- TAB 1: ADD / EDIT PRODUCT FORM --- */}
      {activeTab === "add-product" && (
        <div className="animate-fade-in-up max-w-4xl mx-auto">
          
          {editingProduct && (
             <div className="bg-amber-50 border border-amber-100 text-amber-900 px-6 py-4 rounded-2xl mb-8 flex justify-between items-center shadow-sm">
               <span className="font-medium">✏️ Editing: <strong>{editingProduct.name}</strong></span>
               <button onClick={resetForms} className="text-xs font-bold bg-white/50 px-3 py-1 rounded-full hover:bg-white transition-colors">Cancel</button>
             </div>
          )}

          <form 
            action={async (formData) => {
              try {
                if (editingProduct) {
                  await updateProduct(formData);
                  toast.success("Outfit updated successfully!");
                  setEditingProduct(null);
                  setActiveTab("manage-products");
                } else {
                  await createProduct(formData);
                  toast.success("Outfit published!");
                  setActiveTab("manage-products");
                }
              } catch (e) {
                toast.error("Something went wrong.");
              }
            }} 
            className="space-y-8"
          >
            <input type="hidden" name="id" value={editingProduct?.id || ""} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Outfit Name</label>
                <input 
                  name="name" 
                  type="text" 
                  defaultValue={editingProduct?.name || ""}
                  className="w-full bg-gray-50 border border-gray-200 p-5 rounded-2xl focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all font-medium text-lg placeholder:text-gray-300" 
                  placeholder="e.g. Summer Linen Set" 
                  required 
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  {editingProduct ? "Update Image" : "Outfit Image"}
                </label>
                <div className="flex gap-4">
                  {editingProduct && (
                     <div className="w-16 h-16 relative rounded-xl overflow-hidden border border-gray-200 shrink-0">
                        <Image src={editingProduct.imageUrl} alt="Current" fill className="object-cover" />
                     </div>
                  )}
                  <div className="flex-1 relative">
                    <input 
                      name="imageFile" 
                      type="file" 
                      accept="image/*" 
                      className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-black file:text-white hover:file:bg-gray-800 transition-all text-sm text-gray-500" 
                      required={!editingProduct} 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Category</label>
              <div className="relative">
                <select 
                  name="categoryId" 
                  defaultValue={editingProduct?.categoryId || ""}
                  className="w-full appearance-none bg-gray-50 border border-gray-200 p-5 rounded-2xl focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all font-medium" 
                  required
                >
                  <option value="" disabled>Select a Collection</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-blue-400 uppercase tracking-widest ml-1">Top Affiliate Link</label>
                <textarea 
                  name="topAffiliate" 
                  defaultValue={editingProduct?.topAffiliate || ""}
                  className="w-full bg-blue-50/30 border border-blue-100 p-5 rounded-2xl h-32 focus:ring-2 focus:ring-blue-100 outline-none resize-none transition-all text-sm"
                  placeholder="Paste affiliate link here..."
                  required 
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-green-400 uppercase tracking-widest ml-1">Bottom Affiliate Link</label>
                <textarea 
                  name="bottomAffiliate" 
                  defaultValue={editingProduct?.bottomAffiliate || ""}
                  className="w-full bg-green-50/30 border border-green-100 p-5 rounded-2xl h-32 focus:ring-2 focus:ring-green-100 outline-none resize-none transition-all text-sm" 
                  placeholder="Paste affiliate link here..."
                  required 
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-heading font-bold text-lg hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl shadow-black/20">
              {editingProduct ? "Save Changes" : "Publish Outfit"}
            </button>
          </form>
        </div>
      )}

      {/* --- TAB 2: MANAGE PRODUCTS --- */}
      {activeTab === "manage-products" && (
        <div className="grid grid-cols-1 gap-4 animate-fade-in-up">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col md:flex-row md:items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-24 rounded-xl overflow-hidden shadow-sm">
                  <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xl text-primary">{product.name}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
                      👁️ {product.views || 0}
                    </span>
                    <a href={`/products/${product.slug}`} target="_blank" className="text-xs text-blue-500 hover:underline">View Live ↗</a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <button 
                  onClick={() => handleEditProduct(product)}
                  className="px-5 py-2.5 text-sm font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-black hover:text-white transition-all"
                >
                  Edit
                </button>

                <form action={async (formData) => {
                    await deleteProduct(formData);
                    toast.error("Outfit deleted.");
                }}>
                  <input type="hidden" name="id" value={product.id} />
                  <button type="submit" className="px-5 py-2.5 text-sm font-bold text-red-500 bg-red-50 border border-red-100 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl">
              <p className="text-gray-400 font-medium">No outfits in inventory yet.</p>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 3: CATEGORIES --- */}
      {activeTab === "categories" && (
        <div className="space-y-12 animate-fade-in-up max-w-4xl mx-auto">
          
          {/* Add/Edit Category Form Card */}
          <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-xl font-bold text-primary">
                {editingCategory ? `Edit: ${editingCategory.name}` : "Create New Collection"}
              </h3>
              {editingCategory && (
                <button onClick={resetForms} className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 px-3 py-1 rounded-full">Cancel</button>
              )}
            </div>

            <form 
              action={async (formData) => {
                if (editingCategory) {
                  await updateCategory(formData);
                  toast.success("Category updated!");
                  setEditingCategory(null);
                } else {
                  await createCategory(formData);
                  toast.success("Category created!");
                }
              }} 
              className="flex flex-col md:flex-row gap-4 items-stretch"
            >
              <input type="hidden" name="id" value={editingCategory?.id || ""} />
              
              <div className="flex-1">
                <input 
                  name="name" 
                  type="text" 
                  defaultValue={editingCategory?.name || ""}
                  placeholder="Collection Name (e.g. Winter 2026)" 
                  className="w-full h-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:ring-2 focus:ring-black outline-none font-medium" 
                  required 
                />
              </div>
              
              <div className="flex-1">
                 <input 
                  name="imageFile" 
                  type="file" 
                  accept="image/*" 
                  className="w-full h-full bg-white border border-gray-200 px-4 py-3 rounded-xl file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-all text-sm text-gray-500" 
                  required={!editingCategory} 
                />
              </div>

              <button type="submit" className="bg-black text-white px-8 py-4 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg whitespace-nowrap">
                {editingCategory ? "Save Update" : "Add Collection"}
              </button>
            </form>
          </div>

          {/* List Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="group relative flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-inner bg-gray-100">
                    <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className="font-heading font-bold text-lg text-primary">{cat.name}</span>
                </div>
                
                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute right-4">
                  <button 
                    onClick={() => handleEditCategory(cat)}
                    className="p-2 text-gray-500 bg-gray-50 rounded-lg hover:bg-black hover:text-white transition-colors"
                    title="Edit"
                  >
                    ✎
                  </button>
                  <form action={async (formData) => {
                      await deleteCategory(formData);
                      toast.error("Category deleted.");
                  }}>
                    <input type="hidden" name="id" value={cat.id} />
                    <button type="submit" className="p-2 text-red-400 bg-red-50 rounded-lg hover:bg-red-500 hover:text-white transition-colors" title="Delete">
                      ✕
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}