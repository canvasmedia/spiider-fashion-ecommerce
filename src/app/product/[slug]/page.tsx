import { ALL_PRODUCTS } from '@/lib/constants';
import ProductClient from './ProductClient';

export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <ProductClient params={params} />;
}
