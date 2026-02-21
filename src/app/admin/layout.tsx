import { cookies } from "next/headers";
import { loginAdmin, logoutAdmin } from "@/app/actions/admin-auth";
import Link from "next/link"; // 👈 Added Link import

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_session")?.value === "authenticated";

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-black uppercase tracking-tight text-primary">Admin Access</h1>
            <p className="text-gray-500 mt-2 text-sm">Authorized personnel only.</p>
          </div>

          <form action={loginAdmin} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-bold text-primary mb-2">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                placeholder="Enter your secret password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      
      {/* ----------------- UPDATED: Floating Admin Menu ----------------- */}
      <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3">
        
        {/* Navigation Tabs */}
        <div className="bg-white p-1.5 rounded-full shadow-2xl border border-gray-200 flex items-center">
          <Link 
            href="/admin" 
            className="px-4 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-black hover:bg-gray-100 transition-all"
          >
            Dashboard
          </Link>
          <Link 
            href="/admin/calculator" 
            className="px-4 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-black hover:bg-gray-100 transition-all"
          >
            Calculator
          </Link>

          <Link href="/admin/visual-finder" className="px-4 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-black hover:bg-gray-100 transition-all">
            Visual Finder
          </Link>
          
        </div>

        {/* Logout Button */}
        <form action={logoutAdmin}>
          <button 
            type="submit" 
            className="bg-black text-white px-5 py-3 rounded-full shadow-2xl text-sm font-bold hover:bg-gray-800 hover:scale-105 transition-all flex items-center gap-2 border border-white/10"
          >
            Log Out ✕
          </button>
        </form>

      </div>
      {/* --------------------------------------------------------------- */}

      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
}