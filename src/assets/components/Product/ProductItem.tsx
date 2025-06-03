'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useProductStore } from '@/assets/store/useProductStore';

export default function ProductItem({ baseLink }: { baseLink: string }) {
  const { products, isLoading, error, getProductByBaseLink, loadProducts } = useProductStore();
  const product = getProductByBaseLink(baseLink);
  console.log('ProductItem rendered with baseLink:', baseLink);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  console.log(!isLoading, !error, products.length, product);
  useEffect(() => {
    if (products.length === 0 && !isLoading && !error) {
      loadProducts();
    }
  }, [products.length, isLoading, error, loadProducts, baseLink]);

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      console.log('Setting initial variant for product:', product);
      setSelectedVariant(product.variants[0].link);
    }
  }, [product]);

  if (isLoading) {
    console.log('Still loading products...');
    return <div>Загрузка товаров...</div>;
  }

  if (error || !product) {
    console.error('Error or product not found:', { error, baseLink, product });
    return notFound();
  }

  const currentVariant =
    product.variants?.find((v) => v.link === selectedVariant) || product.variants?.[0];

  if (!currentVariant) {
    console.error('Variant not found for product:', product);
    return <div>Вариант не найден</div>;
  }

  console.log('Rendering product:', product);
  console.log('Current variant:', currentVariant);

  return <div>Test</div>;
}
