import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Disclosure */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-heading font-bold text-xl tracking-tight text-primary mb-6 block">
              MENZ<span className="text-secondary font-light">STORE</span>
            </Link>
            <p className="text-secondary leading-relaxed mb-6 max-w-sm">
              Curating the finest minimalist fashion for the modern creator. We help you look your best, effortlessly.
            </p>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong>Affiliate Disclosure:</strong> MENZSTORE is a participant in various affiliate programs. 
                We may earn a commission on purchases made through our links at no extra cost to you.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-primary mb-6">Explore</h4>
            <ul className="space-y-4 text-secondary">
              <li><Link href="/categories" className="hover:text-primary transition-colors">Collections</Link></li>
              <li><Link href="/search" className="hover:text-primary transition-colors">Search</Link></li>
              {/* REMOVED ADMIN LINK FROM HERE */}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-primary mb-6">Legal</h4>
            <ul className="space-y-4 text-secondary">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {currentYear} MENZSTORE. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Instagram</a>
            <a href="#" className="hover:text-primary">Twitter</a>
            <a href="#" className="hover:text-primary">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}