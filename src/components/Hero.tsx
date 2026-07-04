'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { fadeRise, fadeRiseContainer } from '@/lib/constants';

const SLIDES = [
  {
    id: 'denim',
    label: 'The Icon Collection — 2025',
    heading: ['THE DENIM', 'COLLECTION'],
    accent: 'COLLECTION',
    copy: 'Raw indigo. Washed slate. Deep midnight. Denim crafted for those who wear confidence as a second skin.',
    primaryCta: { label: 'Shop Jeans', href: '/category/denim' },
    secondaryCta: { label: 'New Arrivals', href: '/new-arrivals' },
    bg: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920',
    overlay: 'from-[#111827]/90 via-[#111827]/60 to-transparent',
  },
  {
    id: 'ethnic',
    label: 'Festive Edit — 2025',
    heading: ['ROOTS OF', 'ROYALTY'],
    accent: 'ROYALTY',
    copy: 'Heritage embroideries. Festive silhouettes. Ethnic wear that carries the weight of tradition — effortlessly.',
    primaryCta: { label: 'Shop Ethnic', href: '/category/ethnic' },
    secondaryCta: { label: 'Festive Edit', href: '/category/ethnic' },
    bg: 'https://images.pexels.com/photos/37921733/pexels-photo-37921733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920',
    overlay: 'from-[#1a0a00]/90 via-[#3b1900]/60 to-transparent',
  },
  {
    id: 'tshirts',
    label: 'Everyday Essentials — 2025',
    heading: ['WEAR YOUR', 'STORY'],
    accent: 'STORY',
    copy: 'From the boardroom to the street. T-shirts and shirts built for every chapter of your day.',
    primaryCta: { label: 'Shop Shirts', href: '/category/tshirts' },
    secondaryCta: { label: 'View All', href: '/new-arrivals' },
    bg: 'https://images.pexels.com/photos/30005113/pexels-photo-30005113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920',
    overlay: 'from-[#111827]/90 via-[#111827]/50 to-transparent',
  },
];

const QUICK_TILES = [
  { label: 'Ethnic Wear', sub: 'Festive & Beyond', href: '/category/ethnic' },
  { label: 'Tees & Shirts', sub: 'Everyday Essentials', href: '/category/tshirts' },
  { label: 'Kids', sub: 'Style Starts Young', href: '/category/kids' },
];

export function Hero() {
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number, dir: 1 | -1 = 1) => {
    setDirection(dir);
    setCurrent((next + SLIDES.length) % SLIDES.length);
  }, []);

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % SLIDES.length);
    }, 5500);
  }, []);

  useEffect(() => {
    if (reduced) return;
    startTimer();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [reduced, startTimer]);

  const handleManual = (next: number, dir: 1 | -1) => {
    go(next, dir);
    startTimer(); // reset timer on manual nav
  };

  const slide = SLIDES[current];

  const slideVariants: any = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80, transition: { duration: 0.4 } }),
  };

  const bgVariants: any = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-end pb-20 lg:pb-28">
      {/* Background crossfade */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={slide.id + '-bg'}
          custom={direction}
          variants={bgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 -top-12 will-change-transform"
          style={{
            backgroundImage: `url(${slide.bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        >
          {/* Ken Burns only when not reduced */}
          {!reduced && (
            <div
              className="absolute inset-0 ken-burns"
              style={{
                backgroundImage: `url(${slide.bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
              }}
            />
          )}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Gold left accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 z-10"
        style={{ background: 'var(--color-gold-gradient)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id + '-content'}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeRise}
              initial="hidden"
              animate="show"
              className="overline-label text-gold mb-4 tracking-[0.3em]"
            >
              {slide.label}
            </motion.p>

            <motion.h1
              variants={fadeRise}
              initial="hidden"
              animate="show"
              className="display-headline text-white"
            >
              {slide.heading[0]}<br />
              <span className="text-gold-gradient">{slide.heading[1]}</span>
            </motion.h1>

            <motion.p
              variants={fadeRise}
              initial="hidden"
              animate="show"
              className="mt-6 text-white/70 text-lg leading-relaxed max-w-md font-light"
            >
              {slide.copy}
            </motion.p>

            <motion.div
              variants={fadeRise}
              initial="hidden"
              animate="show"
              className="flex items-center gap-4 mt-10"
            >
              <MagneticButton href={slide.primaryCta.href} primary>
                {slide.primaryCta.label}
                <ArrowRight size={16} className="ml-2" />
              </MagneticButton>

              <Link
                href={slide.secondaryCta.href}
                className="inline-flex items-center text-white/70 hover:text-gold transition-colors duration-200 text-sm font-medium gold-underline"
              >
                {slide.secondaryCta.label}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide controls row */}
        <div className="flex items-center gap-5 mt-10">
          {/* Prev / Next */}
          <button
            onClick={() => handleManual((current - 1 + SLIDES.length) % SLIDES.length, -1)}
            aria-label="Previous slide"
            className="p-2 border border-white/30 text-white hover:border-gold hover:text-gold rounded-sm transition-all duration-200"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => handleManual((current + 1) % SLIDES.length, 1)}
            aria-label="Next slide"
            className="p-2 border border-white/30 text-white hover:border-gold hover:text-gold rounded-sm transition-all duration-200"
          >
            <ChevronRight size={16} />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleManual(i, i > current ? 1 : -1)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative h-0.5 transition-all duration-400 rounded-full overflow-hidden"
                style={{ width: i === current ? 32 : 16, background: 'rgba(255,255,255,0.3)' }}
              >
                {i === current && (
                  <motion.div
                    layoutId="dot-fill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'var(--color-gold)' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Slide counter */}
          <span className="overline-label text-white/40 ml-auto" style={{ fontSize: '0.6rem' }}>
            {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2 z-10"
      >
        <span className="overline-label text-white/40" style={{ fontSize: '0.55rem', writingMode: 'vertical-rl' }}>SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold/60" />
      </motion.div>

      {/* Quick-nav tiles */}
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
        className="absolute bottom-0 right-0 hidden lg:flex divide-x divide-white/10 z-10"
      >
        {QUICK_TILES.map(tile => (
          <Link
            key={tile.label}
            href={tile.href}
            className="flex flex-col gap-1 px-8 py-5 bg-[#111827]/70 backdrop-blur-sm hover:bg-gold/90 group transition-colors duration-300 border-t border-white/10"
          >
            <span className="font-bold text-sm text-white group-hover:text-[#111827] transition-colors duration-300">{tile.label}</span>
            <span className="text-xs text-white/50 group-hover:text-[#111827]/70 transition-colors duration-300">{tile.sub}</span>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}

function MagneticButton({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.2;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.2;
    btnRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onMouseLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = 'translate(0,0)';
  };

  return (
    <Link
      ref={btnRef}
      href={href}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), background-color 0.2s, color 0.2s' }}
      className={
        primary
          ? 'inline-flex items-center px-8 py-3.5 bg-[#111827] text-gold border border-[#111827] overline-label text-xs hover:bg-gold hover:text-[#111827] hover:border-gold rounded-sm'
          : 'inline-flex items-center px-8 py-3.5 bg-transparent text-white border border-white/40 overline-label text-xs hover:border-gold hover:text-gold rounded-sm'
      }
    >
      {children}
    </Link>
  );
}

