import { Header } from '@/assets/components/catalog/Header';
import NavigationBar from '@/assets/components/nav/NavigationBar';
import styles from '@/assets/styles/pages/Catalog.module.scss';

export default function Catalog() {
  return (
    <main className={styles.catalog}>
      <div className={styles.catalogWrapper}>
        <div className="divider-top--bg"></div>
        <div className="divider-left--bg"></div>
        <div className="divider-right--dark-grey"></div>
        <div className="divider-bottom--dark-grey"></div>
        <div className="divider-top--white"></div>
        <div className="divider-left--white"></div>
        <div className="divider-right--dark-grey-2"></div>
        <div className="divider-bottom--dark-grey-2"></div>
        <Header nav="" nameIcon="computer" />
        <NavigationBar />
      </div>
    </main>
  );
}
