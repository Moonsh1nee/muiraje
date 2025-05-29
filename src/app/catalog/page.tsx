import CatalogBar from '@/assets/components/catalog/CatalogBar';
import CatalogItems from '@/assets/components/catalog/CatalogItems';
import Footer from '@/assets/components/footer/Footer';
import FooterMenu from '@/assets/components/footer/FooterMenu';
import { Header } from '@/assets/components/Header';
import NavigationBar from '@/assets/components/nav/NavigationBar';
import styles from '@/assets/styles/pages/Catalog.module.scss';

export default function Catalog() {
  return (
    <>
      <main className={styles.catalog}>
        <div className={styles.catalogWrapper}>
          <Header nav="" link="/" nameIcon="computer" />
          <NavigationBar />
          <CatalogBar />
          <CatalogItems />
          <FooterMenu />
        </div>
      </main>

      <Footer />
    </>
  );
}
