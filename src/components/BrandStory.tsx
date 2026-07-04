'use client';

import { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

const HEADLINE_WORDS = ['ROOTED', 'IN', 'CRAFT.', 'BUILT', 'FOR', 'CONFIDENCE.'];

export function BrandStory() {
  const reduced = useReducedMotion();

  return (
    <section className="py-24 lg:py-36 bg-[#111827] relative overflow-hidden">
      {/* Gold gradient line top */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--color-gold-gradient)' }} />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#C9A227 1px, transparent 1px), linear-gradient(90deg, #C9A227 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Word-by-word reveal headline */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-8">
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.45, delay: i * 0.09, ease: 'easeOut' }}
              className="section-title text-white"
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={reduced ? {} : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="mx-auto w-20 h-px origin-center mb-8"
          style={{ background: 'var(--color-gold-gradient)' }}
        />

        <motion.p
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
          className="text-white/55 text-base lg:text-lg leading-relaxed max-w-xl mx-auto"
        >
          Spiider was born from a simple belief: that premium fashion shouldn&apos;t come with a compromise. Denim that lasts. Ethnic wear that honours craft. Everyday pieces built to endure. One brand, one identity, built for the modern Indian wardrobe.
        </motion.p>

        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.85, ease: 'easeOut' }}
          className="mt-8"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors duration-200 gold-underline text-sm"
          >
            Our Story →
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
          className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-12"
        >
          {[
            { num: '10K+', label: 'Happy Customers' },
            { num: '4', label: 'Collections' },
            { num: '100%', label: 'Premium Fabrics' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-black text-2xl sm:text-3xl text-gold price">{stat.num}</div>
              <div className="text-xs text-white/40 mt-1 overline-label" style={{ fontSize: '0.6rem' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gold gradient line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'var(--color-gold-gradient)' }} />
    </section>
  );
}
