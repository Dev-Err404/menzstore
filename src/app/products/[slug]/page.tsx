import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SmartTracker from "@/components/SmartTracker"; // 👈 New
import RecommendedSection from "@/components/RecommendedSection"; // 👈 New

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true }
  });

  if (!product) return notFound();

  // Note: We removed the "Similar Products" manual query because 
  // RecommendedSection now handles the smart logic dynamically.

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* 1. Activate the AI Tracker */}
      <SmartTracker categoryId={product.categoryId} price={product.price} />

      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/categories/${product.category.slug}`} className="hover:text-black transition-colors">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-black font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-10">
        
        {/* Left: Product Image */}
        <div className="relative aspect-[4/5] w-full bg-gray-100 rounded-3xl overflow-hidden shadow-sm">
          {product.imageUrl ? (
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority 
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-300 font-medium">
              No Image Available
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-center">
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary uppercase leading-tight mb-6">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-bold text-black tracking-tight">
              ${product.price}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">
              In Stock
            </span>
          </div>

          <div className="prose prose-lg text-secondary mb-10 leading-relaxed">
            <p>
              {product.description || "Elevate your wardrobe with this essential piece."}
            </p>
          </div>

          <div className="flex flex-col gap-4 max-w-md">
            <a 
              href={product.affiliateLink || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative w-full bg-black text-white text-lg font-bold py-4 rounded-full flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <span>Buy Now</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <p className="text-center text-xs text-gray-400">
              Secure checkout via partner store.
            </p>
          </div>
        </div>
      </div>

      {/* 2. The Smart Recommendation Engine */}
      {/* This replaces the old "Similar Products" with personalized data */}
      <RecommendedSection currentProductId={product.id} />

    </div>
  );
}