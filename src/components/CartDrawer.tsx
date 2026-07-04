'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQty, total, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#111827]/8">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} />
                <span className="font-bold tracking-wide uppercase text-sm">
                  Your Bag
                  {itemCount > 0 && (
                    <span className="ml-2 text-gold font-black">({itemCount})</span>
                  )}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 hover:text-gold transition-colors"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag size={48} className="text-[#111827]/20" />
                  <p className="text-[#111827]/50 font-medium">Your bag is empty.</p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2.5 bg-[#111827] text-gold overline-label text-xs rounded-sm hover:bg-gold hover:text-[#111827] transition-colors duration-200"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map(item => (
                    <motion.div
                      key={`${item.id}-${item.size}`}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="flex gap-4"
                    >
                      <div className="relative w-20 h-24 flex-shrink-0 bg-[#F7F6F3] rounded-sm overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm leading-tight truncate">{item.name}</p>
                        <p className="text-xs text-[#111827]/50 mt-0.5">Size: {item.size}</p>
                        <p className="text-gold font-bold text-sm mt-1 price">₹{item.price.toLocaleString('en-IN')}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-[#111827]/15 rounded-sm">
                            <button
                              onClick={() => updateQty(item.id, item.size, item.quantity - 1)}
                              className="p-1.5 hover:text-gold transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-2.5 text-sm font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQty(item.id, item.size, item.quantity + 1)}
                              className="p-1.5 hover:text-gold transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-xs text-[#111827]/40 hover:text-[#B3261E] transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#111827]/8 px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">Subtotal</span>
                  <span className="font-black text-lg price">₹{total.toLocaleString('en-IN')}</span>
                </div>
                {total < 2999 && (
                  <p className="text-xs text-[#111827]/50 text-center">
                    Add ₹{(2999 - total).toLocaleString('en-IN')} more for free shipping
                  </p>
                )}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-3.5 bg-[#111827] text-gold text-center overline-label text-xs rounded-sm hover:bg-gold hover:text-[#111827] transition-colors duration-200"
                >
                  Proceed to Checkout
                </Link>
                <div className="flex items-center justify-center gap-4 text-[#111827]/30">
                  <svg width="32" height="20" viewBox="0 0 32 20" fill="currentColor"><rect x="1" y="1" width="30" height="18" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/><text x="16" y="14" textAnchor="middle" fontSize="7" fontWeight="bold">UPI</text></svg>
                  <svg width="32" height="20" viewBox="0 0 32 20" fill="none"><rect x="1" y="1" width="30" height="18" rx="2" stroke="currentColor" strokeWidth="1"/><circle cx="13" cy="10" r="5" fill="#EB001B"/><circle cx="19" cy="10" r="5" fill="#F79E1B"/></svg>
                  <svg width="32" height="20" viewBox="0 0 32 20" fill="none"><rect x="1" y="1" width="30" height="18" rx="2" stroke="currentColor" strokeWidth="1"/><text x="16" y="14" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor">VISA</text></svg>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
