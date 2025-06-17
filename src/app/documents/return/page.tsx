import { Header } from '@/assets/components/Header';
import styles from '@/assets/styles/pages/Return.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function ReturnPage() {
  return (
    <div className={styles.returnPage}>
      <div className={styles.returnPageContent}>
        <div>
          <Header
            nav="Documents/Returns"
            link="/cart"
            nameIcon="document"
            color="blue"
            width={29}
            height={44}
          />
          <main className={styles.mainContentReturn}>
            <div>
              <h1 className={styles.titleReturn}>Возврат.</h1>
              <div className={styles.textWrapper}>
                <p className={styles.textReturn}>
                  На данный момент возврат товара возможен только в случае, если товар был в наличии
                  и не требовал ожидания при покупке. Если товар нуждался в ожидании, к сожалению,
                  возврат невозможен, так как такие товары производятся под заказ и могут требовать
                  до 3 недель на изготовление.
                </p>
                <p className={styles.textReturn}>
                  Если вам был доставлен товар ненадлежащего качества, то вы имеете право отказаться
                  от него в течение 8 календарных дней после получения, при условии, что ошибка не
                  была вызвана вашей стороной. 
                </p>
                <p className={styles.textReturn}>
                  Товары, поставляемые в комплекте, необходимо возвращать в том же комплекте. При
                  возврате товаров надлежащего качества стоимость доставки и комиссия за перевод
                  платежа не возмещаются. Возврату не подлежат товары надлежащего качества, согласно
                  Постановлению Правительства РФ от 19 января 1998 г. N 55.
                </p>
                <p>
                  Для возврата товара Вы можете обратиться в поддержку сайта:{' '}
                  <Link href="https://t.me/care224radge" className={styles.link}>
                    @care224radge
                  </Link>
                </p>
              </div>
            </div>
            <div className={styles.bgWrapper}>
              <Image
                src="/img/returns/bg.gif"
                alt="Return Background"
                width={600}
                height={689}
                className={styles.bgImage}
              />
              <div className={styles.textOverlay}>
                – Hi, my name is Care, I can help you. Contact me.
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
