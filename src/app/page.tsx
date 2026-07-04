import { Hero } from '@/components/Hero';
import { CategoryTiles } from '@/components/CategoryTiles';
import { CategoryProducts } from '@/components/CategoryProducts';
import { TradeSections } from '@/components/TradeSections';
import { BrandStory } from '@/components/BrandStory';
import { KidsTeaser } from '@/components/KidsTeaser';
import { SocialProof } from '@/components/SocialProof';
import { Newsletter } from '@/components/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryTiles />
      <CategoryProducts />
      <TradeSections />
      <BrandStory />
      <KidsTeaser />
      <SocialProof />
      <Newsletter />
    </>
  );
}
