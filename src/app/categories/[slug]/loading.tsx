export default function Loading() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto">
      
      {/* 1. Header Skeleton */}
      <div className="mb-12 flex flex-col items-start justify-between gap-6">
        <div>
          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="h-12 w-64 md:w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Filter Button Skeleton */}
        <div className="w-[260px] h-[42px] bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      {/* 2. Product Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            {/* Image Placeholder */}
            <div className="aspect-[4/5] w-full bg-gray-200 rounded-2xl animate-pulse"></div>
            
            {/* Text Placeholder */}
            <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}