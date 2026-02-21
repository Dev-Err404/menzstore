import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Allows all Supabase project images
      },
    ],
    // Optimize images for performance
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Compress and optimize output
  compress: true,
  // Enable SWR (Stale-While-Revalidate) caching
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 1 minute
    pagesBufferLength: 5,
  },
};

export default nextConfig;