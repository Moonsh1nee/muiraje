'use client';

import { Header } from '@/assets/components/Header';
import { useCartStore } from '@/assets/store/useCartStore';
import styles from '@/assets/styles/pages/Offer.module.scss';
import Link from 'next/link';
import React from 'react';

export default function Offer() {
  const { totalPrice, loadCart, cart } = useCartStore();
  const [orderNumber, setOrderNumber] = React.useState<number | null>(null);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    delivery: 'pickup',
    comment: '',
  });
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    loadCart();
  }, [loadCart]);

  const deliveryCost = formData.delivery === 'pickup' ? 224 : 424;
  const isFreeDelivery = totalPrice >= 12424;
  const finalDeliveryCost = isFreeDelivery ? 0 : deliveryCost;
  const finalTotal = totalPrice + finalDeliveryCost;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      const response = await fetch('/api/sendToTelegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          finalTotal,
          cart,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitStatus('success');
        setOrderNumber(data.orderNumber);
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          delivery: 'pickup',
          comment: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className={styles.offer}>
      <div className={styles.offerContent}>
        <div>
          <Header
            nav="Your order"
            link="/cart"
            nameIcon="phone"
            color="gray"
            width={29}
            height={44}
          />
          {!orderNumber ? (
            <main className={styles.offerMain}>
              <form onSubmit={handleSubmit} className={styles.offerForm}>
                <h2 className={styles.offerTitle}>Who are you?</h2>
                <div className={styles.offerFormGroup}>
                  <div className={styles.offerInputGroup}>
                    <label htmlFor="name" className={styles.offerLabel}>
                      Получатель (ФИО полностью)*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={styles.offerInput}
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.offerInputGroup}>
                    <label htmlFor="email" className={styles.offerLabel}>
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={styles.offerInput}
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.offerInputGroup}>
                    <label htmlFor="phone" className={styles.offerLabel}>
                      Телефон*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={styles.offerInput}
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <h2 className={styles.offerTitle}>Delivery.</h2>

                <div className={styles.offerFormGroup}>
                  <div className={styles.offerInputGroup}>
                    <label htmlFor="address" className={styles.offerLabel}>
                      Выберите пункт получения СДЭК*
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className={styles.offerInput}
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.customRadioGroup}>
                    <div className={styles.customRadio}>
                      <input
                        type="radio"
                        id="pickup"
                        name="delivery"
                        value="pickup"
                        checked={formData.delivery === 'pickup'}
                        onChange={handleInputChange}
                        className={styles.customRadioInput}
                      />
                      <label htmlFor="pickup" className={styles.customRadioLabel}>
                        <div className={styles.customRadioButton}>
                          <div></div>
                        </div>
                        <div className={styles.customRadioContent}>
                          <span className={styles.offerRadioText}>Самовывоз СДЭК (по России)</span>
                          <span className={styles.offerRadioDescription}>
                            от 2 дней, от 224 руб.
                          </span>
                        </div>
                      </label>
                    </div>

                    <div className={styles.customRadio}>
                      <input
                        type="radio"
                        id="delivery"
                        name="delivery"
                        value="delivery"
                        checked={formData.delivery === 'delivery'}
                        onChange={handleInputChange}
                        className={styles.customRadioInput}
                      />
                      <label htmlFor="delivery" className={styles.customRadioLabel}>
                        <div className={styles.customRadioButton}>
                          <div></div>
                        </div>
                        <div className={styles.customRadioContent}>
                          <span className={styles.offerRadioText}>
                            Мьюражер (по Санкт-Петербургу)
                          </span>
                          <span className={styles.offerRadioDescription}>424 руб.</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <h2 className={styles.offerTitle}>That&apos;s right!</h2>

                <div className={styles.offerFormGroupArea}>
                  <div className={styles.offerInputGroup}>
                    <label htmlFor="comment" className={styles.offerLabel}>
                      Комментарий к заказу
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      className={styles.offerTextarea}
                      rows={3}
                      value={formData.comment}
                      onChange={handleInputChange}></textarea>
                  </div>
                  <p className={styles.offerTotal}>
                    Сумма: {totalPrice.toLocaleString('ru-RU')} руб.
                  </p>
                  <p className={styles.offerTotal}>
                    {formData.delivery === 'pickup' ? 'Самовывоз СДЭК' : 'Мьюражер'}:{' '}
                    {isFreeDelivery
                      ? 'Бесплатно'
                      : `${finalDeliveryCost.toLocaleString('ru-RU')} руб.`}
                  </p>
                  <p className={styles.offerTotal}>
                    {formData.address || 'Укажите адрес доставки'}
                  </p>
                  <p className={styles.offerTotal}>
                    Итоговая сумма: {finalTotal.toLocaleString('ru-RU')} руб.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  className={styles.offerButton}>
                  {submitStatus === 'sending' ? 'Отправка...' : 'Подтвердить заказ'}
                </button>

                {submitStatus === 'error' && (
                  <p className={styles.offerError}>Ошибка отправки. Попробуйте снова.</p>
                )}

                <p className={styles.offerText}>
                  Оформляя заказ вы соглашаетесь с{' '}
                  <Link href="/documents/offer#terms" className={styles.offerLink}>
                    договором оферты
                  </Link>{' '}
                  и{' '}
                  <Link href="/documents/offer#privacy" className={styles.offerLink}>
                    политикой конфиденциальности
                  </Link>
                  .
                </p>
              </form>
            </main>
          ) : (
            <div className={styles.offerSuccess}>
              <h2 className={styles.offerSuccessTitle}>
                It worked, yay!
                <br />
                Here&apos;s your order number:
              </h2>
              <p className={styles.offerSuccessOrderNumber}>{orderNumber}</p>
              <h2 className={styles.offerSuccessTitle}>
                Скоро с вами свяжется Care для уточнения деталей в Telegeram! :)
              </h2>
              <Link
                href="https://t.me/care224radge"
                target="_blank"
                className={styles.offerSuccessLink}>
                https://t.me/care224radge
              </Link>
            </div>
          )}
        </div>
      </div>
      {!orderNumber && (
        <p className={styles.offerText}>
          При сумме заказа от 12 424 рублей доставка осуществляется бесплатно, независимо от
          выбранного способа!
          <br /> После подтверждения заказа с вами свяжется{' '}
          <Link href="https://t.me/care224radge" target="_blank" className={styles.offerLinkFooter}>
            Care
          </Link>{' '}
          для уточнения деталей! :)
        </p>
      )}
    </div>
  );
}
