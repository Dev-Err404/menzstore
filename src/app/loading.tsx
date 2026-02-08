export default function Loading() {
  return (
    <div className="min-h-screen pt-32 px-6 max-w-[1600px] mx-auto animate-pulse">
      
      {/* Header Skeleton */}
      <div className="h-12 w-2/3 bg-gray-100 rounded-xl mb-8"></div>
      
      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="aspect-[3/4] bg-gray-100 rounded-2xl w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}