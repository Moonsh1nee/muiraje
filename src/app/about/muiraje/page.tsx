import { Header } from '@/assets/components/Header';
import styles from '@/assets/styles/pages/MuirajePage.module.scss';
import Image from 'next/image';

export default function MuirajePage() {
  return (
    <div className={styles.muirajePageWrapper}>
      <Header
        nav="About Muiraje "
        link="/catalog"
        nameIcon="aboutMuiraje"
        width={43}
        height={45}
        color="pink"
      />
      <main className={styles.muirajePage}>
        <Image src="/img/about.png" alt="About Muiraje" width={1200} height={888} className={styles.muirajeImage} />
      </main>
    </div>
  );
}
