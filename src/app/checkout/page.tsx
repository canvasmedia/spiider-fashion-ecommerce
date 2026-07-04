'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, ShoppingBag, Users, Check, ArrowRight, Shield, Truck, RotateCcw, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { WHATSAPP_NUMBER, WHOLESALE_WHATSAPP } from '@/lib/constants';

const RETAIL_WA = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I want to order from Spiider. Please help me explore your catalog and place an order.')}`;

const FAQS = [
  {
    q: 'Why do we take orders via WhatsApp?',
    a: 'We believe fashion is personal. Ordering directly via WhatsApp allows our styling and support team to assist you with exact measurements, fabric feel, real-time stock updates, and custom recommendations.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major UPI apps (GPay, PhonePe, Paytm), Net Banking, Credit/Debit Cards via secure payment links, and Cash on Delivery (COD) across 20,000+ PIN codes in India.'
  },
  {
    q: 'How fast is delivery?',
    a: 'Orders are dispatched within 24 hours. Standard delivery takes 3–5 business days for metro cities and 5–7 days for other locations.'
  },
  {
    q: 'What is your return & exchange policy?',
    a: 'We offer a 15-day hassle-free exchange and return policy on all retail orders. Simply send us a message on WhatsApp with your order details!'
  }
];

export default function CheckoutPage() {
  const reduced = useReducedMotion();

  return (
    <div className="pt-24 min-h-screen bg-[#F7F6F3] pb-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 text-center">
        <p className="overline-label text-gold mb-2">Simple & Personal</p>
        <h1 className="font-black text-3xl sm:text-4xl text-[#111827] uppercase tracking-wide">
          How to Order
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#111827]/70 max-w-xl mx-auto font-light leading-relaxed">
          At Spiider, we have eliminated complicated checkouts. All retail and wholesale orders are processed directly via WhatsApp for instant support and personalized service.
        </p>
      </div>

      {/* Two Ways Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Retail */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 sm:p-10 rounded-sm shadow-sm border border-[#111827]/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-gold/15 rounded-sm flex items-center justify-center mb-6">
                <ShoppingBag size={24} className="text-gold" />
              </div>
              <p className="overline-label text-gold mb-1" style={{ fontSize: '0.65rem' }}>For Individual Buyers</p>
              <h2 className="font-black text-2xl text-[#111827] mb-4 uppercase">Retail Ordering</h2>
              <p className="text-sm text-[#111827]/70 leading-relaxed mb-6 font-light">
                Explore our full collection of denim, ethnic wear, tees, and kids apparel. Find your style, pick your size, and message us on WhatsApp to complete your order in seconds.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Browse products on our catalog',
                  'Click "Order via WhatsApp" on any product page',
                  'Confirm size, delivery address & payment method',
                  'Get tracking link via WhatsApp within 24 hours'
                ].map((step, idx) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-[#111827]/80">
                    <span className="w-5 h-5 rounded-full bg-[#111827] text-gold text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={RETAIL_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-[#111827] text-gold hover:bg-gold hover:text-[#111827] transition-all duration-200 font-bold overline-label text-xs sm:text-sm rounded-sm flex items-center justify-center gap-2 shadow-md group"
            >
              <MessageCircle size={18} className="text-green-400 group-hover:text-[#111827]" />
              Start Retail Order
              <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Wholesale */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-[#111827] p-8 sm:p-10 rounded-sm shadow-md border border-gold/30 text-white flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-[#1E3A8A]/30 rounded-sm flex items-center justify-center mb-6">
                <Users size={24} className="text-[#6B9FE4]" />
              </div>
              <p className="overline-label text-[#6B9FE4] mb-1" style={{ fontSize: '0.65rem' }}>For Retailers & Boutiques</p>
              <h2 className="font-black text-2xl text-white mb-4 uppercase">Wholesale & Bulk</h2>
              <p className="text-sm text-white/70 leading-relaxed mb-6 font-light">
                Partner with India&apos;s fastest growing fashion brand. We supply multi-brand outlets, boutiques, and corporate clients with premium apparel at competitive margins.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Minimum Order Quantity (MOQ): 50 pieces',
                  'Dedicated B2B account manager',
                  'Custom branding & white-label support available',
                  'Priority pan-India dispatch with GST invoicing'
                ].map((step, idx) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="w-5 h-5 rounded-full bg-gold text-[#111827] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={WHOLESALE_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-gold text-[#111827] hover:bg-[#E8C766] transition-all duration-200 font-bold overline-label text-xs sm:text-sm rounded-sm flex items-center justify-center gap-2 shadow-md group"
            >
              <MessageCircle size={18} className="text-green-700" />
              Get Wholesale Quote
              <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 bg-white rounded-sm border border-[#111827]/8 shadow-sm">
          {[
            { icon: Shield, title: '100% Verified Quality', sub: 'Every piece passes 5-step quality checks before dispatch.' },
            { icon: Truck, title: 'Pan-India Express', sub: 'Fast shipping across 20,000+ PIN codes with live tracking.' },
            { icon: RotateCcw, title: 'Easy Returns', sub: '15-day return and exchange window on all retail purchases.' },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#F7F6F3] flex items-center justify-center text-gold">
                <Icon size={20} />
              </div>
              <h3 className="font-bold text-sm text-[#111827]">{title}</h3>
              <p className="text-xs text-[#111827]/60 leading-relaxed">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="overline-label text-gold mb-1">Got Questions?</p>
          <h2 className="font-black text-2xl text-[#111827] uppercase">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="p-6 bg-white rounded-sm border border-[#111827]/10 shadow-xs">
              <h3 className="font-bold text-base text-[#111827] flex items-center gap-2 mb-2">
                <HelpCircle size={18} className="text-gold flex-shrink-0" />
                {faq.q}
              </h3>
              <p className="text-sm text-[#111827]/70 leading-relaxed pl-6 font-light">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold overline-label text-[#111827] hover:text-gold transition-colors gold-underline">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
