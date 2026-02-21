'use server';

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

type UserInterest = {
  categoryId: string;
  price: number;
};

// 1. TRACKING: Save user behavior silently
export async function trackProductView(categoryId: string, price: number) {
  const cookieStore = await cookies();
  const historyCookie = cookieStore.get('user_affinity');
  
  let history: UserInterest[] = [];
  
  if (historyCookie) {
    try {
      history = JSON.parse(historyCookie.value);
    } catch (e) {
      history = [];
    }
  }

  // Add new interaction to the top
  history.unshift({ categoryId, price });

  // Keep only last 10 interactions (Lightweight)
  if (history.length > 10) history.pop();

  // Save back to cookie (Valid for 30 days)
  cookieStore.set('user_affinity', JSON.stringify(history), { 
    maxAge: 2592000, 
    httpOnly: true 
  });
}

// 2. RECOMMENDATION: Get smart products based on history
export async function getSmartRecommendations(currentProductId?: string) {
  const cookieStore = await cookies();
  const historyCookie = cookieStore.get('user_affinity');

  if (!historyCookie) return []; // No history yet

  let history: UserInterest[] = [];
  try {
    history = JSON.parse(historyCookie.value);
  } catch (e) {
    return [];
  }

  if (history.length === 0) return [];

  // A. Find "Favorite Category" (Most frequent)
  const categoryCounts: Record<string, number> = {};
  let totalPrice = 0;

  history.forEach(item => {
    categoryCounts[item.categoryId] = (categoryCounts[item.categoryId] || 0) + 1;
    totalPrice += item.price;
  });

  const topCategory = Object.keys(categoryCounts).reduce((a, b) => 
    categoryCounts[a] > categoryCounts[b] ? a : b
  );

  // B. Calculate "Spending Power" (Average Price)
  const avgPrice = totalPrice / history.length;

  // C. Query Database (Smart Filter)
  const recommendations = await prisma.product.findMany({
    where: {
      categoryId: topCategory, // Match their favorite style
      id: { not: currentProductId }, // Don't show what they are looking at
      price: {
        gte: avgPrice * 0.6, // Price range: -40% to +40% of their avg
        lte: avgPrice * 1.4
      }
    },
    take: 4,
    orderBy: { views: 'desc' } // Show popular items in that range
  });

  // Fallback: If strict price filter returns nothing, just get category items
  if (recommendations.length === 0) {
    return await prisma.product.findMany({
      where: { categoryId: topCategory, id: { not: currentProductId } },
      take: 4,
      orderBy: { views: 'desc' }
    });
  }

  return recommendations;
}