'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Users, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_NUMBER, WHOLESALE_WHATSAPP } from '@/lib/constants';

const RETAIL_WA = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I want to order from Spiider. Please help me explore your catalog and place a retail order.')}`;

export function TradeSections() {
  const reduced = useReducedMotion();

  return (
    <section className="py-20 bg-[#F7F6F3] border-t border-b border-[#111827]/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="overline-label text-gold mb-2">Direct & Personal</p>
          <h2 className="display-headline text-[#111827]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            HOW WOULD YOU LIKE TO SHOP?
          </h2>
          <p className="mt-3 text-base text-[#111827]/70 font-light">
            Whether you are buying for yourself or sourcing for your boutique, we process all orders directly via WhatsApp for lightning-fast support and guaranteed satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Retail Section */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 sm:p-12 rounded-sm shadow-sm border border-[#111827]/10 flex flex-col justify-between relative group hover:border-gold transition-colors duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full pointer-events-none group-hover:bg-gold/10 transition-colors" />
            
            <div>
              <div className="w-14 h-14 bg-[#111827] text-gold rounded-sm flex items-center justify-center mb-6 shadow-md">
                <ShoppingBag size={26} />
              </div>
              <span className="overline-label text-gold text-xs">For Individuals</span>
              <h3 className="font-black text-2xl sm:text-3xl text-[#111827] mt-1 mb-4 uppercase">
                Retail Orders
              </h3>
              <p className="text-sm sm:text-base text-[#111827]/70 font-light leading-relaxed mb-8">
                Explore our denim, festive wear, and casual tees. Pick your favorite style and connect with our styling assistants on WhatsApp for exact measurements and instant ordering.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  'Live Styling & Size Assistance',
                  '15-Day Easy Exchanges',
                  'Pan-India Express Delivery',
                  'COD Available Across India'
                ].map((perk) => (
                  <div key={perk} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#111827]">
                    <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={RETAIL_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-[#111827] text-gold hover:bg-gold hover:text-[#111827] transition-all duration-200 font-bold overline-label text-xs sm:text-sm rounded-sm flex items-center justify-center gap-2 shadow-md group/btn"
            >
              <MessageCircle size={18} className="text-green-400 group-hover/btn:text-[#111827] transition-colors" />
              Order Retail via WhatsApp
              <ArrowRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Wholesale Section */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-[#111827] p-8 sm:p-12 rounded-sm shadow-xl border border-gold/40 text-white flex flex-col justify-between relative group hover:border-gold transition-colors duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full pointer-events-none group-hover:bg-gold/20 transition-colors" />
            
            <div>
              <div className="w-14 h-14 bg-gold text-[#111827] rounded-sm flex items-center justify-center mb-6 shadow-md">
                <Users size={26} />
              </div>
              <span className="overline-label text-[#E8C766] text-xs">For Retailers & Resellers</span>
              <h3 className="font-black text-2xl sm:text-3xl text-white mt-1 mb-4 uppercase">
                Wholesale & B2B
              </h3>
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed mb-8">
                Partner with India&apos;s fastest growing fashion brand. We supply multi-brand outlets, boutiques, and corporate clients with premium apparel at factory-direct margins.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  'MOQ starting at just 50 pcs',
                  'Factory-Direct Wholesale Margins',
                  'Dedicated B2B Account Manager',
                  'Custom Branding & White-Labeling'
                ].map((perk) => (
                  <div key={perk} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white/90">
                    <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={WHOLESALE_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-gold text-[#111827] hover:bg-[#E8C766] transition-all duration-200 font-bold overline-label text-xs sm:text-sm rounded-sm flex items-center justify-center gap-2 shadow-md group/btn"
            >
              <MessageCircle size={18} className="text-green-700" />
              Get Wholesale Quote
              <ArrowRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
