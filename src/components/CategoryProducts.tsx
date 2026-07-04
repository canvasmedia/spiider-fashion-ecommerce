'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { CATEGORY_SECTIONS, fadeRise, fadeRiseContainer } from '@/lib/constants';

export function CategoryProducts() {
  return (
    <div>
      {CATEGORY_SECTIONS.map((section, sectionIndex) => (
        <CategorySection key={section.key} section={section} sectionIndex={sectionIndex} />
      ))}
    </div>
  );
}

function CategorySection({
  section,
  sectionIndex,
}: {
  section: (typeof CATEGORY_SECTIONS)[number];
  sectionIndex: number;
}) {
  const reduced = useReducedMotion();
  const isEven = sectionIndex % 2 === 0;

  return (
    <section className={`py-20 lg:py-28 ${isEven ? 'bg-[#F7F6F3]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeRiseContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <motion.p variants={fadeRise} className="overline-label text-gold mb-2">
              {section.tagline}
            </motion.p>
            <motion.h2 variants={fadeRise} className="section-title text-[#111827]">
              {section.label}
            </motion.h2>
          </div>
          <motion.div variants={fadeRise}>
            <Link
              href={section.href}
              className="hidden sm:inline-flex items-center gap-2 overline-label text-[0.7rem] text-[#111827] hover:text-gold transition-colors duration-200 gold-underline"
            >
              See All <ArrowRight size={13} />
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} reduced={!!reduced} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href={section.href}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#111827] text-[#111827] overline-label text-xs hover:bg-[#111827] hover:text-gold rounded-sm transition-all duration-200"
          >
            See All {section.label} <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
  reduced,
}: {
  product: (typeof CATEGORY_SECTIONS)[number]['products'][number];
  index: number;
  reduced: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const badgeColors: Record<string, string> = {
    bestseller: 'bg-[#111827] text-gold',
    new: 'bg-gold text-[#111827]',
    sale: 'bg-[#B3261E] text-white',
    festive: 'bg-[#1E3A8A] text-white',
  };

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.09, ease: 'easeOut' }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-white">
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: hovered && product.hoverImage ? 0 : 1 }}
            transition={{ duration: reduced ? 0 : 0.35 }}
          >
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          </motion.div>
          {product.hoverImage && (
            <motion.div className="absolute inset-0" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.35 }}>
              <Image src={product.hoverImage} alt={product.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </motion.div>
          )}
          {product.badge && (
            <div className={`absolute top-3 left-3 px-2.5 py-1 overline-label text-[0.6rem] rounded-sm ${badgeColors[product.badge] || 'bg-[#111827] text-white'}`}>
              {product.badge === 'bestseller' ? 'Bestseller' : product.badge === 'new' ? 'New' : product.badge.toUpperCase()}
            </div>
          )}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-[#111827]/90 py-3 px-4"
            animate={{ y: hovered && !reduced ? 0 : '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <span className="flex items-center justify-center gap-2 text-gold overline-label text-[0.65rem]">
              View Details <ArrowRight size={12} />
            </span>
          </motion.div>
        </div>
        <div className="mt-3 space-y-1">
          <p className="overline-label text-[#111827]/50" style={{ fontSize: '0.6rem' }}>
            {(product as { subcategory?: string }).subcategory ?? product.category}
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
