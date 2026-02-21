'use server';

import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload image to Cloudinary
async function uploadImage(imageFile: File) {
  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64Image = `data:${imageFile.type};base64,${buffer.toString('base64')}`;

  const uploadResponse = await cloudinary.uploader.upload(base64Image, {
    folder: "menzstore",
  });

  return uploadResponse.secure_url;
}

// --- OUTFIT (PRODUCT) ACTIONS ---

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const topAffiliate = formData.get("topAffiliate") as string;
  const bottomAffiliate = formData.get("bottomAffiliate") as string;
  const imageFile = formData.get("image") as File;

  if (!name || !categoryId || !imageFile || imageFile.size === 0) {
    throw new Error("Missing required fields or image is empty.");
  }

  const cleanImageUrl = await uploadImage(imageFile);
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  await prisma.product.create({
    data: {
      name,
      slug,
      description,
      categoryId,
      topAffiliate: topAffiliate || '',
      bottomAffiliate: bottomAffiliate || '',
      imageUrl: cleanImageUrl,
      views: 0,
    },
  });

  revalidatePath('/admin');
  redirect('/admin?tab=add&success=true');
}

// 👇 NEW: Update an existing product
export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const topAffiliate = formData.get("topAffiliate") as string;
  const bottomAffiliate = formData.get("bottomAffiliate") as string;
  const imageFile = formData.get("image") as File;

  if (!id || !name || !categoryId) {
    throw new Error("Missing required fields.");
  }

  const data: any = {
    name,
    description,
    categoryId,
    topAffiliate: topAffiliate || '',
    bottomAffiliate: bottomAffiliate || '',
  };

  // Only upload a new image if one was selected
  if (imageFile && imageFile.size > 0) {
    data.imageUrl = await uploadImage(imageFile);
  }

  // Update slug if name changed
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  data.slug = slug;

  await prisma.product.update({
    where: { id },
    data: data,
  });

  revalidatePath('/admin');
  // Redirect back to the outfits list after update
  redirect('/admin?tab=outfits&updated=true');
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  
  await prisma.product.delete({ where: { id } });
  
  revalidatePath('/admin');
  redirect('/admin?tab=outfits');
}

// --- CATEGORY ACTIONS ---

// 👇 UPDATED: Handle image upload for categories
export async function addCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const imageFile = formData.get("image") as File;

  if (!name || !imageFile || imageFile.size === 0) {
     throw new Error("Name and image are required.");
  }
  
  const cleanImageUrl = await uploadImage(imageFile);
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  await prisma.category.create({
    data: {
      name,
      slug,
      imageUrl: cleanImageUrl,
    }
  });
  
  revalidatePath('/admin');
  redirect('/admin?tab=categories');
}

// 👇 NEW: Update an existing category
export async function updateCategory(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const imageFile = formData.get("image") as File;

  if (!id || !name) {
    throw new Error("Missing required fields.");
  }

  const data: any = { name };

  // Only upload a new image if one was selected
  if (imageFile && imageFile.size > 0) {
    data.imageUrl = await uploadImage(imageFile);
  }

  // Update slug if name changed
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  data.slug = slug;

  await prisma.category.update({
    where: { id },
    data: data,
  });

  revalidatePath('/admin');
  redirect('/admin?tab=categories');
}

export async function deleteCategory(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  
  await prisma.category.delete({ where: { id } });
  
  revalidatePath('/admin');
  redirect('/admin?tab=categories');
}