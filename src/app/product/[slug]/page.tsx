'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Star, ChevronRight, Truck, RotateCcw, Shield, Plus, Minus, X, MessageCircle, AlertCircle } from 'lucide-react';
import { PRODUCTS_BY_SLUG, ALL_PRODUCTS, buildWhatsAppUrl } from '@/lib/constants';
import { ProductCard } from '@/components/ProductCard';

const MOCK_REVIEWS = [
  { id: 1, author: 'Rohan V.', rating: 5, title: 'Perfect fit, premium feel', body: 'This product exceeded my expectations. The fabric is thick and high quality, and the fit is exactly as described — perfect silhouette.', verified: true, date: '2 weeks ago' },
  { id: 2, author: 'Aditya K.', rating: 5, title: 'Best quality I own', body: 'Wore this to an event and got so many compliments. The colour is deep and rich. Very happy with the purchase.', verified: true, date: '1 month ago' },
  { id: 3, author: 'Siddharth M.', rating: 4, title: 'Great finish', body: 'Really well made piece. Sizing runs true. Highly recommend ordering via WhatsApp, delivery was super smooth.', verified: true, date: '2 months ago' },
];

const SIZE_GUIDE = [
  { size: '28 / S', waist: '28"', chest: '38"', length: '28"' },
  { size: '30 / M', waist: '30"', chest: '40"', length: '29"' },
  { size: '32 / L', waist: '32"', chest: '42"', length: '30"' },
  { size: '34 / XL', waist: '34"', chest: '44"', length: '31"' },
  { size: '36 / XXL', waist: '36"', chest: '46"', length: '32"' },
  { size: '38', waist: '38"', chest: '48"', length: '33"' },
];

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const reduced = useReducedMotion();
  const product = PRODUCTS_BY_SLUG[slug] || ALL_PRODUCTS[0];

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [qty, setQty] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  const handleOrderWhatsApp = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2500);
      return;
    }
    const url = buildWhatsAppUrl(product.name, selectedSize, qty);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const relatedProducts = ALL_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  if (relatedProducts.length < 4) {
    const others = ALL_PRODUCTS.filter(p => p.id !== product.id && !relatedProducts.includes(p)).slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...others);
  }

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-[#111827]/40">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href={`/category/${product.category}`} className="hover:text-gold transition-colors capitalize">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-[#111827] font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </nav>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left Gallery (Flipkart Style: Vertical strip on desktop + Large main viewer) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 sm:w-20 flex-shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-16 sm:w-full aspect-[3/4] rounded-sm overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                    activeImage === i ? 'border-gold shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative aspect-[3/4] rounded-sm overflow-hidden bg-[#F7F6F3] border border-[#111827]/8 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={reduced ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[activeImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#111827] text-gold overline-label text-[0.65rem] rounded-sm shadow-md">
                  {product.badge === 'bestseller' ? 'Bestseller' : product.badge === 'new' ? 'New Arrival' : product.badge.toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Right Product Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="overline-label text-[#1E3A8A] mb-1" style={{ fontSize: '0.65rem' }}>
                {product.category.toUpperCase()} · {product.subcategory || 'PREMIUM COLLECTION'}
              </p>
              <h1 className="font-black text-2xl sm:text-3xl lg:text-4xl text-[#111827] leading-tight tracking-wide uppercase">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-green-700 text-white px-2 py-0.5 rounded text-xs font-bold">
                <span>{product.rating}</span>
                <Star size={12} className="fill-white text-white" />
              </div>
              <span className="text-sm text-[#111827]/60 font-medium">({product.reviewCount} verified reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-6 border-b border-[#111827]/8">
              <span className="font-black text-3xl price text-[#111827]">&#8377;{product.price.toLocaleString('en-IN')}</span>
              {product.mrp && (
                <>
                  <span className="text-base text-[#111827]/40 line-through price">&#8377;{product.mrp.toLocaleString('en-IN')}</span>
                  <span className="px-2.5 py-1 bg-[#B3261E]/10 text-[#B3261E] text-xs font-bold rounded-sm">
                    {discount}% off
                  </span>
                </>
              )}
            </div>

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-sm text-[#111827]">
                  Select Size <span className="text-red-500">*</span>
                </span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs text-gold hover:text-goldDark transition-colors gold-underline font-medium"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`min-w-[48px] px-4 py-2.5 border text-sm font-bold rounded-sm transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-[#111827] text-gold border-[#111827] shadow-md scale-105'
                        : 'border-[#111827]/20 text-[#111827] hover:border-gold hover:text-gold bg-[#F7F6F3]/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 mt-2 text-xs text-[#B3261E] font-semibold"
                >
                  <AlertCircle size={14} />
                  Please select a size before ordering!
                </motion.div>
              )}
              {product.fit && (
                <p className="mt-2.5 text-xs text-[#111827]/60">ⓘ <span className="font-medium">Fit Tip:</span> {product.fit}</p>
              )}
            </div>

            {/* Qty */}
            <div className="flex items-center gap-4 py-2">
              <span className="text-sm font-semibold text-[#111827]">Quantity</span>
              <div className="flex items-center border border-[#111827]/20 rounded-sm bg-[#F7F6F3]/50">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-2.5 hover:text-gold transition-colors">
                  <Minus size={14} />
                </button>
                <span className="px-5 text-sm font-bold">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="p-2.5 hover:text-gold transition-colors">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* WhatsApp Order CTA (No Cart!) */}
            <div className="pt-2">
              <button
                onClick={handleOrderWhatsApp}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#1E3A8A] to-[#111827] text-white hover:from-gold hover:to-[#E8C766] hover:text-[#111827] font-black overline-label text-sm sm:text-base rounded-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group"
              >
                <MessageCircle size={20} className="text-green-400 group-hover:text-[#111827] transition-colors" />
                Order via WhatsApp
                <ChevronRight size={18} className="ml-auto opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[0.68rem] text-center text-[#111827]/50 mt-2">
                ⚡ Direct instant ordering. No login or cart checkout required.
              </p>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-3 py-5 border-y border-[#111827]/8 bg-[#F7F6F3]/40 rounded-sm px-2">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'On all orders' },
                { icon: RotateCcw, label: '15-Day Returns', sub: 'Easy & hassle-free' },
                { icon: Shield, label: 'Secure Support', sub: 'Personal assistance' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1">
                  <Icon size={18} className="text-gold" />
                  <span className="text-xs font-bold text-[#111827]">{label}</span>
                  <span className="text-[0.6rem] text-[#111827]/50">{sub}</span>
                </div>
              ))}
            </div>

            {/* Product details */}
            <div className="space-y-4 pt-2">
              <div>
                <h3 className="font-bold text-sm text-[#111827] mb-1 uppercase tracking-wider">Description</h3>
                <p className="text-sm text-[#111827]/70 leading-relaxed font-light">{product.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#111827]/70 bg-[#F7F6F3] p-3.5 rounded-sm border border-[#111827]/5">
                <div>
                  <span className="font-bold text-[#111827] block mb-0.5">Fabric:</span>
                  {product.fabric}
                </div>
                <div>
                  <span className="font-bold text-[#111827] block mb-0.5">Care:</span>
                  {product.care}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-20 pt-12 border-t border-[#111827]/10">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="overline-label text-gold mb-1">Reviews</p>
              <h2 className="font-black text-2xl uppercase tracking-wide">Customer Feedback</h2>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-gold text-gold" />
                  ))}
                </div>
                <span className="font-black text-xl price">{product.rating}</span>
              </div>
              <p className="text-xs text-[#111827]/40 mt-1">Based on {product.reviewCount} verified reviews</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_REVIEWS.map(review => (
              <motion.div
                key={review.id}
                initial={reduced ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-6 border border-[#111827]/10 rounded-sm bg-[#F7F6F3]/30 shadow-sm"
              >
                <div className="flex gap-0.5 mb-2.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className={i < review.rating ? 'fill-gold text-gold' : 'text-[#111827]/20'} />
                  ))}
                </div>
                <p className="font-bold text-sm mb-2 text-[#111827]">{review.title}</p>
                <p className="text-xs text-[#111827]/60 leading-relaxed mb-4">{review.body}</p>
                <div className="flex items-center gap-2 pt-3 border-t border-[#111827]/8">
                  <span className="font-bold text-xs text-[#111827]">{review.author}</span>
                  {review.verified && <span className="text-[0.6rem] bg-green-100 text-green-800 px-1.5 py-0.5 rounded font-semibold">✓ Verified Buyer</span>}
                  <span className="text-[0.6rem] text-[#111827]/40 ml-auto">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Related products */}
        <div className="mt-20 pt-12 border-t border-[#111827]/10">
          <div className="mb-8">
            <p className="overline-label text-gold mb-1">You May Also Like</p>
            <h2 className="font-black text-2xl uppercase tracking-wide">Complete the Look</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {sizeGuideOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
              onClick={() => setSizeGuideOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 bg-white rounded-sm shadow-2xl max-w-lg mx-auto overflow-auto max-h-[85vh] border border-[#111827]/10"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#111827]/10 bg-[#F7F6F3]">
                <div>
                  <p className="overline-label text-gold text-[0.6rem] mb-0.5">{product.category}</p>
                  <h3 className="font-black text-lg uppercase tracking-wide">Size Guide</h3>
                </div>
                <button onClick={() => setSizeGuideOpen(false)} className="p-1 hover:text-gold"><X size={20} /></button>
              </div>
              <div className="p-6">
                <p className="text-xs text-[#111827]/60 mb-4 leading-relaxed">
                  Measurements in inches. For the best fit, measure your natural waist or chest. If you are between sizes, we recommend sizing up for a relaxed fit.
                </p>
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#111827]/10 bg-[#F7F6F3]">
                      <th className="text-left py-2.5 px-3 font-bold text-[#111827]">Size</th>
                      <th className="text-left py-2.5 px-3 font-bold text-[#111827]">Waist</th>
                      <th className="text-left py-2.5 px-3 font-bold text-[#111827]">Chest</th>
                      <th className="text-left py-2.5 px-3 font-bold text-[#111827]">Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_GUIDE.map((row, i) => (
                      <tr key={row.size} className={`border-b border-[#111827]/5 ${selectedSize === row.size ? 'bg-gold/15 font-bold' : i % 2 === 0 ? 'bg-[#F7F6F3]/30' : ''}`}>
                        <td className="py-2.5 px-3 font-bold text-[#111827]">{row.size}</td>
                        <td className="py-2.5 px-3 text-[#111827]/70">{row.waist}</td>
                        <td className="py-2.5 px-3 text-[#111827]/70">{row.chest}</td>
                        <td className="py-2.5 px-3 text-[#111827]/70">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-5 p-3.5 bg-[#F7F6F3] rounded-sm border-l-4 border-gold">
                  <p className="text-xs text-[#111827]/70">
                    <span className="font-bold text-[#111827]">Fit Tip:</span> {product.fit}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
