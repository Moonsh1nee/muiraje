import Image from 'next/image';
import Link from 'next/link';
import mainGirls from '@/assets/img/welcome/main_girls.webp';
import styles from '@/assets/styles/pages/welcome.module.scss';

export default function Welcome() {
  return (
    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <Image
          src={mainGirls}
          className={styles.mainImg}
          alt="Main girls welcoming to the office sleepover"
          priority
        />
        <Link className={styles.mainLink} href="/catalog">
          <h1 className={styles.title}>
            Click to join the office sleepover.
          </h1>
        </Link>
      </div>
    </main>
  );
}
