'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from './ProductCard';
import { fadeRise, fadeRiseContainer } from '@/lib/constants';

const FEATURED_PRODUCTS = [
  { id: 2, name: 'Regular Midnight Jeans', slug: 'regular-midnight-jeans', category: 'denim', price: 2199, mrp: 2999, badge: 'new' as const, image: 'https://images.pexels.com/photos/4937449/pexels-photo-4937449.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600', sizes: ['28', '30', '32', '34', '36'] },
  { id: 5, name: 'Denim Co-ord Set', slug: 'denim-coord-set', category: 'denim', price: 4499, mrp: 5999, badge: 'new' as const, image: 'https://images.pexels.com/photos/22748666/pexels-photo-22748666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 7, name: 'Premium Kurta Set', slug: 'premium-kurta-set', category: 'ethnic', price: 3299, mrp: 4500, badge: 'new' as const, image: 'https://images.pexels.com/photos/37239052/pexels-photo-37239052.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600', sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 11, name: 'Minimal Overshirt', slug: 'minimal-overshirt', category: 'tshirts', price: 1999, mrp: 2799, badge: 'new' as const, image: 'https://images.pexels.com/photos/30005113/pexels-photo-30005113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600', sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 13, name: 'Kids Denim Jacket', slug: 'kids-denim-jacket', category: 'kids', price: 1299, mrp: 1799, badge: 'new' as const, image: 'https://images.pexels.com/photos/33123753/pexels-photo-33123753.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600', sizes: ['2Y', '4Y', '6Y', '8Y', '10Y'] },
  { id: 8, name: 'Wedding Sherwani', slug: 'wedding-sherwani', category: 'ethnic', price: 7999, mrp: 10999, badge: 'new' as const, image: 'https://images.pexels.com/photos/37921733/pexels-photo-37921733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600', sizes: ['S', 'M', 'L', 'XL'] },
];

const SALE_PRODUCTS = [
  { id: 9, name: 'Festive Kurta Pajama', slug: 'festive-kurta-pajama', category: 'ethnic', price: 2999, mrp: 3999, badge: 'sale' as const, image: 'https://images.pexels.com/photos/7792218/pexels-photo-7792218.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600', sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 1, name: 'Slim Fit Indigo Jeans', slug: 'slim-fit-indigo-jeans', category: 'denim', price: 2499, mrp: 3499, badge: 'sale' as const, image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600', hoverImage: 'https://images.pexels.com/photos/4937449/pexels-photo-4937449.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600', sizes: ['28', '30', '32', '34', '36'] },
  { id: 10, name: 'Essential White Tee', slug: 'essential-white-tee', category: 'tshirts', price: 999, mrp: 1499, badge: 'sale' as const, image: 'https://images.pexels.com/photos/26546833/pexels-photo-26546833.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 15, name: 'Kids Essential Tee', slug: 'kids-essential-tee', category: 'kids', price: 599, mrp: 799, badge: 'sale' as const, image: 'https://images.pexels.com/photos/1620827/pexels-photo-1620827.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600', sizes: ['2Y', '4Y', '6Y', '8Y', '10Y', '12Y'] },
];

interface CategoryRedirectProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export function CategoryRedirect({ title, subtitle, badge }: CategoryRedirectProps) {
  const products = badge === 'sale' ? SALE_PRODUCTS : FEATURED_PRODUCTS;

  return (
    <div className="pt-24 min-h-screen">
      {/* Hero strip */}
      <div className="bg-[#111827] py-16 lg:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(201,162,39,0.08) 0%, transparent 70%)' }} />
        <motion.div
          variants={fadeRiseContainer()}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-3xl mx-auto px-4"
        >
          <motion.p variants={fadeRise} className="overline-label text-gold mb-3" style={{ fontSize: '0.65rem' }}>
            {badge === 'sale' ? 'Limited time' : 'Just arrived'}
          </motion.p>
          <motion.h1 variants={fadeRise} className="display-headline text-white" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
            {title}
          </motion.h1>
          <motion.p variants={fadeRise} className="text-white/50 text-base mt-4">
            {subtitle}
          </motion.p>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'var(--color-gold-gradient)' }} />
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
