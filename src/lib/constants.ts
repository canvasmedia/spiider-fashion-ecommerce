// ── Brand color tokens ────────────────────────────────────────────────────────
export const COLORS = {
  black: '#111827',
  white: '#FFFFFF',
  offwhite: '#F7F6F3',
  gold: '#C9A227',
  goldLight: '#E8C766',
  goldDark: '#B8860B',
  blue: '#1E3A8A',
  sale: '#B3261E',
  shadow: 'rgba(17,24,39,0.10)',
} as const;

// ── WhatsApp ordering ─────────────────────────────────────────────────────────
export const WHATSAPP_NUMBER = '919876543210'; // Replace with actual number

export function buildWhatsAppUrl(productName: string, size: string, qty: number) {
  const msg = `Hi! I'd like to order:\n*Product:* ${productName}\n*Size:* ${size}\n*Qty:* ${qty}\n\nPlease confirm availability & price.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ── Motion constants ──────────────────────────────────────────────────────────
export const MOTION = {
  duration: {
    fast: 0.2,
    base: 0.35,
    slow: 0.5,
    verySlow: 0.8,
  },
  ease: {
    out: [0.16, 1, 0.3, 1] as [number, number, number, number],
    inOut: [0.76, 0, 0.24, 1] as [number, number, number, number],
    spring: { type: 'spring', stiffness: 300, damping: 30 },
    springGentle: { type: 'spring', stiffness: 200, damping: 40 },
  },
  stagger: {
    fast: 0.06,
    base: 0.08,
    slow: 0.12,
  },
} as const;

// ── Fade + rise variant (reused everywhere) ───────────────────────────────────
export const fadeRise = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION.duration.base, ease: MOTION.ease.out },
  },
};

export const fadeRiseContainer = (stagger = MOTION.stagger.base) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: 0.1 },
  },
});

// ── Navigation structure ──────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  {
    label: 'Denim',
    href: '/category/denim',
    mega: [
      { label: 'Jeans', href: '/category/denim/jeans' },
      { label: 'Jackets', href: '/category/denim/jackets' },
      { label: 'Co-ords', href: '/category/denim/coords' },
      { label: 'Shop All Denim', href: '/category/denim' },
    ],
  },
  {
    label: 'Ethnic Wear',
    href: '/category/ethnic',
    mega: [
      { label: 'Kurtas', href: '/category/ethnic/kurtas' },
      { label: 'Sherwanis', href: '/category/ethnic/sherwanis' },
      { label: 'Festive Edit', href: '/category/ethnic/festive' },
      { label: 'Wedding Edit', href: '/category/ethnic/wedding' },
      { label: 'Co-ords', href: '/category/ethnic/coords' },
    ],
  },
  {
    label: 'T-Shirts & Shirts',
    href: '/category/tshirts',
    mega: [
      { label: 'Casual Tees', href: '/category/tshirts/casual' },
      { label: 'Formal Shirts', href: '/category/tshirts/formal' },
      { label: 'Overshirts', href: '/category/tshirts/overshirts' },
    ],
  },
  {
    label: 'Kids',
    href: '/category/kids',
    mega: [
      { label: 'Kids Denim', href: '/category/kids/denim' },
      { label: 'Kids Ethnic', href: '/category/kids/ethnic' },
      { label: 'Kids Tees', href: '/category/kids/tees' },
    ],
  },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Sale', href: '/sale' },
] as const;

// ── WhatsApp contact for wholesale ────────────────────────────────────────────
export const WHOLESALE_WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I\'m interested in wholesale/bulk ordering from Spiider. Please share the catalogue and pricing.')}`;

// ── Full product catalogue ────────────────────────────────────────────────────
export const ALL_PRODUCTS = [
  // ── DENIM / JEANS ──────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Slim Fit Indigo Jeans',
    slug: 'slim-fit-indigo-jeans',
    category: 'denim',
    subcategory: 'Slim Fit',
    price: 2499,
    mrp: 3499,
    badge: 'bestseller',
    description: 'Crafted from premium 12oz selvedge denim, the Slim Fit Indigo Jeans are built for the long run. A tapered leg through the thigh with a narrow opening at the ankle — a silhouette that works from morning meetings to late evenings.',
    fabric: '100% Premium Cotton Selvedge Denim, 12oz',
    care: 'Machine wash cold, inside out. Do not tumble dry.',
    fit: 'Slim — true to size. We recommend your usual waist size.',
    sizes: ['28', '30', '32', '34', '36', '38'],
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/4937449/pexels-photo-4937449.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/7269746/pexels-photo-7269746.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/22748666/pexels-photo-22748666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    ],
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    hoverImage: 'https://images.pexels.com/photos/4937449/pexels-photo-4937449.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    rating: 4.8,
    reviewCount: 142,
  },
  {
    id: 2,
    name: 'Regular Fit Midnight Jeans',
    slug: 'regular-fit-midnight-jeans',
    category: 'denim',
    subcategory: 'Regular Fit',
    price: 2199,
    mrp: 2999,
    badge: 'new',
    description: 'Deep midnight wash with a clean, straight leg — a no-fuss pair that pairs effortlessly with everything from kurtas to tees. Made with mid-weight stretch denim that moves with you all day.',
    fabric: '98% Cotton, 2% Elastane Stretch Denim',
    care: 'Machine wash cold. Line dry.',
    fit: 'Regular — relaxed through the seat and thigh. True to size.',
    sizes: ['28', '30', '32', '34', '36'],
    images: [
      'https://images.pexels.com/photos/4937449/pexels-photo-4937449.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/7269746/pexels-photo-7269746.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    ],
    image: 'https://images.pexels.com/photos/4937449/pexels-photo-4937449.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    hoverImage: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: 3,
    name: 'Washed Denim Jacket',
    slug: 'washed-denim-jacket',
    category: 'denim',
    subcategory: 'Jackets',
    price: 3299,
    mrp: 4499,
    badge: 'bestseller',
    description: 'A wardrobe essential. This washed denim jacket has a broken-in feel from day one, with raw edges and contrast stitching that give it real character.',
    fabric: '100% Cotton Denim, Stone Washed',
    care: 'Machine wash cold. Do not bleach.',
    fit: 'Relaxed — size up for a layered, oversized look.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.pexels.com/photos/7269746/pexels-photo-7269746.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/22748666/pexels-photo-22748666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/4937449/pexels-photo-4937449.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    ],
    image: 'https://images.pexels.com/photos/7269746/pexels-photo-7269746.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    hoverImage: 'https://images.pexels.com/photos/22748666/pexels-photo-22748666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    rating: 4.7,
    reviewCount: 67,
  },
  // ── ETHNIC WEAR ────────────────────────────────────────────────────────────
  {
    id: 4,
    name: 'Royal Embroidered Kurta Set',
    slug: 'royal-embroidered-kurta-set',
    category: 'ethnic',
    subcategory: 'Festive',
    price: 3299,
    mrp: 4500,
    badge: 'new',
    description: 'Hand-embroidered chest panel, mandarin collar, and a relaxed A-line silhouette — this kurta set is made to be remembered. Perfect for Eid, Diwali, and wedding functions.',
    fabric: 'Premium Cotton Silk Blend with Zari Embroidery',
    care: 'Dry clean recommended. Hand wash gentle with cold water.',
    fit: 'Relaxed — true to size for a traditional drape.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.pexels.com/photos/37921733/pexels-photo-37921733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/37239052/pexels-photo-37239052.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/12686203/pexels-photo-12686203.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    ],
    image: 'https://images.pexels.com/photos/37921733/pexels-photo-37921733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    hoverImage: 'https://images.pexels.com/photos/37239052/pexels-photo-37239052.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    rating: 4.9,
    reviewCount: 203,
  },
  {
    id: 5,
    name: 'Printed Linen Kurta',
    slug: 'printed-linen-kurta',
    category: 'ethnic',
    subcategory: 'Casual Ethnic',
    price: 1899,
    mrp: 2599,
    badge: 'bestseller',
    description: 'Block-printed linen in a breathable, relaxed silhouette. This kurta bridges the gap between everyday casual and elevated ethnic dressing.',
    fabric: '100% Pure Linen with Block Print',
    care: 'Machine wash cold on gentle cycle. Iron on medium.',
    fit: 'Regular — true to size.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.pexels.com/photos/37239052/pexels-photo-37239052.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/37921733/pexels-photo-37921733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/12686203/pexels-photo-12686203.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    ],
    image: 'https://images.pexels.com/photos/37239052/pexels-photo-37239052.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    hoverImage: 'https://images.pexels.com/photos/37921733/pexels-photo-37921733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    rating: 4.7,
    reviewCount: 118,
  },
  {
    id: 6,
    name: 'Sherwani Festive Set',
    slug: 'sherwani-festive-set',
    category: 'ethnic',
    subcategory: 'Wedding',
    price: 5999,
    mrp: 8500,
    badge: 'festive',
    description: 'A full sherwani set built for celebrations. Rich brocade fabric, tone-on-tone embroidery — paired with churidar. Make every entrance count.',
    fabric: 'Art Silk Brocade with Gold Zardozi Work',
    care: 'Dry clean only.',
    fit: 'Tailored — size up if between sizes.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.pexels.com/photos/12686203/pexels-photo-12686203.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/37921733/pexels-photo-37921733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/37239052/pexels-photo-37239052.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    ],
    image: 'https://images.pexels.com/photos/12686203/pexels-photo-12686203.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    hoverImage: 'https://images.pexels.com/photos/37921733/pexels-photo-37921733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    rating: 4.9,
    reviewCount: 54,
  },
  // ── T-SHIRTS & SHIRTS ──────────────────────────────────────────────────────
  {
    id: 7,
    name: 'Essential White Tee',
    slug: 'essential-white-tee',
    category: 'tshirts',
    subcategory: 'Casual Tees',
    price: 999,
    mrp: 1499,
    badge: 'bestseller',
    description: 'The one tee you\'ll reach for every single day. 240gsm pima cotton jersey, pre-washed to prevent shrinkage. A relaxed, premium feel without sacrificing structure.',
    fabric: '240gsm 100% Pima Cotton Jersey',
    care: 'Machine wash warm. Tumble dry low.',
    fit: 'Relaxed — true to size.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.pexels.com/photos/26546833/pexels-photo-26546833.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/20766289/pexels-photo-20766289.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/30005113/pexels-photo-30005113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    ],
    image: 'https://images.pexels.com/photos/26546833/pexels-photo-26546833.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    hoverImage: 'https://images.pexels.com/photos/20766289/pexels-photo-20766289.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    rating: 4.8,
    reviewCount: 312,
  },
  {
    id: 8,
    name: 'Oxford Formal Shirt',
    slug: 'oxford-formal-shirt',
    category: 'tshirts',
    subcategory: 'Formal Shirts',
    price: 1799,
    mrp: 2499,
    badge: 'new',
    description: 'Woven from fine Oxford cotton with a button-down collar, this shirt bridges smart casual and boardroom formal. Mother-of-pearl buttons add subtle refinement.',
    fabric: '100% Oxford Cotton Weave',
    care: 'Machine wash cold. Iron on medium heat.',
    fit: 'Slim — size up for a relaxed look.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.pexels.com/photos/30005113/pexels-photo-30005113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/26546833/pexels-photo-26546833.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/20766289/pexels-photo-20766289.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    ],
    image: 'https://images.pexels.com/photos/30005113/pexels-photo-30005113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    hoverImage: 'https://images.pexels.com/photos/26546833/pexels-photo-26546833.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    rating: 4.6,
    reviewCount: 76,
  },
  {
    id: 9,
    name: 'Graphic Drop Tee',
    slug: 'graphic-drop-tee',
    category: 'tshirts',
    subcategory: 'Casual Tees',
    price: 1199,
    mrp: 1799,
    badge: 'new',
    description: 'A heavyweight oversized tee with bold front graphic and contrast sleeve tape. Drop shoulders, boxy silhouette, ribbed crew neck — the streetwear staple done right.',
    fabric: '280gsm Heavyweight Cotton Jersey',
    care: 'Machine wash cold, inside out. Air dry.',
    fit: 'Oversized — true to size or size down for a standard fit.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.pexels.com/photos/20766289/pexels-photo-20766289.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/30005113/pexels-photo-30005113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/26546833/pexels-photo-26546833.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    ],
    image: 'https://images.pexels.com/photos/20766289/pexels-photo-20766289.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    hoverImage: 'https://images.pexels.com/photos/30005113/pexels-photo-30005113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    rating: 4.5,
    reviewCount: 94,
  },
  // ── KIDS ────────────────────────────────────────────────────────────────────
  {
    id: 10,
    name: 'Kids Denim Jacket',
    slug: 'kids-denim-jacket',
    category: 'kids',
    subcategory: 'Kids Denim',
    price: 1299,
    mrp: 1799,
    badge: 'new',
    description: 'A mini version of the grown-up classic. Durable, stretchy, and machine-washable for the wear it gets on the playground.',
    fabric: '100% Cotton Denim',
    care: 'Machine wash cold.',
    fit: 'Regular — true to age size.',
    sizes: ['2Y', '4Y', '6Y', '8Y', '10Y'],
    images: [
      'https://images.pexels.com/photos/33123753/pexels-photo-33123753.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
      'https://images.pexels.com/photos/29214428/pexels-photo-29214428.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    ],
    image: 'https://images.pexels.com/photos/33123753/pexels-photo-33123753.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    hoverImage: 'https://images.pexels.com/photos/29214428/pexels-photo-29214428.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
    rating: 4.7,
    reviewCount: 41,
  },
];

// ── Products map by slug (detail page lookup) ─────────────────────────────────
export const PRODUCTS_BY_SLUG = Object.fromEntries(
  ALL_PRODUCTS.map(p => [p.slug, p])
);

// ── Legacy BESTSELLERS alias ──────────────────────────────────────────────────
export const BESTSELLERS = ALL_PRODUCTS.slice(0, 4);

export const CATEGORIES = [
  {
    key: 'denim',
    label: 'Denim',
    tagline: 'Crafted for the long run.',
    href: '/category/denim',
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    ctaVariant: 'blue' as const,
  },
  {
    key: 'ethnic',
    label: 'Ethnic Wear',
    tagline: 'Rooted in tradition. Worn with pride.',
    href: '/category/ethnic',
    image: 'https://images.pexels.com/photos/37921733/pexels-photo-37921733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    ctaVariant: 'gold' as const,
  },
  {
    key: 'tshirts',
    label: 'Tees & Shirts',
    tagline: 'Everyday. Everywhere.',
    href: '/category/tshirts',
    image: 'https://images.pexels.com/photos/30005113/pexels-photo-30005113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    ctaVariant: 'gold' as const,
  },
  {
    key: 'kids',
    label: 'Kids',
    tagline: 'Style starts young.',
    href: '/category/kids',
    image: 'https://images.pexels.com/photos/29214428/pexels-photo-29214428.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    ctaVariant: 'gold' as const,
  },
];

export const UGC_IMAGES = [
  'https://images.pexels.com/photos/7269746/pexels-photo-7269746.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500',
  'https://images.pexels.com/photos/22748666/pexels-photo-22748666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500',
  'https://images.pexels.com/photos/37797943/pexels-photo-37797943.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500',
  'https://images.pexels.com/photos/12686203/pexels-photo-12686203.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500',
  'https://images.pexels.com/photos/37239052/pexels-photo-37239052.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500',
  'https://images.pexels.com/photos/37797943/pexels-photo-37797943.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500',
];

// ── Category sections for homepage (3 products each) ─────────────────────────
export const CATEGORY_SECTIONS = [
  {
    key: 'denim',
    label: 'Jeans & Denim',
    tagline: 'Crafted for the long run.',
    href: '/category/denim',
    accentColor: '#1E3A8A',
    products: ALL_PRODUCTS.filter(p => p.category === 'denim').slice(0, 3),
  },
  {
    key: 'ethnic',
    label: 'Ethnic Wear',
    tagline: 'Rooted in tradition. Worn with pride.',
    href: '/category/ethnic',
    accentColor: '#C9A227',
    products: ALL_PRODUCTS.filter(p => p.category === 'ethnic').slice(0, 3),
  },
  {
    key: 'tshirts',
    label: 'T-Shirts & Shirts',
    tagline: 'Everyday. Everywhere.',
    href: '/category/tshirts',
    accentColor: '#C9A227',
    products: ALL_PRODUCTS.filter(p => p.category === 'tshirts').slice(0, 3),
  },
];

