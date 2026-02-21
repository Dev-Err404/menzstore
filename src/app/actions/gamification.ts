'use server';

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

const ANIMALS = ['Tiger', 'Bear', 'Falcon', 'Wolf', 'Eagle', 'Shark', 'Panda'];

export async function getOrCreateVisitor() {
  const cookieStore = await cookies();
  const visitorId = cookieStore.get('visitor_id')?.value;

  if (visitorId) {
    const existing = await prisma.visitor.findUnique({ where: { cookieId: visitorId } });
    if (existing) return existing;
  }

  const newId = crypto.randomUUID();
  // Create new visitor
  try {
    const newVisitor = await prisma.visitor.create({
      data: {
        cookieId: newId,
        name: `Guest-${ANIMALS[Math.floor(Math.random() * ANIMALS.length)]}-${Math.floor(Math.random() * 100)}`,
        points: 100, // Welcome Bonus
      }
    });
    cookieStore.set('visitor_id', newId, { secure: true, httpOnly: true, maxAge: 31536000 });
    return newVisitor;
  } catch (e) {
    // Fallback if table doesn't exist yet (prevents crash)
    return { name: 'Guest', points: 0, badges: [] };
  }
}

export async function trackAction(action: 'CLICK' | 'SHARE') {
  const visitor = await getOrCreateVisitor();
  if (!visitor || !visitor.id) return null; // Safety check

  let pointsToAdd = action === 'CLICK' ? 50 : 100;
  
  await prisma.visitor.update({
    where: { id: visitor.id },
    data: {
      points: { increment: pointsToAdd },
      clicks: { increment: 1 }
    }
  });

  return { points: visitor.points + pointsToAdd, added: pointsToAdd };
}