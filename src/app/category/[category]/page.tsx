import { CATEGORY_META } from '@/lib/constants';
import CategoryClient from './CategoryClient';

export function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((c) => ({ category: c }));
}

export default function Page({ params }: { params: Promise<{ category: string }> }) {
  return <CategoryClient params={params} />;
}
