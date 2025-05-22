'use client';
import { useState, useEffect, useRef } from 'react';
import styles from '@/assets/styles/components/NavigationBar.module.scss';
import NavBarModal from './NavBarModal';

export default function NavigationBar() {
  const [activeModal, setActiveModal] = useState<'file' | 'about' | null>(null);
  const navigationRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    const category = target.textContent?.trim().toLowerCase() as 'file' | 'about';
    setActiveModal(activeModal === category ? null : category);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Проверяем, что клик не по кнопке навигации и не по модальному окну
      const isClickOnButton = target.closest(`.${styles.navigationItem}`);
      const isClickOnModal =
        target.closest('[class*="navigationModal"]') ||
        target.closest('[class*="navigationListModal"]') ||
        target.closest('[class*="navigationItemModal"]') ||
        target.closest('[class*="navigationLinkModal"]');

      if (!isClickOnButton && !isClickOnModal) {
        setActiveModal(null);
      }
    };

    if (activeModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeModal]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveModal(null);
      }
    };

    if (activeModal) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [activeModal]);

  return (
    <div className={styles.navigationBar} ref={navigationRef}>
      <nav>
        <ul className={styles.navigationList}>
          <li>
            <button
              className={`${styles.navigationItem} ${activeModal === 'file' ? styles.active : ''}`}
              onClick={handleMenuClick}>
              <span>F</span>ile
            </button>
            {activeModal === 'file' && <NavBarModal category="file" />}
          </li>
          <li>
            <button
              className={`${styles.navigationItem} ${activeModal === 'about' ? styles.active : ''}`}
              onClick={handleMenuClick}>
              <span>A</span>bout
            </button>
            {activeModal === 'about' && <NavBarModal category="about" />}
          </li>
        </ul>
      </nav>
      <div className={styles.divider}></div>
    </div>
  );
}
