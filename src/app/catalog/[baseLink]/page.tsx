import ProductItem from '@/assets/components/Product/ProductItem';
import { Product, ProductVariant } from '@/assets/interfaces/ProductTypes';
import { notFound } from 'next/navigation';

async function fetchProducts() {
  const products = await import('@/assets/data/Products.json').then((mod) => mod.default);
  return products;
}

export default async function ProductPage({ params }: { params: Promise<{ baseLink: string }> }) {
  const { baseLink } = await params;
  const products = await fetchProducts();
  const product = products.find(
    (p: Product) => p.baseLink === baseLink || p.variants.some((v: ProductVariant) => v.link === baseLink),
  );

  if (!product) {
    notFound();
  }

  const initialVariants =
    product.variants.find((v: ProductVariant) => v.link === baseLink) || product.variants[0];

  return <ProductItem baseLink={baseLink} product={product} initialVariant={initialVariants} />;
}

export async function generateStaticParams() {
  const products = await import('@/assets/data/Products.json').then((mod) => mod.default);
  return products.flatMap((product: Product) => [
    { baseLink: product.baseLink },
    ...product.variants.map((variant: ProductVariant) => ({ baseLink: variant.link })),
  ]);
}
