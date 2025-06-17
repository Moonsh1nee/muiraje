import { Header } from '@/assets/components/Header';
import styles from '@/assets/styles/pages/DocumentsCommon.module.scss';

export default function DeliveryPage() {
  return (
    <div className={styles.background}>
      <div className={styles.page}>
        <div>
          <Header
            nav="Documents/Payment"
            link="/catalog"
            nameIcon="document"
            color="blue"
            width={29}
            height={44}
          />

          <main className={styles.mainContentPayment}>
            <h1 className={styles.titlePayment}>Оплата.</h1>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                Мы работаем по 100% предоплате. Отправка заказа возможна только после полной оплаты
                заказа.
              </li>
              <li className={styles.listItem}>
                Оплата возможна через систему быстрых платежей (СБП), а также с помощью
                онлайн-банков.
              </li>
            </ul>
          </main>
        </div>
      </div>
    </div>
  );
}
