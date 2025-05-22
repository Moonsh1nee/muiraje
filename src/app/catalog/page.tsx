import { Header } from '@/assets/components/catalog/Header';
import NavigationBar from '@/assets/components/nav/NavigationBar';
import styles from '@/assets/styles/pages/Catalog.module.scss';

export default function Catalog() {
  return (
    <main className={styles.catalog}>
      <div className={styles.catalogWrapper}>
        <Header nav="" nameIcon="computer" />
        <NavigationBar />
      </div>
    </main>
  );
}
