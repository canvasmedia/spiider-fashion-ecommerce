'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { fadeRise, fadeRiseContainer } from '@/lib/constants';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const reduced = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-[#F7F6F3]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeRiseContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeRise} className="overline-label text-gold mb-3">
            Stay in the Loop
          </motion.p>
          <motion.h2 variants={fadeRise} className="section-title text-[#111827] mb-4">
            JOIN THE SPIIDER<br />INNER CIRCLE
          </motion.h2>
          <motion.p variants={fadeRise} className="text-[#111827]/55 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            New drops, exclusive offers, and early access to festive collections. No spam, just premium.
          </motion.p>

          <motion.div variants={fadeRise}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={reduced ? {} : { scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-3 py-6"
                >
                  {/* Checkmark */}
                  <div className="w-14 h-14 rounded-full bg-[#111827] flex items-center justify-center">
                    <motion.svg
                      width="24" height="24" viewBox="0 0 24 24"
                      fill="none" stroke="#C9A227" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <motion.path
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                    </motion.svg>
                  </div>
                  <p className="font-bold text-[#111827]">You&apos;re in.</p>
                  <p className="text-sm text-[#111827]/50">Welcome to the Spiider inner circle.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-5 py-3.5 border border-[#111827]/20 bg-white text-[#111827] text-sm rounded-sm outline-none focus:border-gold transition-colors placeholder:text-[#111827]/30"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-8 py-3.5 bg-[#111827] text-gold overline-label text-xs rounded-sm hover:bg-gold hover:text-[#111827] transition-colors duration-200 disabled:opacity-60 flex-shrink-0"
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {status === 'error' && (
              <p className="text-[#B3261E] text-xs mt-2">Something went wrong. Please try again.</p>
            )}

            <p className="text-xs text-[#111827]/30 mt-4">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
