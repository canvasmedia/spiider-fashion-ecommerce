'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Search, Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import { NAV_ITEMS, WHATSAPP_NUMBER } from '@/lib/constants';

const RETAIL_WA = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I want to order from Spiider. Please help me explore your catalog and place an order.')}`;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const reduced = useReducedMotion();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const navVariants = {
    transparent: { backgroundColor: 'rgba(255,255,255,0)', boxShadow: 'none' },
    solid: { backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0 1px 24px rgba(17,24,39,0.08)' },
  };

  const megaVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : -8 },
    show: {
      opacity: 1, y: 0,
      transition: { duration: 0.22, ease: 'easeOut' as const }
    },
    exit: { opacity: 0, y: reduced ? 0 : -4, transition: { duration: 0.15 } }
  };

  return (
    <>
      <motion.header
        className="fixed top-8 left-0 right-0 z-40 w-full"
        style={{ backdropFilter: scrolled ? 'blur(20px)' : 'none' }}
        variants={navVariants}
        animate={scrolled ? 'solid' : 'transparent'}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <motion.div
                animate={{ scale: scrolled ? 0.9 : 1 }}
                transition={{ duration: 0.3 }}
                className="relative flex items-center"
              >
                <Image
                  src="/logo.webp"
                  alt="Spiider"
                  width={150}
                  height={48}
                  className="object-contain h-10 w-auto"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8" onMouseLeave={() => setActiveMenu(null)}>
              {NAV_ITEMS.map(item => (
                <div key={item.label} className="relative">
                  {'mega' in item ? (
                    <button
                      className="flex items-center gap-1 overline-label text-[0.7rem] text-[#111827] hover:text-gold transition-colors duration-200 py-2"
                      onMouseEnter={() => setActiveMenu(item.label)}
                      onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown size={12} className={`transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`overline-label text-[0.7rem] hover:text-gold transition-colors duration-200 py-2 gold-underline ${
                        item.label === 'Sale' ? 'text-[#B3261E]' : 'text-[#111827]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}

                  {'mega' in item && (
                    <AnimatePresence>
                      {activeMenu === item.label && (
                        <motion.div
                          variants={megaVariants}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-[#111827]/8 shadow-xl rounded-sm min-w-[180px] py-4 px-1"
                        >
                          {item.mega.map((sub, idx) => (
                            <motion.div
                              key={sub.label}
                              initial={{ opacity: 0, x: reduced ? 0 : -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.04, duration: 0.2 }}
                            >
                              <Link
                                href={sub.href}
                                className="block px-5 py-2.5 text-sm text-[#111827] hover:text-gold hover:bg-[#F7F6F3] transition-colors duration-150 rounded-sm gold-underline"
                                onClick={() => setActiveMenu(null)}
                              >
                                {sub.label}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 text-[#111827] hover:text-gold transition-colors duration-200"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link href="/account" className="p-1.5 text-[#111827] hover:text-gold transition-colors duration-200 hidden sm:block" aria-label="Account">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </Link>

              {/* WhatsApp Order CTA */}
              <a
                href={RETAIL_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#111827] text-gold hover:bg-gold hover:text-[#111827] transition-all duration-200 rounded-sm overline-label text-[0.65rem] shadow-sm"
              >
                <MessageCircle size={15} className="text-green-400 group-hover:text-[#111827]" />
                <span className="hidden sm:inline">Order via WhatsApp</span>
                <span className="sm:hidden">Order</span>
              </a>

              <button
                className="lg:hidden p-1.5 text-[#111827]"
                onClick={() => setMobileOpen(true)}
                aria-label="Menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex items-start justify-center pt-32 px-4"
          >
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-6 right-6 p-2 text-[#111827] hover:text-gold"
            >
              <X size={24} />
            </button>
            <div className="w-full max-w-2xl">
              <div className="border-b-2 border-[#111827] pb-2 flex items-center gap-3">
                <Search size={22} className="text-[#111827]/40 flex-shrink-0" />
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search denim, ethnic wear, tees..."
                  className="flex-1 text-xl font-light text-[#111827] bg-transparent outline-none placeholder:text-[#111827]/30"
                />
              </div>
              {searchQuery && (
                <div className="mt-6 space-y-1">
                  {['Slim Fit Jeans', 'Festive Kurta', 'White Tee', 'Kids Denim']
                    .filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(r => (
                      <button
                        key={r}
                        className="block w-full text-left px-2 py-3 text-[#111827] hover:text-gold hover:bg-[#F7F6F3] transition-colors rounded-sm"
                        onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                      >
                        {r}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-80 bg-white overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#111827]/8">
                <Image
                  src="/logo.webp"
                  alt="Spiider"
                  width={120}
                  height={38}
                  className="object-contain h-8 w-auto"
                />
                <button onClick={() => setMobileOpen(false)}>
                  <X size={22} />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {NAV_ITEMS.map(item => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      className="block py-3 px-3 font-semibold text-[#111827] hover:text-gold transition-colors border-b border-[#111827]/5"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {'mega' in item && (
                      <div className="pl-4 pb-2">
                        {item.mega.map(sub => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="block py-2 px-3 text-sm text-[#111827]/70 hover:text-gold transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
