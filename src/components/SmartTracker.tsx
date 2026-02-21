'use client';

import { useEffect } from "react";
import { trackProductView } from "@/app/actions/smart-engine";

export default function SmartTracker({ categoryId, price }: { categoryId: string, price: number }) {
  useEffect(() => {
    // Fire and forget - doesn't slow down the page
    trackProductView(categoryId, price);
  }, [categoryId, price]);

  return null; // Invisible
}