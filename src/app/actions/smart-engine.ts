'use server';

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

type UserInterest = {
  categoryId: string;
};

export async function trackProductView(categoryId: string) {
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

  history.unshift({ categoryId });
  if (history.length > 10) history.pop();

  cookieStore.set('user_affinity', JSON.stringify(history), { 
    maxAge: 2592000, 
    httpOnly: true 
  });
}

export async function getSmartRecommendations(currentProductId?: string) {
  const cookieStore = await cookies();
  const historyCookie = cookieStore.get('user_affinity');

  if (!historyCookie) return [];

  let history: UserInterest[] = [];
  try {
    history = JSON.parse(historyCookie.value);
  } catch (e) {
    return [];
  }

  if (history.length === 0) return [];

  // Find Favorite Category
  const categoryCounts: Record<string, number> = {};
  history.forEach(item => {
    categoryCounts[item.categoryId] = (categoryCounts[item.categoryId] || 0) + 1;
  });

  const topCategory = Object.keys(categoryCounts).reduce((a, b) => 
    categoryCounts[a] > categoryCounts[b] ? a : b
  );

  // Filter only by category, NO price logic here
  return await prisma.product.findMany({
    where: {
      categoryId: topCategory,
      id: { not: currentProductId }
    },
    take: 4,
    orderBy: { views: 'desc' }
  });
}