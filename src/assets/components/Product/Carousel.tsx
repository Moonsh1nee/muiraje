import styles from '@/assets/styles/components/product/Carousel.module.scss';
import Image from 'next/image';
import React from 'react';

export default function CarouselMain({
  images,
  currentImageIndex,
  onPrevImage,
  onNextImage,
  handleThumbnailClick,
  productName,
}: {
  images: string[] | undefined;
  currentImageIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  handleThumbnailClick: (index: number) => void;
  productName: string;
}) {
  const [isNonActiveHoveredLeft, setIsNonActiveHoveredLeft] = React.useState(false);
  const [isNonActiveHoveredRight, setIsNonActiveHoveredRight] = React.useState(false);

  const handleMouseEnterLeft = () => {
    setIsNonActiveHoveredLeft(true);
  };

  const handleMouseLeaveLeft = () => {
    setTimeout(() => {
      setIsNonActiveHoveredLeft(false);
    }, 200);
  };

  const handleMouseEnterRight = () => {
    setIsNonActiveHoveredRight(true);
  };

  const handleMouseLeaveRight = () => {
    setTimeout(() => {
        setIsNonActiveHoveredRight(false);
    }, 200);
  };

  return (
    <div className={styles.carouselMain}>
      <div className={styles.carouselImageContainer}>
        <button
          className={styles.carouselButton}
          onClick={() => {
            onPrevImage();
            handleMouseLeaveLeft();
          }}
          disabled={!images || images.length <= 1}
          onMouseEnter={handleMouseEnterLeft}
          onMouseLeave={handleMouseLeaveLeft}>
          {isNonActiveHoveredLeft ? (
            <Image
              key={isNonActiveHoveredLeft ? '1' : '2'}
              className={styles.carouselButtonIcon}
              src={'/img/icons/arrLeftHover.svg'}
              alt="Previous"
              width={33}
              height={32}
            />
          ) : (
            <Image
              className={styles.carouselButtonIcon}
              src={'/img/icons/arrLeft.svg'}
              alt="Previous"
              width={41}
              height={37}
            />
          )}
        </button>
        {Array.isArray(images) && images.length > 0 ? (
          <Image
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`${productName} - ${currentImageIndex + 1}`}
            className={styles.productItemImage}
            width={500}
            height={500}
            priority={currentImageIndex === 0}
            loading={'eager'}
          />
        ) : (
          <div className={styles.fallback}></div>
        )}
        <button
          className={styles.carouselButton}
          onClick={() => {
            onNextImage();
            handleMouseLeaveRight();
          }}
          disabled={!images || images.length <= 1}
          onMouseEnter={handleMouseEnterRight}
          onMouseLeave={handleMouseLeaveRight}>
          {isNonActiveHoveredRight ? (
            <Image
              key={isNonActiveHoveredRight ? '1' : '2'}
              className={styles.carouselButtonIcon}
              src={'/img/icons/arrRightHover.svg'}
              alt="Next"
              width={33}
              height={32}
            />
          ) : (
            <Image
              className={styles.carouselButtonIcon}
              src={'/img/icons/arrRight.svg'}
              alt="Next"
              width={41}
              height={37}
            />
          )}
        </button>
      </div>

      {Array.isArray(images) && images.length > 1 ? (
        <div className={styles.carouselThumbnails}>
          {images.map((img, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${index === currentImageIndex ? styles.active : ''}`}
              onClick={() => handleThumbnailClick(index)}>
              <Image
                src={img}
                alt={`${productName} - Thumbnail ${index + 1}`}
                width={90}
                height={90}
                className={styles.thumbnailImage}
                loading={'eager'}
              />
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.carouselThumbnails}>
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div key={index} className={styles.fallback}></div>
            ))}
        </div>
      )}
    </div>
  );
}
