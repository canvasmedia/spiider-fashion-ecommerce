import type { Metadata } from 'next';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { PromoStrip } from '@/components/PromoStrip';
import { CustomCursor } from '@/components/CustomCursor';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Spiider — Denim. Style. You.',
  description: 'Premium Indian fashion brand. Denim, Ethnic Wear, T-Shirts & Kids — one confident identity.',
  icons: {
    icon: '/logo.webp',
  },
  openGraph: {
    title: 'Spiider — Denim. Style. You.',
    description: 'Premium Indian fashion brand.',
    images: ['/logo.webp'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <PromoStrip />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
