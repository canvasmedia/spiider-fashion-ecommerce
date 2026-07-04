'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { UGC_IMAGES, fadeRise, fadeRiseContainer } from '@/lib/constants';

const TESTIMONIALS = [
  { name: 'Arjun M.', location: 'Mumbai', rating: 5, text: 'The slim fit jeans are exactly what I\'ve been looking for. Premium denim at a fair price — Spiider nailed it.' },
  { name: 'Rahul S.', location: 'Delhi', rating: 5, text: 'Wore the kurta set to a wedding. Got more compliments than the groom. Quality is exceptional.' },
  { name: 'Karan P.', location: 'Bangalore', rating: 4, text: 'The tees are incredibly soft and the fits are just right. Will definitely be back for the new arrivals.' },
];

export function SocialProof() {
  const reduced = useReducedMotion();
  const [showMore, setShowMore] = useState(false);

  const visibleImages = showMore ? UGC_IMAGES : UGC_IMAGES.slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeRiseContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 text-center"
        >
          <motion.p variants={fadeRise} className="overline-label text-gold mb-2">As Worn By You</motion.p>
          <motion.h2 variants={fadeRise} className="section-title text-[#111827]">Community Lookbook</motion.h2>
          <motion.p variants={fadeRise} className="text-[#111827]/50 text-sm mt-3">
            Tag <span className="text-gold font-semibold">@spiider.in</span> to be featured
          </motion.p>
        </motion.div>

        {/* UGC Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {visibleImages.map((img, i) => (
            <motion.div
              key={`${img}-${i}`}
              initial={reduced ? {} : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
              className="group relative aspect-square overflow-hidden rounded-sm bg-[#F7F6F3] cursor-pointer"
            >
              <Image
                src={img}
                alt={`Community look ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-[#111827]/0 group-hover:bg-[#111827]/30 transition-colors duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="text-white font-semibold text-xs overline-label"
                >
                  View Look
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more */}
        {!showMore && (
          <div className="text-center mb-16">
            <button
              onClick={() => setShowMore(true)}
              className="px-8 py-3 border border-[#111827]/20 text-[#111827] overline-label text-xs rounded-sm hover:border-gold hover:text-gold transition-colors duration-200"
            >
              Load More
            </button>
          </div>
        )}

        {/* Testimonials */}
        <div className="border-t border-[#111827]/8 pt-16">
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="overline-label text-gold text-center mb-10"
          >
            What Our Customers Say
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={reduced ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
                className="bg-[#F7F6F3] rounded-sm p-6"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <span key={si} className={`text-sm ${si < t.rating ? 'text-gold' : 'text-[#111827]/20'}`}>★</span>
                  ))}
                </div>
                <p className="text-sm text-[#111827]/70 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-4 border-t border-[#111827]/8 pt-3">
                  <span className="font-semibold text-sm text-[#111827]">{t.name}</span>
                  <span className="text-xs text-[#111827]/40 ml-2">{t.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
