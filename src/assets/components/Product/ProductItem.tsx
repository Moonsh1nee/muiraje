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
  const [isNonActiveHovered, setIsNonActiveHovered] = React.useState(false);

  const handleVariantChange = (variantLink: string) => {
    router.push(`/catalog/${variantLink}`);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? (initialVariant.img?.length || 1) - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === (initialVariant.img?.length || 1) - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleMouseEnter = (isActive: boolean) => {
    if (!isActive) {
      setIsNonActiveHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsNonActiveHovered(false);
  };

  return (
    <>
      <main className={styles.productItem}>
        <Header
          nav={`Catalog/${product.baseLink}`}
          link={'/catalog'}
          nameIcon="people"
          color="gray"
          width={30}
          height={43}
        />
        {/* TODO: Add a btn to the catalog page */}
        <div className={styles.productItemWrapper}>
          {initialVariant.name && (
            <h1 className={styles.productItemTitle}>{initialVariant.name}</h1>
          )}

          <div className={styles.productItemContent}>
            <div className={styles.productItemContentUpper}>
              <div className={styles.carouselMain}>
                <button
                  className={styles.carouselButton}
                  onClick={handlePrevImage}
                  disabled={!initialVariant.img || initialVariant.img.length <= 1}>
                  <Image src={'/img/icons/arrLeft.svg'} alt="Previous" width={41} height={37} />
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
                      loading={'eager'}
                    />
                  ) : (
                    <Image
                      src="/img/fallback.png"
                      alt={product.name}
                      className={styles.productItemImage}
                      width={4096}
                      height={4096}
                    /> // TODO: Add a fallback image
                  )}
                </div>
                <button
                  className={styles.carouselButton}
                  onClick={handleNextImage}
                  disabled={!initialVariant.img || initialVariant.img.length <= 1}>
                  <Image src={'/img/icons/arrRight.svg'} alt="Previous" width={41} height={33} />
                </button>
              </div>
              <div
                className={`${styles.productItemDetails} ${
                  initialVariant.bgPos ? styles[initialVariant.bgPos] : ''
                }`}>
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
              </div>
            </div>

            <div className={styles.productItemContentLower}>
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

              <div className={styles.productItemInfo}>
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
                    <div
                      className={`${styles.productItemColorOptions} ${
                        isNonActiveHovered ? styles.hovered : ''
                      }`}>
                      {product.color.map((color) => {
                        const variant = product.variants?.find((v) => v.color?.includes(color));
                        const targetVariantLink = variant ? variant.link : baseLink;
                        const isActive = initialVariant.colorActive === color;
                        return (
                          <button
                            key={color}
                            className={isActive ? styles.active : ''}
                            onClick={() => handleVariantChange(targetVariantLink)}
                            onMouseEnter={() => handleMouseEnter(isActive)}
                            onMouseLeave={handleMouseLeave}>
                            {color}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {initialVariant.bgImg && (
            <div className={styles.productItemBgWrapper}>
              <Image
                src={initialVariant.bgImg}
                alt={product.name}
                className={`${styles.productItemBgImage} ${
                  initialVariant.bgPos === 'vertical' ? styles.bgVertical : styles.bgHorizontal
                }`}
                width={1697}
                height={1200}
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
