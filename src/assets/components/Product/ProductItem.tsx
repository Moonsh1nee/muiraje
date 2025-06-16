'use client';

import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import React from 'react';
import styles from '@/assets/styles/components/ProductItem.module.scss';
import { Header } from '../Header';
import { useProductStore } from '@/assets/store/useProductStore';
import CarouselMain from './Carousel';
import { useCartStore } from '@/assets/store/useCartStore';
import ModalBtnErr from './ModalBtnErr';
import FullPhoto from './FullPhoto';

export default function ProductItem({ baseLink }: { baseLink: string }) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isNonActiveHovered, setIsNonActiveHovered] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [selectedLength, setSelectedLength] = React.useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalText, setIsModalText] = React.useState('');
  const [isClickOnImage, setIsClickOnImage] = React.useState(false);

  const { products, loadProducts, getProductByBaseLink, getVariantByLink, isLoading, error } =
    useProductStore();
  const { addToCart } = useCartStore();

  React.useEffect(() => {
    if (products.length === 0 && isLoading) {
      loadProducts();
    }
  }, [products.length, isLoading, loadProducts]);

  const product = getProductByBaseLink(baseLink);
  const initialVariant = getVariantByLink(baseLink);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !product || !initialVariant) {
    return notFound();
  }

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

  const handleAddToCart = () => {
    if (initialVariant.size && !selectedSize) {
      setIsModalOpen(true);
      setIsModalText('Сначала нужно выбрать размер!');
      return;
    }
    if (initialVariant.length && !selectedLength) {
      setIsModalOpen(true);
      setIsModalText('Сначала нужно выбрать длину!');
      return;
    }
    addToCart({
      image: product.src,
      name: initialVariant.name || product.name,
      link: initialVariant.link,
      price: initialVariant.myPrice,
      color: initialVariant.colorActive,
      size: selectedSize,
      length: selectedLength,
      warning: initialVariant.warning,
      quantity: 1,
    });
    alert('Added to cart!');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalText('');
  };

  const handleImageClick = (isClickOnImage: boolean) => {
    setIsClickOnImage(!isClickOnImage);
  };

  return (
    <>
      <main className={`${styles.productItem} ${isModalOpen ? styles.modalOpen : ''}`}>
        <Header
          nav={`Catalog/${product.baseLink}`}
          link={'/catalog'}
          nameIcon="people"
          color="gray"
          width={30}
          height={43}
        />
        <div
          className={styles.productItemWrapper + ' ' + (isClickOnImage ? styles.clickImage : '')}>
          {initialVariant.name && (
            <h1 className={styles.productItemTitle}>{initialVariant.name}</h1>
          )}

          <div className={styles.productItemContent}>
            <CarouselMain
              productName={product.name}
              images={initialVariant.img}
              currentImageIndex={currentImageIndex}
              onPrevImage={handlePrevImage}
              onNextImage={handleNextImage}
              handleThumbnailClick={handleThumbnailClick}
              onClickImage={() => handleImageClick(isClickOnImage)}
              isClickImage={isClickOnImage}
            />
            <div className={`${styles.productItemDetails} ${styles[product.baseLink]}`}>
              <div className={styles.productItemDescription}>
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

              <div className={styles.productItemInfo}>
                <button className={styles.productItemBtnCart} onClick={handleAddToCart}>
                  <div>I want it!</div>
                </button>

                {initialVariant.size && (
                  <div className={styles.productItemSize}>
                    <p>Choose your size:</p>
                    <div className={styles.productItemSizeOptions}>
                      {initialVariant.size.map((size, index) => (
                        <button
                          key={index}
                          className={`${styles.productItemSizeOption} ${
                            selectedSize === size ? styles.productItemSizeOptionActive : ''
                          }`}
                          onClick={() => setSelectedSize(size)}>
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
                        <button
                          key={index}
                          className={`${styles.productItemLengthOption} ${
                            selectedLength === length ? styles.productItemLengthOptionActive : ''
                          }`}
                          onClick={() => setSelectedLength(length)}>
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
                        const variant = product.variants.find((v) => v.color?.includes(color));
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
            <div className={`${styles.productItemBgWrapper} ${styles[product.baseLink]}`}>
              <Image
                src={initialVariant.bgImg}
                alt={product.name}
                className={styles.productItemBgImage}
                width={initialVariant.bgWidth || 1000}
                height={initialVariant.bgHeight || 1200}
                unoptimized
              />
              {initialVariant.bgText && (
                <div className={styles.productItemBgText}>{initialVariant.bgText}</div>
              )}
            </div>
          )}
        </div>
        {isClickOnImage && (
          <FullPhoto
            images={initialVariant.img}
            currentImageIndex={currentImageIndex}
            onPrevImage={handlePrevImage}
            onNextImage={handleNextImage}
            onClickImage={() => handleImageClick(isClickOnImage)}
            productName={product.name}
          />
        )}
      </main>
      {isModalOpen && <ModalBtnErr text={isModalText} closeModal={closeModal} />}
    </>
  );
}
