"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password");

  // 👇 Change "menzstore2026" to whatever secret password you want!
  if (password === "menzstore2026") {
    const cookieStore = await cookies();
    
    // Give the browser a secure cookie that lasts for 30 days
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    
    // Refresh the admin page to show the dashboard
    revalidatePath("/admin");
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session"); // Destroy the cookie
  revalidatePath("/admin");
}