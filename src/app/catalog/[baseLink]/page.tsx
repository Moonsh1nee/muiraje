import ProductItem from '@/assets/components/Product/ProductItem';
import { Product, ProductVariant } from '@/assets/interfaces/ProductTypes';

export default async function ProductPage({ params }: { params: Promise<{ baseLink: string }> }) {
  const { baseLink } = await params;
  return <ProductItem baseLink={baseLink} />;
}

export async function generateStaticParams() {
  const products = await import('@/assets/data/Products.json').then((mod) => mod.default);
  return products.flatMap((product: Product) => [
    { baseLink: product.baseLink },
    ...product.variants.map((variant: ProductVariant) => ({ baseLink: variant.link })),
  ]);
}