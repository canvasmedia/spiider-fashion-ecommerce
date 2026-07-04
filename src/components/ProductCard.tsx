'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  price: number;
  mrp?: number;
  badge?: string | null;
  image?: string;
  images?: string[];
  hoverImage?: string;
  sizes?: string[];
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const primaryImg = product.image || (product.images && product.images[0]) || '';
  const secondaryImg = product.hoverImage || (product.images && product.images[1]) || '';

  const discount = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const badgeColors: Record<string, string> = {
    bestseller: 'bg-[#111827] text-gold',
    new: 'bg-gold text-[#111827]',
    sale: 'bg-[#B3261E] text-white',
    festive: 'bg-[#1E3A8A] text-white',
  };

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: 'easeOut' }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image container */}
        <div className="relative overflow-hidden bg-[#F7F6F3] rounded-sm aspect-[3/4]">
          {/* Primary image */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: hovered && secondaryImg ? 0 : 1 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: 'easeOut' }}
          >
            {primaryImg && (
              <Image
                src={primaryImg}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            )}
          </motion.div>

          {/* Hover image */}
          {secondaryImg && (
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.35, ease: 'easeOut' }}
            >
              <Image
                src={secondaryImg}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </motion.div>
          )}

          {/* Badge */}
          {product.badge && (
            <div className={`absolute top-3 left-3 px-2.5 py-1 overline-label text-[0.6rem] rounded-sm z-10 ${badgeColors[product.badge] || 'bg-[#111827] text-white'}`}>
              {product.badge === 'bestseller' ? 'Bestseller' : product.badge === 'new' ? 'New' : product.badge.toUpperCase()}
            </div>
          )}

          {/* View details overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-[#111827]/90 border-t border-white/10 z-10"
            animate={{ y: (hovered && !reduced) ? 0 : '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <span className="flex items-center justify-center gap-1.5 w-full py-3 overline-label text-[0.65rem] text-gold">
              View Details <ArrowRight size={12} />
            </span>
          </motion.div>
        </div>

        {/* Info */}
        <div className="mt-3 space-y-1 px-0.5">
          <p className="text-xs text-[#111827]/50 overline-label" style={{ fontSize: '0.6rem' }}>
            {product.subcategory || (product.category === 'tshirts' ? 'Tees & Shirts' : product.category.charAt(0).toUpperCase() + product.category.slice(1))}
          </p>
          <h3 className="font-semibold text-sm text-[#111827] leading-tight group-hover:text-gold transition-colors duration-200 gold-underline">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-sm price">&#8377;{product.price.toLocaleString('en-IN')}</span>
            {product.mrp && (
              <>
                <span className="text-xs text-[#111827]/40 line-through price">&#8377;{product.mrp.toLocaleString('en-IN')}</span>
                <span className="text-[0.6rem] font-bold text-[#B3261E]">{discount}% off</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
