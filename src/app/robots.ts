import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://menzstore.com'; // Replace with your actual deployed domain later

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Hide admin from Google
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}