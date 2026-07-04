'use client';

import { use, useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { SlidersHorizontal, X, ChevronDown, Grid2X2, Grid3X3 } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { ALL_PRODUCTS, fadeRise, fadeRiseContainer } from '@/lib/constants';

const CATEGORY_META: Record<string, { title: string; subtitle: string; description: string; heroImage: string }> = {
  denim: {
    title: 'THE DENIM EDIT',
    subtitle: 'Raw indigo. Washed slate. Crafted for confidence.',
    description: 'Premium denim in every cut: slim, regular, relaxed, and straight. Jeans, jackets, and co-ords built to last.',
    heroImage: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1920',
  },
  ethnic: {
    title: 'ETHNIC WEAR',
    subtitle: 'Rooted in tradition. Worn with modern confidence.',
    description: 'Kurtas, sherwanis, and festive co-ords that honour India\'s textile heritage.',
    heroImage: 'https://images.pexels.com/photos/37921733/pexels-photo-37921733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1920',
  },
  tshirts: {
    title: 'TEES & SHIRTS',
    subtitle: 'Everyday. Smart. Yours.',
    description: 'Casual tees, formal shirts, and everything in between — for the man who\'s always ready.',
    heroImage: 'https://images.pexels.com/photos/30005113/pexels-photo-30005113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1920',
  },
  kids: {
    title: 'KIDS COLLECTION',
    subtitle: 'Premium quality, thoughtfully scaled.',
    description: 'Denim, ethnic wear, and everyday tees for the little ones who deserve the best.',
    heroImage: 'https://images.pexels.com/photos/29214428/pexels-photo-29214428.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1920',
  },
};

const DENIM_FITS = ['slim', 'regular', 'relaxed', 'straight'];
const SORT_OPTIONS = ['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Bestselling'];

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const reduced = useReducedMotion();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedFit, setSelectedFit] = useState<string[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [sortBy, setSortBy] = useState('Featured');
  const [gridCols, setGridCols] = useState<2 | 4>(4);
  const [gridKey, setGridKey] = useState(0);

  const meta = CATEGORY_META[category] || CATEGORY_META.denim;
  const categoryProducts = ALL_PRODUCTS.filter(p => p.category === category);

  const filtered = useMemo(() => {
    let result = categoryProducts.filter(p =>
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (selectedFit.length && category === 'denim') {
      result = result.filter(p => (p as any).fit && selectedFit.includes((p as any).fit));
    }
    if (selectedOccasion.length && category === 'ethnic') {
      result = result.filter(p => (p as any).occasion && selectedOccasion.includes((p as any).occasion));
    }
    if (sortBy === 'Price: Low to High') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'Price: High to Low') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'Bestselling') {
      const best = result.filter(p => p.badge === 'bestseller');
      const rest = result.filter(p => p.badge !== 'bestseller');
      result = [...best, ...rest];
    }
    return result;
  }, [category, categoryProducts, priceRange, selectedFit, selectedOccasion, sortBy]);

  const applyFilter = () => {
    setFiltersOpen(false);
    setGridKey(k => k + 1);
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* Category Hero */}
      <div className="relative h-64 lg:h-80 overflow-hidden">
        <Image
          src={meta.heroImage}
          alt={meta.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/85 to-[#111827]/40" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-10 px-6 max-w-7xl mx-auto">
          <motion.div
            variants={fadeRiseContainer()}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={fadeRise} className="overline-label text-gold mb-2" style={{ fontSize: '0.65rem' }}>
              {category === 'denim' ? 'Blue is the base.' : category === 'ethnic' ? 'Wear your heritage.' : category === 'kids' ? 'Style for the young.' : 'Everyday essentials.'}
            </motion.p>
            <motion.h1 variants={fadeRise} className="display-headline text-white" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              {meta.title}
            </motion.h1>
            <motion.p variants={fadeRise} className="text-white/60 text-sm mt-2 max-w-md">
              {meta.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-[104px] z-30 bg-white border-b border-[#111827]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-[#111827]/15 text-[#111827] hover:border-gold hover:text-gold transition-colors duration-200 rounded-sm text-xs font-semibold"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
            <span className="text-xs text-[#111827]/40">{filtered.length} products</span>

            {/* Active filter chips */}
            {selectedFit.map(f => (
              <button key={f} onClick={() => setSelectedFit(p => p.filter(x => x !== f))} className="flex items-center gap-1 px-3 py-1.5 bg-[#111827] text-gold text-xs rounded-sm">
                {f} <X size={10} />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border border-[#111827]/15 text-xs text-[#111827] rounded-sm outline-none focus:border-gold bg-white cursor-pointer"
              >
                {SORT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#111827]/40 pointer-events-none" />
            </div>

            <div className="flex border border-[#111827]/15 rounded-sm overflow-hidden">
              <button
                onClick={() => setGridCols(2)}
                className={`p-2 ${gridCols === 2 ? 'bg-[#111827] text-gold' : 'text-[#111827]/40 hover:text-[#111827]'}`}
              >
                <Grid2X2 size={14} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 ${gridCols === 4 ? 'bg-[#111827] text-gold' : 'text-[#111827]/40 hover:text-[#111827]'}`}
              >
                <Grid3X3 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={gridKey}
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`grid gap-4 sm:gap-6 ${
              gridCols === 2
                ? 'grid-cols-2'
                : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[#111827]/40 text-sm">No products match your filters.</p>
            <button
              onClick={() => { setSelectedFit([]); setSelectedOccasion([]); setPriceRange([0, 15000]); }}
              className="mt-4 text-gold text-sm hover:text-gold-light"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/30"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-80 bg-white shadow-2xl overflow-y-auto flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#111827]/8">
                <span className="font-bold text-sm uppercase tracking-wide">Filter</span>
                <button onClick={() => setFiltersOpen(false)}><X size={20} /></button>
              </div>

              <div className="flex-1 px-6 py-6 space-y-8">
                {/* Price range */}
                <div>
                  <h4 className="overline-label text-[0.65rem] text-gold mb-4">Price Range</h4>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                      className="w-full px-3 py-2 border border-[#111827]/15 rounded-sm text-xs outline-none focus:border-gold"
                      placeholder="Min"
                    />
                    <span className="text-[#111827]/30">—</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                      className="w-full px-3 py-2 border border-[#111827]/15 rounded-sm text-xs outline-none focus:border-gold"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Fit (Denim only) */}
                {category === 'denim' && (
                  <div>
                    <h4 className="overline-label text-[0.65rem] text-gold mb-4">Fit</h4>
                    <div className="space-y-2">
                      {DENIM_FITS.map(fit => (
                        <label key={fit} className="flex items-center gap-3 cursor-pointer group">
                          <div
                            onClick={() => setSelectedFit(prev =>
                              prev.includes(fit) ? prev.filter(f => f !== fit) : [...prev, fit]
                            )}
                            className={`w-4 h-4 border rounded-sm flex items-center justify-center cursor-pointer transition-colors ${
                              selectedFit.includes(fit) ? 'bg-[#111827] border-[#111827]' : 'border-[#111827]/25 group-hover:border-gold'
                            }`}
                          >
                            {selectedFit.includes(fit) && <span className="text-gold text-[8px]">✓</span>}
                          </div>
                          <span className="text-sm capitalize text-[#111827]">{fit}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Occasion (Ethnic only) */}
                {category === 'ethnic' && (
                  <div>
                    <h4 className="overline-label text-[0.65rem] text-gold mb-4">Occasion</h4>
                    <div className="space-y-2">
                      {['festive', 'wedding', 'everyday'].map(occ => (
                        <label key={occ} className="flex items-center gap-3 cursor-pointer group">
                          <div
                            onClick={() => setSelectedOccasion(prev =>
                              prev.includes(occ) ? prev.filter(o => o !== occ) : [...prev, occ]
                            )}
                            className={`w-4 h-4 border rounded-sm flex items-center justify-center cursor-pointer transition-colors ${
                              selectedOccasion.includes(occ) ? 'bg-[#111827] border-[#111827]' : 'border-[#111827]/25 group-hover:border-gold'
                            }`}
                          >
                            {selectedOccasion.includes(occ) && <span className="text-gold text-[8px]">✓</span>}
                          </div>
                          <span className="text-sm capitalize text-[#111827]">{occ}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-5 border-t border-[#111827]/8 flex gap-3">
                <button
                  onClick={() => { setSelectedFit([]); setSelectedOccasion([]); setPriceRange([0, 15000]); }}
                  className="flex-1 py-3 border border-[#111827]/20 text-[#111827] text-xs overline-label rounded-sm hover:border-gold hover:text-gold transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={applyFilter}
                  className="flex-1 py-3 bg-[#111827] text-gold text-xs overline-label rounded-sm hover:bg-gold hover:text-[#111827] transition-colors"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
