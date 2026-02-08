"use server";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// --- CREATE ACTIONS ---

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const categoryId = formData.get("categoryId") as string;
  const topAffiliate = formData.get("topAffiliate") as string;
  const bottomAffiliate = formData.get("bottomAffiliate") as string;
  
  // 1. Get the file
  const imageFile = formData.get("imageFile") as File;
  
  if (!imageFile || imageFile.size === 0) {
    throw new Error("Product image is required");
  }

  // 2. Generate unique slug & filename
  const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const slug = `${baseSlug}-${Date.now()}`; 
  const filename = `${slug}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, "")}`;

  // 3. Upload to Supabase (Bucket: 'products')
  const { error } = await supabase.storage
    .from("products")
    .upload(filename, imageFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Product Upload Error:", error);
    throw new Error("Failed to upload product image");
  }

  // 4. Get Public URL
  const { data: { publicUrl } } = supabase.storage
    .from("products")
    .getPublicUrl(filename);

  // 5. Save to Database
  await prisma.product.create({
    data: {
      name,
      slug,
      imageUrl: publicUrl,
      topAffiliate,
      bottomAffiliate,
      categoryId,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const imageFile = formData.get("imageFile") as File;

  if (!name) throw new Error("Category name is required");
  if (!imageFile || imageFile.size === 0) throw new Error("Category image is required");

  // 1. Generate unique slug
  const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const filename = `cat-${baseSlug}-${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, "")}`;

  // 2. Upload to Supabase (Bucket: 'categories')
  const { error } = await supabase.storage
    .from("categories") 
    .upload(filename, imageFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Category Upload Error:", error);
    throw new Error("Failed to upload category image");
  }

  // 3. Get Public URL
  const { data: { publicUrl } } = supabase.storage
    .from("categories")
    .getPublicUrl(filename);

  // 4. Save to Database
  await prisma.category.create({
    data: {
      name,
      slug: baseSlug, 
      imageUrl: publicUrl,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/categories");
}

// --- DELETE ACTIONS ---

export async function deleteProduct(formData: FormData) {
  const productId = formData.get("id") as string;
  await prisma.product.delete({ where: { id: productId } });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteCategory(formData: FormData) {
  const categoryId = formData.get("id") as string;
  try {
    await prisma.category.delete({ where: { id: categoryId } });
    revalidatePath("/admin");
    revalidatePath("/categories");
  } catch (error) {
    console.error("Failed to delete category (likely has products linked)", error);
  }
}

// --- UPDATE ACTIONS ---

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const categoryId = formData.get("categoryId") as string;
  const topAffiliate = formData.get("topAffiliate") as string;
  const bottomAffiliate = formData.get("bottomAffiliate") as string;
  const imageFile = formData.get("imageFile") as File;

  const dataToUpdate: any = {
    name,
    categoryId,
    topAffiliate,
    bottomAffiliate,
  };

  // Only upload and update image if a NEW file is provided
  if (imageFile && imageFile.size > 0) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const filename = `${slug}-${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, "")}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(filename, imageFile, { cacheControl: "3600", upsert: false });

    if (error) throw new Error("Upload failed");

    const { data: { publicUrl } } = supabase.storage
      .from("products")
      .getPublicUrl(filename);

    dataToUpdate.imageUrl = publicUrl;
  }

  await prisma.product.update({
    where: { id },
    data: dataToUpdate,
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateCategory(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const imageFile = formData.get("imageFile") as File;

  const dataToUpdate: any = { name };

  if (imageFile && imageFile.size > 0) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const filename = `cat-${slug}-${Date.now()}`;

    const { error } = await supabase.storage
      .from("categories")
      .upload(filename, imageFile, { cacheControl: "3600", upsert: false });

    if (!error) {
      const { data: { publicUrl } } = supabase.storage
        .from("categories")
        .getPublicUrl(filename);
      dataToUpdate.imageUrl = publicUrl;
    }
  }

  await prisma.category.update({
    where: { id },
    data: dataToUpdate,
  });

  revalidatePath("/admin");
  revalidatePath("/categories");
}