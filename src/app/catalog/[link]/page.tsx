import ProductItem from '@/assets/components/catalog/ProductItem';
import data from '@/assets/data/ProductItem.json';
import CatalogItems from '@/assets/data/CatalogItems.json';
import { notFound } from 'next/navigation';

type ProductPageProps = {
  params: Promise<{ link: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { link } = await params;
  const product = data.find((item) => item.link === link);

  if (!product) {
    notFound();
  }
  return <ProductItem product={product} />;
}

export async function generateStaticParams() {
  return CatalogItems.map((item) => ({
    link: item.link,
  }));
}
