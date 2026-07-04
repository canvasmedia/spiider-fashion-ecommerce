'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeRise, fadeRiseContainer } from '@/lib/constants';

export function KidsTeaser() {
  const reduced = useReducedMotion();

  return (
    <section className="py-20 lg:py-28 bg-[#F7F6F3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Images */}
          <div className="lg:col-span-3 grid grid-cols-3 gap-3">
            {[
              { src: 'https://images.pexels.com/photos/33123753/pexels-photo-33123753.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600', delay: 0 },
              { src: 'https://images.pexels.com/photos/29214428/pexels-photo-29214428.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=600', delay: 0.1 },
              { src: 'https://images.pexels.com/photos/1620827/pexels-photo-1620827.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600', delay: 0.2 },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={reduced ? {} : { opacity: 0, y: i % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: img.delay, ease: 'easeOut' }}
                className={`relative rounded-sm overflow-hidden ${i === 1 ? 'aspect-[3/5]' : 'aspect-[3/4]'}`}
              >
                <Image
                  src={img.src}
                  alt="Kids fashion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 33vw, 20vw"
                />
              </motion.div>
            ))}
          </div>

          {/* Text */}
          <motion.div
            variants={fadeRiseContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-2"
          >
            <motion.p variants={fadeRise} className="overline-label text-gold mb-3">
              Kids Collection
            </motion.p>
            <motion.h2 variants={fadeRise} className="section-title text-[#111827] mb-4">
              STYLE<br />STARTS<br />YOUNG.
            </motion.h2>
            <motion.p variants={fadeRise} className="text-[#111827]/60 text-sm leading-relaxed">
              The same premium quality, thoughtfully scaled. Denim, ethnic wear, and everyday tees — designed for kids who deserve the same care as grown-ups. Comfortable fabrics, honest construction, zero compromise.
            </motion.p>

            <motion.div variants={fadeRise} className="flex flex-wrap gap-3 mt-8">
              {['Kids Denim', 'Kids Ethnic', 'Kids Tees'].map(cat => (
                <Link
                  key={cat}
                  href="/category/kids"
                  className="px-4 py-2 text-xs border border-[#111827]/20 text-[#111827]/60 rounded-full hover:border-gold hover:text-gold transition-colors duration-200"
                >
                  {cat}
                </Link>
              ))}
            </motion.div>

            <motion.div variants={fadeRise} className="mt-6">
              <Link
                href="/category/kids"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111827] text-gold overline-label text-xs rounded-sm hover:bg-gold hover:text-[#111827] transition-colors duration-200"
              >
                Shop Kids <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
