'use client';

import styles from '@/assets/styles/components/CatalogItems.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useProductStore } from '@/assets/store/useProductStore';
import { useCategoryStore } from '@/assets/store/useCategoryStore';

export default function CatalogItems() {
  const { products, loadProducts } = useProductStore();
  const { currentCategory } = useCategoryStore();

  React.useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, [products.length, loadProducts]);

  const filteredProducts =
    currentCategory === 'All'
      ? products
      : products.filter((item) => item.category === currentCategory);

  return (
    <div className={styles.catalogItems}>
      <div className={styles.catalogItemsWrapper}>
        {filteredProducts.map((item) => (
          <article key={item.id} className={styles.catalogItem}>
            <Link href={`/catalog/${item.baseLink}`} className={styles.catalogItemLink}>
              <div className={styles.catalogItemImageWrapper}>
                <Image
                  src={item.src}
                  alt={item.name}
                  className={styles.catalogItemImage}
                  width={320}
                  height={384}
                />
                <Image
                  src={item.srcHover ? item.srcHover : item.src}
                  alt={item.name}
                  className={styles.catalogItemImageHover}
                  width={320}
                  height={384}
                />
              </div>
              <div className={styles.catalogItemText}>
                <h2 className={styles.catalogItemTitle}>{item.name}</h2>
                <div className={styles.catalogItemPrice}>{item.price} руб.</div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
