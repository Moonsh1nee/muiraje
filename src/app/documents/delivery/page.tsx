import { Header } from '@/assets/components/Header';
import styles from '@/assets/styles/pages/DocumentsCommon.module.scss';
import Link from 'next/link';

export default function DeliveryPage() {
  return (
    <div className={styles.background}>
      <div className={styles.page}>
        <div>
          <Header
            nav="Documents/Delivery"
            link="/catalog"
            nameIcon="document"
            color="blue"
            width={29}
            height={44}
          />

          <main className={styles.mainContent}>
            <h1 className={styles.title}>Доставка.</h1>
            <div className={styles.textContainer}>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  Доступны два способа доставки. Первый вариант - доставка через компанию СДЭК.
                  Стоимость доставки рассчитывается индивидуально, для оформления заказа понадобится
                  ваше ФИО, номер телефона и адрес выбранного пункта выдачи. При оформлении доставки{' '}
                  <Link href={`https://www.cdek.ru/ru`}>СДЭК</Link>, получение заказа происходит в
                  выбранном покупателем ПВЗ <Link href={`https://www.cdek.ru/ru`}>СДЭК</Link>.
                </li>
                <li className={styles.listItem}>
                  Второй способ - доставка курьерской службой &quot;Мьюражер&quot; (только по
                  Санкт-Петербургу). Стоимость доставки также рассчитывается индивидуально. Для
                  оформления заказа потребуется указать ФИО, номер телефона и адрес доставки. Также
                  необходимо предоставить информацию о времени и дате, когда вы сможете принять
                  заказ.
                </li>
              </ul>
              <p className={styles.text}>
                При сумме заказа от 12 424 рублей доставка осуществляется бесплатно, независимо от
                выбранного способа!
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
