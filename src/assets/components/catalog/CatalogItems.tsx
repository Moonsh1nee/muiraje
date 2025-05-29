import styles from '@/assets/styles/components/CatalogItems.module.scss';
import Image from 'next/image';
import catalogItems from '@/assets/data/CatalogItems.json';
import Link from 'next/link';

export default function CatalogItems() {
  return (
    <div className={styles.catalogItems}>
      <div className={styles.catalogItemsWrapper}>
        {catalogItems.map((item) => (
          <article key={item.id} className={styles.catalogItem}>
            <Link href={`/catalog/${item.link}`} className={styles.catalogItemLink}>
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
