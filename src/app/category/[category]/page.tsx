import CategoryClient from './CategoryClient';

export function generateStaticParams() {
  const categories = ['denim', 'ethnic', 'tshirts', 'kids'];
  return categories.map((c) => ({ category: c }));
}

export default function Page({ params }: { params: Promise<{ category: string }> }) {
  return <CategoryClient params={params} />;
}
