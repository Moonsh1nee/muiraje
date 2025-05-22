import styles from '@/assets/styles/components/NavBarModal.module.scss';
import data from '@/assets/data/NavBarModal.json';
import Link from 'next/link';

interface NavBarModalProps {
  category: 'file' | 'about';
}

export default function NavBarModal({ category }: NavBarModalProps) {
  const navBarData = data[category];
  const navBarArray = Object.values(navBarData);

  return (
    <div className={styles.navigationModal}>
      <ul className={styles.navigationListModal}>
        {navBarArray.map((item, index) => (
          <li key={index} className={styles.navigationItemModal}>
            <Link href={item.url} className={styles.navigationLinkModal + (item.active ? ` ${styles.active}` : '')}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}