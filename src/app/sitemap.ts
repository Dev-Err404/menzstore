import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://menzstore.com'; // Replace with your actual deployed domain later

  // 1. Get all products
  const products = await prisma.product.findMany({
    select: { slug: true, updatedAt: true },
  });

  // 2. Get all categories
  const categories = await prisma.category.findMany({
    select: { slug: true },
  });

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
  }));

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/categories`, lastModified: new Date() },
    ...productUrls,
    ...categoryUrls,
  ];
}