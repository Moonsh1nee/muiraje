'use client';

import { Header } from '@/assets/components/Header';
import { useCartStore } from '@/assets/store/useCartStore';
import styles from '@/assets/styles/pages/Cart.module.scss';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function Cart() {
  const {
    cart,
    loadCart,
    totalPrice,
    totalQuantity,
    updateQuantity,
    removeFromCart,
    applyPromoCode,
    isPromoError,
    promoCode,
    resetPromoError,
  } = useCartStore();
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [showApplyButton, setShowApplyButton] = React.useState(false);
  const promoInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    loadCart();
    setIsHydrated(true);
  }, [loadCart]);

  const isCartEmpty = cart.length === 0;

  return (
    <div className={styles.cartWrapper}>
      <div>
        <Header nav="Your (Good) choice" link={'/catalog'} nameIcon={'cartPageIcon'} color="gray" />
        <main className={styles.cart}>
          <h1 className={styles.cartTitle}>Hi! It’s Your shopping cart.</h1>

          {isHydrated ? (
            <div className={styles.cartContent}>
              {isCartEmpty ? (
                <div className={styles.cartEmpty}>
                  <h2 className={styles.cartEmptyTitle}>Корзина пуста</h2>
                  <p className={styles.cartEmptyText}>
                    Вы можете добавить товары в корзину из каталога.
                  </p>
                  <Link href="/catalog" className={styles.cartEmptyLink}>
                    Перейти в каталог
                  </Link>
                </div>
              ) : (
                <>
                  <div className={styles.cartItems}>
                    {cart.map((item, index) => (
                      <article key={index} className={styles.cartItem}>
                        <button
                          className={styles.cartItemRemove}
                          onClick={() => removeFromCart(item)}>
                          <Image
                            src={'/img/cart/cross.svg'}
                            alt="Remove"
                            width={30}
                            height={30}
                            className={styles.cartItemRemoveIcon}
                          />
                        </button>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={100}
                          height={100}
                          className={styles.cartItemImage}
                        />
                        <div className={styles.cartItemWrapper}>
                          <div className={styles.cartItemDetails}>
                            <div className={styles.cartItemUpper}>
                              <h3 className={styles.cartItemTitle}>{item.name}</h3>
                              <div className={styles.cartItemDivider}>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                              </div>
                              <p className={styles.cartItemPrice}>{item.price} руб.</p>
                            </div>
                            <div className={styles.cartItemLower}>
                              <div className={styles.cartItemLowerDetails}>
                                {item.size && <p className={styles.cartItemSize}>{item.size}</p>}
                                {item.length && (
                                  <p className={styles.cartItemLength}>{item.length}</p>
                                )}
                                {item.color && <p className={styles.cartItemColor}>{item.color}</p>}
                              </div>
                              <div className={styles.cartItemQuantity}>
                                <button
                                  className={styles.cartItemQuantityButton}
                                  onClick={() => updateQuantity(item, item.quantity - 1)}
                                  disabled={item.quantity <= 1}>
                                  <Image
                                    src={'/img/cart/minus.svg'}
                                    alt="Minus"
                                    width={13}
                                    height={3}
                                    className={styles.cartItemQuantityIcon}
                                  />
                                </button>
                                <span className={styles.cartItemQuantityValue}>
                                  {item.quantity}
                                </span>
                                <button
                                  className={styles.cartItemQuantityButton}
                                  onClick={() => updateQuantity(item, item.quantity + 1)}>
                                  <Image
                                    src={'/img/cart/plus.svg'}
                                    alt="Plus"
                                    width={13}
                                    height={13}
                                    className={styles.cartItemQuantityIcon}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          {item.warning && (
                            <div className={styles.cartItemWarning}>
                              (Доставка только Мьюражером по Санкт-Петербургу.)
                            </div>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className={styles.cartItemTotalWrapper}>
                    <div className={styles.cartItemTotal}>
                      <div className={styles.cartItemTotalPromo}>
                        {isPromoError && (
                          <p className={styles.promoError}>
                            Указанный промокод не найден или недействителен :(
                          </p>
                        )}
                        <div>
                          <input
                            type="text"
                            placeholder="Есть промокод?)"
                            className={styles.cartItemPromoCode}
                            name="promoCode"
                            ref={promoInputRef}
                            id="promoCodeInput"
                            onChange={(e) => {
                              resetPromoError();
                              setShowApplyButton(e.target.value.length > 0);
                            }}
                            onFocus={() => setShowApplyButton(true)}
                          />
                          {showApplyButton && (
                            <button
                              className={`${styles.applyPromoButton} ${
                                promoCode ? styles.promoApplied : ''
                              }`}
                              onClick={() => {
                                if (promoInputRef.current?.value) {
                                  applyPromoCode(promoInputRef.current.value);
                                  setShowApplyButton(false);
                                  promoInputRef.current.value = '';
                                }
                              }}
                              disabled={isPromoError || !promoInputRef.current?.value}>
                              Активировать
                            </button>
                          )}
                        </div>
                      </div>
                      <div className={styles.cartItemTotalQuantity}>
                        <div>Товаров:</div>
                        <div>{totalQuantity} ед.</div>
                      </div>
                      <div className={styles.cartItemTotalPrice}>
                        <div>Итого:</div>
                        <div>{totalPrice.toLocaleString('ru-RU')} руб.</div>
                      </div>
                      <button className={styles.cartItemOffer}>
                        <Link href="/checkout">Оформить!</Link>
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div className={styles.cartItemBgWrapper}>
                <div className={styles.cartItemBgText}>– That&apos;s a good choice!</div>
                <Image
                  src={'/img/cart/bg.gif'}
                  alt="Cart Background"
                  className={styles.cartItemBgImage}
                  width={400}
                  height={400}
                />
              </div>
            </div>
          ) : (
            <div className={styles.cartLoading}></div>
          )}

          <div className={styles.cartFooter}>
            <div className={styles.cartFooterText}>
              <span>
                При сумме заказа от 12 424 рублей доставка осуществляется бесплатно, независимо от
                выбранного способа!
              </span>
            </div>
            <nav className={styles.cartFooterLinks}>
              <Link href="/catalog" className={styles.cartFooterLink}>
                Доставка
              </Link>
              <Link href="/catalog" className={styles.cartFooterLink}>
                Оплата
              </Link>
              <Link href="/catalog" className={styles.cartFooterLink}>
                Контакты
              </Link>
              <Link href="/catalog" className={styles.cartFooterLink}>
                Оферта и политика конфиденциальности
              </Link>
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
}
