import { pgTable, serial, text, integer, decimal, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const categoryEnum = pgEnum('category', ['denim', 'ethnic', 'tshirts', 'kids']);
export const badgeEnum = pgEnum('badge', ['new', 'bestseller', 'sale', 'festive']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  category: categoryEnum('category').notNull(),
  subcategory: text('subcategory'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  mrp: decimal('mrp', { precision: 10, scale: 2 }),
  images: text('images').array().notNull().default([]),
  badge: badgeEnum('badge'),
  description: text('description'),
  sizes: text('sizes').array().default([]),
  colors: text('colors').array().default([]),
  fabric: text('fabric'),
  occasion: text('occasion'),
  fit: text('fit'),
  inStock: boolean('in_stock').default(true),
  stockCount: integer('stock_count').default(100),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('4.5'),
  reviewCount: integer('review_count').default(0),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id),
  author: text('author').notNull(),
  rating: integer('rating').notNull(),
  title: text('title'),
  body: text('body').notNull(),
  photoUrl: text('photo_url'),
  verified: boolean('verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const wishlistItems = pgTable('wishlist_items', {
  id: serial('id').primaryKey(),
  sessionId: text('session_id').notNull(),
  productId: integer('product_id').references(() => products.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const cartItems = pgTable('cart_items', {
  id: serial('id').primaryKey(),
  sessionId: text('session_id').notNull(),
  productId: integer('product_id').references(() => products.id),
  size: text('size').notNull(),
  quantity: integer('quantity').notNull().default(1),
  createdAt: timestamp('created_at').defaultNow(),
});

export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});
