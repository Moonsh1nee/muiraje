import styles from '@/assets/styles/components/product/FullPhoto.module.scss';
import Image from 'next/image';
import React from 'react';

export default function FullPhoto({
  images,
  currentImageIndex,
  onPrevImage,
  onNextImage,
  onClickImage,
  productName,
}: {
  images: string[] | undefined;
  currentImageIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  onClickImage: () => void;
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
    <div className={styles.fullPhoto}>
      <div className={styles.fullPhotoImageContainer}>
        <button
          className={styles.fullPhotoButton}
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
              className={styles.fullPhotoButtonIcon}
              src={'/img/icons/arrLeftHover.svg'}
              alt="Previous"
              width={33}
              height={32}
            />
          ) : (
            <Image
              className={styles.fullPhotoButtonIcon}
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
            className={styles.fullPhotoImage}
            width={800}
            height={800}
            priority={currentImageIndex === 0}
            loading={'eager'}
            onClick={onClickImage}
          />
        ) : (
          <div className={styles.fallback}></div>
        )}
        <button
          className={styles.fullPhotoButton}
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
              className={styles.fullPhotoButtonIcon}
              src={'/img/icons/arrRightHover.svg'}
              alt="Next"
              width={33}
              height={32}
            />
          ) : (
            <Image
              className={styles.fullPhotoButtonIcon}
              src={'/img/icons/arrRight.svg'}
              alt="Next"
              width={41}
              height={37}
            />
          )}
        </button>
      </div>
    </div>
  );
}
