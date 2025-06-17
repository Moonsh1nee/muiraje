'use client';

import Link from 'next/link';
import styles from '@/assets/styles/components/FooterMenu.module.scss';
import { useModalStore } from '@/assets/store/modalStore';
import { useEffect, useRef } from 'react';

export default function FooterMenu() {
  const { isOpen, closeModal } = useModalStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !target.closest('[data-footer-button]')
      ) {
        closeModal();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeModal]);

  return (
    <div
      ref={menuRef}
      className={styles.footerNavMenu + ' ' + (isOpen ? styles.footerNavMenuOpen : '')}>
      <nav className={styles.footerNav}>
        <div className={styles.footerNavLeftSide}>Muiraje 2024 Office</div>

        <div className={styles.footerNavLinks}>
          <Link href="/about/collection" className={styles.footerNavLink}>
            Muiraje: cozy home collection
          </Link>
          <Link href="" className={styles.footerNavLink + ' ' + styles.footerNavLinkDeactivated}>
            Muiraje: ????? collection
          </Link>
          <Link href="" className={styles.footerNavLink + ' ' + styles.footerNavLinkDeactivated}>
            Muiraje: ????? collection
          </Link>
        </div>

        <div className={styles.footerNavDivider}></div>

        <div className={styles.footerNavLinks}>
          <Link href="/documents/delivery" className={styles.footerNavLink}>
            Доставка
          </Link>
          <Link href="/documents/payment" className={styles.footerNavLink}>
            Оплата
          </Link>
          <Link href="/documents/contacts" className={styles.footerNavLink}>
            Контакты
          </Link>
          <Link href="/documents/offer" className={styles.footerNavLink}>
            Оферта и политика конфиденциальности
          </Link>
        </div>

        <div className={styles.footerNavDivider}></div>

        <div className={styles.footerNavLinks}>
          <Link href="/about/collection" className={styles.footerNavLink}>
            Office Gallery
          </Link>
          <Link href="" className={styles.footerNavLink + ' ' + styles.footerNavLinkDeactivated}>
            Office Vacancies
          </Link>
          <Link href="" className={styles.footerNavLink + ' ' + styles.footerNavLinkDeactivated}>
            Office Music
          </Link>
        </div>

        <div className={styles.footerNavDivider}></div>

        <div className={styles.footerNavLinks}>
          <Link href="/" className={styles.footerNavLink}>
            Завершить ночёвку
          </Link>
        </div>
      </nav>
    </div>
  );
}
