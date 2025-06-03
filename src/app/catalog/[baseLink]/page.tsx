import ProductItem from '@/assets/components/Product/ProductItem';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: Promise<{ baseLink: string }> }) {
  const { baseLink } = await params;
  const products = await import('@/assets/data/Products.json').then((mod) => mod.default);
  const product = products.find((p) => p.baseLink === baseLink);
  if (!product) {
    notFound();
  }
  return <ProductItem baseLink={baseLink} />;
}

export async function generateStaticParams() {
  const products = await import('@/assets/data/Products.json').then((mod) => mod.default);
  return products.map((product) => ({
    baseLink: product.baseLink,
  }));
}
