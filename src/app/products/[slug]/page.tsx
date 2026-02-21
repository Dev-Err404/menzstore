import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import ShareButtons from "@/components/ShareButtons"; // 👈 The new Social Share component

// Forces Next.js to fetch live data (Fixes the 404 caching bug)
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const product = await prisma.product.findUnique({
    where: { slug: decodedSlug },
    include: { category: true }
  });

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* 50/50 Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Left Side: White Background + Outfit Image */}
        <div className="bg-white flex items-center justify-center pt-32 pb-16 px-6 lg:px-16 w-full h-full">
          
          <div className="relative w-full max-w-[500px] aspect-[4/5] overflow-hidden rounded-3xl bg-white shadow-sm">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gray-100 text-gray-400">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Product Details & Shop Buttons */}
        <div className="flex flex-col justify-center px-6 pt-16 pb-24 lg:pt-32 lg:pb-32 lg:px-24 w-full h-full bg-white">
          <div className="w-full max-w-lg mx-auto lg:mx-0">

            {/* Top Info Bar (Season & Views) */}
            <div className="flex flex-wrap justify-between items-center border-b border-gray-200 pb-4 mb-8 gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                {product.category.name} COLLECTION
              </span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                {product.views} Views
              </span>
            </div>

            {/* Title & Description */}
            <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-black leading-none">
              {product.name}
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-12">
              {product.description || "Designed for the modern minimalist. Premium materials, effortless silhouette."}
            </p>

            {/* Shop The Look Section */}
            <div className="w-full">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-5">
                Shop the look
              </h3>

              <div className="flex flex-col gap-4">
                
                {/* Upper Wear Button with T-Shirt Icon */}
                {product.topAffiliate && (
                  <a
                    href={product.topAffiliate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 md:p-5 border border-gray-200 rounded-[20px] hover:border-gray-400 transition-all bg-white shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#8cd63b]">
                          <path d="M21.47 5.27L17.5 2H6.5L2.53 5.27a1.5 1.5 0 0 0-.44 1.94l1.24 2a1.5 1.5 0 0 0 2 .51L7 8.9V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8.9l1.67.82a1.5 1.5 0 0 0 2-.51l1.24-2a1.5 1.5 0 0 0-.44-1.94z"/>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-black text-[15px]">Upper Wear</span>
                        <span className="text-[13px] text-gray-400 font-medium mt-0.5">T-Shirt / Hoodie / Jacket</span>
                      </div>
                    </div>
                    <div className="text-gray-300 group-hover:text-black transition-colors mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                  </a>
                )}

                {/* Lower Wear Button with Pants Icon */}
                {product.bottomAffiliate && (
                  <a
                    href={product.bottomAffiliate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 md:p-5 border border-gray-200 rounded-[20px] hover:border-gray-400 transition-all bg-white shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#3b82f6]">
                          <path d="M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-8h-4v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-black text-[15px]">Lower Wear</span>
                        <span className="text-[13px] text-gray-400 font-medium mt-0.5">Pants / Shorts / Trousers</span>
                      </div>
                    </div>
                    <div className="text-gray-300 group-hover:text-black transition-colors mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                  </a>
                )}

              </div>
            </div>

            {/* 👈 NEW SOCIAL SHARE BUTTONS COMPONENT */}
            <ShareButtons title={product.name} imageUrl={product.imageUrl} />

          </div>
        </div>
      </div>
    </div>
  );
}