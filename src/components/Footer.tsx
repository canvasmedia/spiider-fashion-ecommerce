import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const FOOTER_LINKS = {
  'Shop': [
    { label: 'Denim', href: '/category/denim' },
    { label: 'Ethnic Wear', href: '/category/ethnic' },
    { label: 'Tees & Shirts', href: '/category/tshirts' },
    { label: 'Kids', href: '/category/kids' },
    { label: 'New Arrivals', href: '/new-arrivals' },
    { label: 'Sale', href: '/sale' },
  ],
  'Help': [
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Shipping & Delivery', href: '/shipping' },
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'Track Order', href: '/track' },
    { label: 'FAQs', href: '/faqs' },
  ],
  'Company': [
    { label: 'About Spiider', href: '/about' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Contact Us', href: '/contact' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Image src="/logo.webp" alt="Spiider" width={150} height={48} className="object-contain h-10 w-auto opacity-95" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              A modern Indian fashion brand built on craft, confidence, and contemporary design. One identity across denim, ethnic wear, tees, and kids.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[
                { label: 'Instagram', symbol: 'IG' },
                { label: 'Twitter/X', symbol: 'TW' },
                { label: 'YouTube', symbol: 'YT' },
                { label: 'Facebook', symbol: 'FB' },
              ].map(({ label, symbol }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="p-2 text-white/40 hover:text-gold transition-colors duration-200 border border-white/10 hover:border-gold/40 rounded-sm text-[10px] font-bold"
                >
                  {symbol}
                </a>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-xs text-white/30 mb-1">Customer Support</p>
              <a href="mailto:care@spiider.in" className="text-sm text-gold hover:text-gold-light transition-colors">
                care@spiider.in
              </a>
              <p className="text-xs text-white/30 mt-2">Mon–Sat, 10am–7pm IST</p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="overline-label text-[0.65rem] text-gold mb-5">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200 gold-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Spiider Fashion Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white/60 transition-colors">Cookie Policy</Link>
          </div>
          {/* Payment icons */}
          <div className="flex items-center gap-2 text-white/20">
            <div className="px-2 py-1 border border-white/10 rounded text-[9px] font-bold">VISA</div>
            <div className="px-2 py-1 border border-white/10 rounded text-[9px] font-bold">MC</div>
            <div className="px-2 py-1 border border-white/10 rounded text-[9px] font-bold">UPI</div>
            <div className="px-2 py-1 border border-white/10 rounded text-[9px] font-bold">BNPL</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
