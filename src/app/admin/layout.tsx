import { cookies } from "next/headers";
import { loginAdmin, logoutAdmin } from "@/app/actions/admin-auth";
import Link from "next/link";
import { LayoutDashboard, Calculator, Search, LogOut } from "lucide-react";

export default async function AdminLayout({ children, searchParams }: { children: React.ReactNode, searchParams?: any }) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_session")?.value === "authenticated";

  // 👇 FIX: The Beautiful Login Screen (No more "...")
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full max-w-md text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          
          <h1 className="text-3xl font-black tracking-tight text-black mb-2">Admin Access</h1>
          <p className="text-gray-500 text-sm mb-8">Enter your secure password to manage MENZSTORE.</p>
          
          <form action={loginAdmin} className="space-y-4">
            <input 
              type="password" 
              name="password" 
              placeholder="Enter password..." 
              required
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm font-medium bg-[#fafafa] transition-all text-center tracking-widest"
            />
            <button 
              type="submit" 
              className="w-full bg-black text-white px-8 py-4 rounded-2xl text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/10"
            >
              Secure Login
            </button>
          </form>
          
        </div>
      </div>
    );
  }

  // 👇 If logged in, show your normal admin layout and navigation
  return (
    <div className="relative min-h-screen bg-[#fafafa]">
      
      {/* Responsive Bottom Navigation Bar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[50] w-[90%] max-w-fit">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 p-2 rounded-3xl shadow-2xl flex items-center gap-1 md:gap-2">
          
          <Link href="/admin" className="flex items-center gap-2 p-3 md:px-4 md:py-2 rounded-2xl text-gray-500 hover:text-black hover:bg-gray-100 transition-all group">
            <LayoutDashboard size={20} />
            <span className="hidden md:inline font-bold text-sm">Dashboard</span>
          </Link>

          <Link href="/admin/calculator" className="flex items-center gap-2 p-3 md:px-4 md:py-2 rounded-2xl text-gray-500 hover:text-black hover:bg-gray-100 transition-all group">
            <Calculator size={20} />
            <span className="hidden md:inline font-bold text-sm">Calculator</span>
          </Link>

          <Link href="/admin/visual-finder" className="flex items-center gap-2 p-3 md:px-4 md:py-2 rounded-2xl text-gray-500 hover:text-black hover:bg-gray-100 transition-all group">
            <Search size={20} />
            <span className="hidden md:inline font-bold text-sm">Visual Finder</span>
          </Link>

          <div className="w-[1px] h-6 bg-gray-200 mx-1" />

          {/* Actual Logout Trigger */}
          <form action={logoutAdmin}>
            <button type="submit" className="flex items-center gap-2 p-3 md:px-4 md:py-2 rounded-2xl text-red-500 hover:bg-red-50 transition-all">
              <LogOut size={20} />
              <span className="hidden md:inline font-bold text-sm">Logout</span>
            </button>
          </form>
          
        </div>
      </nav>

      <main className="pb-32">
        {children}
      </main>
    </div>
  );
}