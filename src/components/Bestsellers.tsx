'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from './ProductCard';
import { BESTSELLERS, fadeRise, fadeRiseContainer } from '@/lib/constants';

export function Bestsellers() {
  return (
    <section className="py-20 lg:py-28 bg-[#F7F6F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeRiseContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <motion.p variants={fadeRise} className="overline-label text-gold mb-2">
              Editor&apos;s Selection
            </motion.p>
            <motion.h2 variants={fadeRise} className="section-title text-[#111827]">
              Bestsellers
            </motion.h2>
          </div>
          <motion.div variants={fadeRise}>
            <Link
              href="/new-arrivals"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#111827] hover:text-gold transition-colors duration-200 gold-underline"
            >
              View All <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {BESTSELLERS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/new-arrivals"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#111827] text-gold overline-label text-xs rounded-sm hover:bg-gold hover:text-[#111827] transition-colors duration-200"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
