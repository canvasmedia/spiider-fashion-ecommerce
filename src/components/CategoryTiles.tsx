'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, fadeRise, fadeRiseContainer } from '@/lib/constants';

export function CategoryTiles() {
  const reduced = useReducedMotion();

  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <motion.div
        variants={fadeRiseContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mb-12"
      >
        <motion.p variants={fadeRise} className="overline-label text-gold mb-2">
          Shop by Category
        </motion.p>
        <motion.h2 variants={fadeRise} className="section-title text-[#111827]">
          One Brand.<br className="sm:hidden" /> Every Style.
        </motion.h2>
      </motion.div>

      {/* 2x2 grid on large, 1 col on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat, i) => (
          <CategoryTile key={cat.key} cat={cat} index={i} reduced={!!reduced} />
        ))}
      </div>
    </section>
  );
}

function CategoryTile({
  cat,
  index,
  reduced,
}: {
  cat: (typeof CATEGORIES)[number];
  index: number;
  reduced: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.09, ease: 'easeOut' }}
      className="group relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gold perimeter border draw */}
      <svg
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        viewBox="0 0 100 133.3"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1" y="1" width="98" height="131.3"
          fill="none"
          stroke="#C9A227"
          strokeWidth="1.5"
          strokeDasharray="500"
          strokeDashoffset={hovered ? '0' : '500'}
          style={{ transition: reduced ? 'none' : 'stroke-dashoffset 0.7s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>

      {/* Image with Ken Burns */}
      <div className={`absolute inset-0 ${!reduced ? 'ken-burns' : ''}`}>
        <Image
          src={cat.image}
          alt={cat.label}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/30 to-transparent z-10" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
        <p className="overline-label text-gold/80" style={{ fontSize: '0.6rem' }}>
          {cat.tagline}
        </p>
        <h3 className="font-black text-xl text-white tracking-wide mt-1 uppercase">
          {cat.label}
        </h3>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="mt-3"
        >
          <Link
            href={cat.href}
            className={`inline-flex items-center gap-1.5 px-5 py-2 overline-label text-[0.62rem] rounded-sm transition-colors duration-200 ${
              cat.ctaVariant === 'blue'
                ? 'border border-[#1E3A8A] text-white hover:bg-[#1E3A8A]'
                : 'border border-gold text-gold hover:bg-gold hover:text-[#111827]'
            }`}
          >
            Shop {cat.label}
            <ArrowRight size={11} />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
