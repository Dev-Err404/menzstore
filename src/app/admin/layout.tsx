import { cookies } from "next/headers";
import { loginAdmin, logoutAdmin } from "@/app/actions/admin-auth";
import Link from "next/link";
import { LayoutDashboard, Calculator, Search, LogOut } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_session")?.value === "authenticated";

  if (!isAuthenticated) {
    // ... keep your existing login form code here ...
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">...</div>;
  }

  return (
    <div className="relative min-h-screen bg-[#fafafa]">
      
      {/* Responsive Bottom Navigation Bar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-fit">
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