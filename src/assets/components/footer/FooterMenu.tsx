import Link from 'next/link';
import styles from '@/assets/styles/components/FooterMenu.module.scss';

export default function FooterMenu() {
  return (
    <div className={styles.footerNavMenu}>
      <nav className={styles.footerNav}>
        <div className={styles.footerNavLeftSide}>Muiraje 2024 Office</div>

        <div className={styles.footerNavLinks}>
          <Link href="" className={styles.footerNavLink}>
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
          <Link href="" className={styles.footerNavLink}>
            Доставка
          </Link>
          <Link href="" className={styles.footerNavLink}>
            Оплата
          </Link>
          <Link href="" className={styles.footerNavLink}>
            Контакты
          </Link>
          <Link href="" className={styles.footerNavLink}>
            Оферта и политика конфиденциальности
          </Link>
        </div>

        <div className={styles.footerNavDivider}></div>

        <div className={styles.footerNavLinks}>
          <Link href="" className={styles.footerNavLink}>
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
          <Link href="" className={styles.footerNavLink}>
            Завершить ночёвку
          </Link>
        </div>
      </nav>
    </div>
  );
}
