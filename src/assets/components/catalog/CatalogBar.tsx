'use client';

import Image from 'next/image';
import styles from '@/assets/styles/components/CatalogBar.module.scss';
import CategoryData from '@/assets/data/CatalogCategory.json';
import { useEffect, useRef, useState } from 'react';
import { useCartStore } from '@/assets/store/useCartStore';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const CartIcon = dynamic(
  () =>
    Promise.resolve(({ isCartEmpty }: { isCartEmpty: boolean }) => (
      <div className={styles.catalogItem}>
        <button className={styles.catalogItemWrapper}>
          <div>
            <Link href={'/cart'} className={styles.catalogItemLink}>
              <Image
                className={styles.catalogItemImage}
                src={isCartEmpty ? '/img/catalog/trash.png' : '/img/catalog/trashFull.png'}
                alt={isCartEmpty ? 'Корзина пуста' : 'Корзина с товарами'}
                width={46}
                height={96}
              />
            </Link>
          </div>
        </button>
        <span className={styles.catalogItemText}>Корзина</span>
      </div>
    )),
  { ssr: false },
);

export default function CatalogBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const catalogBarRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { cart, loadCart } = useCartStore();

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        catalogBarRef.current &&
        !catalogBarRef.current.querySelector(`.${styles.catalogBarMenu}`)?.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

  const isCartEmpty = cart.length === 0;

  const renderCatalogItem = (
    item: (typeof CategoryData)[0],
    index: number,
    isMobile: boolean = false,
  ) => (
    <li key={index} className={styles.catalogItem}>
      <button
        className={styles.catalogItemWrapper}
        onClick={isMobile ? handleMenuItemClick : undefined}>
        <div>
          <Image
            className={styles.catalogItemImage}
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
          />
        </div>
      </button>
      <span className={styles.catalogItemText}>{item.text}</span>
    </li>
  );

  return (
    <div className={styles.catalogBar} ref={catalogBarRef}>
      <div className={styles.catalogBarMenuWrapper}>
        <button className={styles.catalogBarMenu} onClick={handleMenuClick}>
          <div className={styles.catalogBarMenuItem}>
            <div></div>
          </div>
          <div className={styles.catalogBarMenuItem}>
            <div></div>
          </div>
          <div className={styles.catalogBarMenuItem}>
            <div></div>
          </div>
        </button>
      </div>

      <ul className={styles.catalogList}>
        {CategoryData.map((item, index) => renderCatalogItem(item, index, false))}
      </ul>

      <CartIcon isCartEmpty={isCartEmpty} />

      <div
        ref={mobileMenuRef}
        className={`${styles.catalogBarMobile} ${isMobileMenuOpen ? styles.catalogBarActive : ''}`}>
        <ul className={styles.catalogListMobile}>
          {CategoryData.map((item, index) => renderCatalogItem(item, index, true))}
        </ul>
      </div>
    </div>
  );
}
