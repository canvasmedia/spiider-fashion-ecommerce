'use client';

import { useReducedMotion } from 'framer-motion';

const PROMO_ITEMS = [
  'FREE SHIPPING OVER ₹2,999',
  'USE CODE DENIM15 FOR 15% OFF',
  'NEW ARRIVALS EVERY FRIDAY',
  'EASY 15-DAY RETURNS',
  'SECURE PAYMENTS',
];

export function PromoStrip() {
  const reduced = useReducedMotion();

  const text = PROMO_ITEMS.join('   ·   ');
  const doubled = `${text}   ·   ${text}`;

  return (
    <div className="bg-brand-black text-gold overflow-hidden py-2.5 relative z-50">
      <div className={reduced ? 'flex justify-center px-4 text-center' : 'marquee-track'}>
        {reduced ? (
          <span className="overline-label">{PROMO_ITEMS[0]}</span>
        ) : (
          <>
            {[doubled, doubled].map((chunk, i) => (
              <span key={i} className="overline-label whitespace-nowrap px-8">
                {chunk}
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
