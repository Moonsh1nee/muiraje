import { Header } from '@/assets/components/Header';
import styles from '@/assets/styles/pages/Site.module.scss';
import Link from 'next/link';

export default function Site() {
  return (
    <div className={styles.site}>
      <Header
        nav="About Site"
        link="/catalog"
        nameIcon="computer"
        width={27}
        height={32}
        color="gray"
      />
      <main className={styles.siteWrapper}>
        <ul>
          <li>
            Designer: <Link href="https://t.me/mymiradg">Muiraje</Link>
          </li>
          <li>
            Frontend Developer: <Link href="https://t.me/Moonsh1ne_OP">Moonsh1ne</Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
