'use client';

import { useState } from 'react';
import { searchOutfitAI } from '@/app/actions/vision-actions';

export default function VisualFinder() {
  const [isSearching, setIsSearching] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [realResults, setRealResults] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show image preview instantly
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    // Prepare UI for search
    setIsSearching(true);
    setErrorMsg(null);
    setRealResults([]);

    const formData = new FormData();
    formData.append("image", file);

    // Call the actual AI backend
    const response = await searchOutfitAI(formData);

    if (response.success && response.results) {
      setRealResults(response.results);
    } else {
      setErrorMsg(response.error || "Could not find any matching outfits.");
    }
    
    setIsSearching(false);
  };

  const handleCopy = (link: string, index: number) => {
    navigator.clipboard.writeText(link);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-10">
          <h1 className="font-heading text-4xl font-black uppercase tracking-tight text-primary">
            Visual Link Finder
          </h1>
          <p className="text-gray-500 mt-2">
            Upload an outfit image to instantly scan Myntra, Amazon, and Flipkart for exact matching affiliate links.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Image Upload Area */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col">
              <label className="block text-sm font-bold text-gray-700 mb-4">Target Image</label>
              
              <div className="flex-grow relative border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer overflow-hidden aspect-[4/5]">
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <p className="text-sm text-gray-500 font-medium">Click to upload outfit</p>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>

          {/* Right: Search Results Area */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full min-h-[400px]">
              
              {isSearching ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-6"></div>
                  <h3 className="text-lg font-bold text-black animate-pulse">Scanning Indian Marketplaces...</h3>
                  <p className="text-sm text-gray-400 mt-2">Uploading to Cloudinary and querying Google Lens AI.</p>
                </div>
              ) : errorMsg ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center text-red-500 border-2 border-dashed border-red-100 rounded-2xl bg-red-50">
                  <p className="font-bold">{errorMsg}</p>
                  <p className="text-sm mt-2 text-red-400">Try a clearer image showing the clothing item.</p>
                </div>
              ) : !imagePreview ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
                  <p>Upload an image to see real AI matches here.</p>
                </div>
              ) : realResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center text-gray-500 border-2 border-dashed border-gray-100 rounded-2xl">
                  <p className="font-bold">No exact matches found on targeted platforms.</p>
                  <p className="text-sm mt-2">Lens couldn't find this item on Amazon, Flipkart, or Myntra.</p>
                </div>
              ) : (
                <div className="animate-in fade-in">
                  <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                    <h3 className="font-bold text-gray-800">Exact Live Matches Found</h3>
                    <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">{realResults.length} Items</span>
                  </div>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {realResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={result.image} alt={result.title} className="w-full h-full object-cover" />
                          </div>
                          
                          <div>
                            <p className="font-bold text-sm text-black line-clamp-1" title={result.title}>{result.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-[10px] font-black uppercase tracking-wider ${result.color}`}>
                                {result.platform}
                              </span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500 font-bold">{result.price}</span>
                            </div>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => handleCopy(result.link, index)}
                          className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all w-[100px] text-center shrink-0 ${
                            copiedIndex === index 
                              ? 'bg-black text-white border-black' 
                              : 'bg-white text-black border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          {copiedIndex === index ? 'Copied!' : 'Copy Link'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}