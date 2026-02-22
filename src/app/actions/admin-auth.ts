'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData: FormData) {
  const password = formData.get('password');
  
  // We check against your environment variable, or use 'admin123' as a backup
  const correctPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password === correctPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // Stays logged in for 1 week
      path: '/',
    });
    redirect('/admin');
  } else {
    // If wrong password, reload with an error
    redirect('/admin?error=Invalid Password');
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  // Redirect back to the admin page (which will now show the login form)
  redirect('/admin'); 
}