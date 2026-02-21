'use server';

import { cookies } from 'next/headers';

const ANIMALS = ['Tiger', 'Bear', 'Falcon', 'Wolf', 'Eagle', 'Shark', 'Panda'];

export interface VisitorData {
  points: number;
  name: string;
}

export async function getOrCreateVisitor(): Promise<VisitorData | null> {
  try {
    const cookieStore = await cookies();
    const visitorId = cookieStore.get('visitor_id')?.value;

    if (visitorId) {
      // In a real app with a database, you'd fetch the visitor here
      // For now, return a placeholder
      return {
        points: 0,
        name: `Guest-${ANIMALS[Math.floor(Math.random() * ANIMALS.length)]}`,
      };
    }

    // Create a new visitor
    const newId = crypto.randomUUID();
    const newVisitor: VisitorData = {
      points: 100,
      name: `Guest-${ANIMALS[Math.floor(Math.random() * ANIMALS.length)]}-${Math.floor(Math.random() * 100)}`,
    };

    cookieStore.set('visitor_id', newId, {
      secure: true,
      httpOnly: true,
      maxAge: 31536000, // 1 year
    });

    return newVisitor;
  } catch (error) {
    console.error('Error in getOrCreateVisitor:', error);
    return null;
  }
}

export async function trackAction(
  action: 'CLICK' | 'SHARE'
): Promise<(VisitorData & { added: number }) | null> {
  try {
    const visitor = await getOrCreateVisitor();

    if (!visitor) return null;

    const pointsToAdd = action === 'CLICK' ? 50 : 100;
    visitor.points += pointsToAdd;

    return {
      ...visitor,
      added: pointsToAdd,
    };
  } catch (error) {
    console.error('Error in trackAction:', error);
    return null;
  }
}
