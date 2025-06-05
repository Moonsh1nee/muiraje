'use client';

import { Product, ProductVariant } from '@/assets/interfaces/ProductTypes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import styles from '@/assets/styles/components/ProductItem.module.scss';
import { Header } from '../Header';

interface ProductItemProps {
  baseLink: string;
  product: Product;
  initialVariant: ProductVariant;
}

export default function ProductItem({ baseLink, product, initialVariant }: ProductItemProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleVariantChange = (variantLink: string) => {
    router.push(`/catalog/${variantLink}`);
  };

  // Переключение на предыдущее изображение
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? (initialVariant.img?.length || 1) - 1 : prev - 1));
  };

  // Переключение на следующее изображение
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === (initialVariant.img?.length || 1) - 1 ? 0 : prev + 1));
  };

  // Переключение по клику на миниатюру
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <main className={styles.productItem}>
        <Header
          nav={`Catalog/${product.baseLink}`}
          link={'/catalog'}
          nameIcon="people"
          color="gray"
        />
        <div className={styles.productItemWrapper}>
          {initialVariant.name && (
            <h1 className={styles.productItemTitle}>{initialVariant.name}</h1>
          )}

          <div className={styles.productItemContent}>
            <div className={styles.productItemCarousel}>
              <div className={styles.carouselMain}>
                <button
                  className={styles.carouselButton}
                  onClick={handlePrevImage}
                  disabled={!initialVariant.img || initialVariant.img.length <= 1}>
                  <Image src={'/img/icons/arrLeft.svg'} alt="Previous" width={24} height={24} />
                </button>
                <div className={styles.carouselMainImage}>
                  {Array.isArray(initialVariant.img) && initialVariant.img.length > 0 ? (
                    <Image
                      src={initialVariant.img[currentImageIndex]}
                      alt={`${product.name} - ${currentImageIndex + 1}`}
                      className={styles.productItemImage}
                      width={4096}
                      height={4096}
                      priority={currentImageIndex === 0}
                    />
                  ) : (
                    <Image
                      src="/img/fallback.png"
                      alt={product.name}
                      className={styles.productItemImage}
                      width={4096}
                      height={4096}
                    />
                  )}
                </div>
                <button
                  className={styles.carouselButton}
                  onClick={handleNextImage}
                  disabled={!initialVariant.img || initialVariant.img.length <= 1}>
                  <Image src={'/img/icons/arrRight.svg'} alt="Previous" width={24} height={24} />
                </button>
              </div>
              {Array.isArray(initialVariant.img) && initialVariant.img.length > 1 && (
                <div className={styles.carouselThumbnails}>
                  {initialVariant.img.map((img, index) => (
                    <button
                      key={index}
                      className={`${styles.thumbnail} ${
                        index === currentImageIndex ? styles.active : ''
                      }`}
                      onClick={() => handleThumbnailClick(index)}>
                      <Image
                        src={img}
                        alt={`${product.name} - Thumbnail ${index + 1}`}
                        width={4096}
                        height={4096}
                        className={styles.thumbnailImage}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={`${styles.productItemDetails} ${initialVariant.bgPos ? styles[initialVariant.bgPos] : ''}`}>
              {initialVariant.waitForMe && (
                <div className={styles.productItemWait}>
                  <p>WAIT FOR ME:</p>
                  <p>{initialVariant.waitForMe}</p>
                </div>
              )}

              {initialVariant.aboutMe && (
                <div className={styles.productItemAbout}>
                  <p>ABOUT ME:</p>
                  {initialVariant.aboutMe.map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
                </div>
              )}

              {initialVariant.myPrice && (
                <div className={styles.productItemPrice}>
                  <p>MY PRICE:</p>
                  <p>{initialVariant.myPrice}</p>
                </div>
              )}

              <button className={styles.productItemBtnCart}>
                <div>I want it!</div>
              </button>

              {initialVariant.size && (
                <div className={styles.productItemSize}>
                  <p>Choose your size:</p>
                  <div className={styles.productItemSizeOptions}>
                    {initialVariant.size.map((size, index) => (
                      <button key={index} className={styles.productItemSizeOption}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {initialVariant.length && (
                <div className={styles.productItemLength}>
                  <p>Choose the length:</p>
                  <div className={styles.productItemLengthOptions}>
                    {initialVariant.length.map((length, index) => (
                      <button key={index} className={styles.productItemLengthOption}>
                        {length}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.color && product.color.length > 0 && (
                <div className={styles.productItemColors}>
                  <p>Choose your color:</p>
                  <div className={styles.productItemColorOptions}>
                    {product.color.map((color) => {
                      const variant = product.variants.find(
                        (v) => v.color.includes(color) || v.colorActive === color,
                      );
                      const targetVariantLink = variant ? variant.link : baseLink;
                      return (
                        <button
                          key={color}
                          className={`${styles.productItemColorOption} ${
                            initialVariant.colorActive === color ? styles.active : ''
                          }`}
                          onClick={() => handleVariantChange(targetVariantLink)}>
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {initialVariant.bgImg && (
            <div className={styles.productItemBgWrapper}>
              <Image
                src={initialVariant.bgImg}
                alt={product.name}
                className={`${styles.productItemBgImage} ${initialVariant.bgPos === 'vertical' ? styles.bgVertical : styles.bgHorizontal}`}
                width={400}
                height={400}
              />
              {initialVariant.bgText && (
                <div className={styles.productItemBgText}>{initialVariant.bgText}</div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
