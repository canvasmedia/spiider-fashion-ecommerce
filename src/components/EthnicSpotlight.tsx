'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeRise, fadeRiseContainer } from '@/lib/constants';

export function EthnicSpotlight() {
  const reduced = useReducedMotion();

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <motion.div
            variants={fadeRiseContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="order-2 lg:order-1"
          >
            <motion.p variants={fadeRise} className="overline-label text-gold mb-4 tracking-[0.25em]">
              Festive Edit 2025
            </motion.p>
            <motion.h2 variants={fadeRise} className="section-title text-[#111827] mb-6">
              ROOTED IN<br />TRADITION.
            </motion.h2>
            <motion.div
              variants={fadeRise}
              className="w-12 h-0.5 mb-6"
              style={{ background: 'var(--color-gold-gradient)' }}
            />
            <motion.p variants={fadeRise} className="text-[#111827]/65 text-base leading-relaxed max-w-md">
              Every thread tells a story. Our Indian Ethnic collection honours the craft of India&apos;s textile heritage — reinterpreted for the man who wears tradition with modern confidence. From intimate festivities to wedding seasons.
            </motion.p>
            <motion.div variants={fadeRise} className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/category/ethnic/festive"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111827] text-gold overline-label text-xs rounded-sm hover:bg-gold hover:text-[#111827] transition-colors duration-200"
              >
                Festive Edit <ArrowRight size={14} />
              </Link>
              <Link
                href="/category/ethnic/wedding"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#111827] text-[#111827] overline-label text-xs rounded-sm hover:border-gold hover:text-gold transition-colors duration-200"
              >
                Wedding Edit
              </Link>
            </motion.div>

            {/* Category pills */}
            <motion.div variants={fadeRise} className="flex flex-wrap gap-2 mt-8">
              {['Kurtas', 'Sherwanis', 'Ethnic Co-ords', 'Festive Sets'].map(pill => (
                <Link
                  key={pill}
                  href="/category/ethnic"
                  className="px-4 py-1.5 text-xs text-[#111827]/60 border border-[#111827]/15 rounded-full hover:border-gold hover:text-gold transition-colors duration-200"
                >
                  {pill}
                </Link>
              ))}
            </motion.div>
          </motion.div>

          {/* Images side */}
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <motion.div
              initial={reduced ? {} : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="col-span-1 aspect-[3/4] relative rounded-sm overflow-hidden"
            >
              <Image
                src="https://images.pexels.com/photos/37239052/pexels-photo-37239052.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700"
                alt="Festive Kurta"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </motion.div>
            <div className="col-span-1 flex flex-col gap-4">
              <motion.div
                initial={reduced ? {} : { opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
                className="aspect-square relative rounded-sm overflow-hidden"
              >
                <Image
                  src="https://images.pexels.com/photos/7792218/pexels-photo-7792218.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600"
                  alt="Traditional Ethnic Wear"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 25vw, 15vw"
                />
              </motion.div>
              <motion.div
                initial={reduced ? {} : { opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
                className="aspect-square relative rounded-sm overflow-hidden bg-[#111827]"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <span className="overline-label text-gold text-[0.6rem] mb-2">New Season</span>
                  <span className="font-black text-white text-2xl tracking-wider uppercase">50+</span>
                  <span className="text-xs text-white/50 mt-1">New Styles</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
