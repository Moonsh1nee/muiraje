'use client';

import styles from '@/assets/styles/components/Header.module.scss';
import Icon, { IconName } from './Icon';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  nav: string;
  link?: string;
  nameIcon: IconName;
}

export const Header = ({ nav, link, nameIcon }: HeaderProps) => {
  const router = useRouter();

  const clickRedirect = () => {
    router.push(link || '/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Icon name={nameIcon} width={37} />
        <div className={styles.logoText}>
          <h1 className={styles.logoTitle}>
            <span>M</span>uiraje
          </h1>
          <div className={styles.logoSupTitle}>8+8+8</div>
          {nav && <div className={styles.logoNav}>{nav}</div>}
        </div>
      </div>
      <div className={styles.headerButtons}>
        <button className={styles.headerButton}>
          <div className={styles.headerButtonTop}>
            <div className={styles.headerButtonContent}>
              <Icon name="btnRoll" width={21} height={6} />
            </div>
          </div>
        </button>
        <button className={styles.headerButton}>
          <div className={styles.headerButtonTop}>
            <div className={styles.headerButtonContent}>
              <Icon name="btnFullScreen" width={25} height={25} />
            </div>
          </div>
        </button>
        <button className={styles.headerButton} onClick={clickRedirect}>
          <div className={styles.headerButtonTop}>
            <div className={styles.headerButtonContent}>
              <Icon name="btnCross" width={25} height={24} />
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};
