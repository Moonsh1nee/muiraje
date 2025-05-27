'use client';

import styles from '@/assets/styles/components/Footer.module.scss';
import Image from 'next/image';
import Icon from './Icon';
import { useCurrentTime } from './Time';

export default function Footer() {
  const time = useCurrentTime(60000);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerLeft}>
          <button className={styles.footerButton}>
            <div>
              <Image
                src={'/img/icons/footerPC.png'}
                alt="Computer Icon"
                width={32}
                height={27}
                className={styles.footerIcon}
              />
              <span className={styles.footerButtonText}>Прив!</span>
            </div>
          </button>

          <div className={styles.footerIcons}>
            <div className={styles.footerDividersWrapper}>
              <div className={styles.footerDividerFirst}></div>
              <div className={styles.footerDividerSecond}></div>
            </div>

            <Image
              src={'/img/icons/footerCalc.png'}
              alt="Calculator Icon"
              width={24}
              height={24}
              className={styles.footerIcon}
            />
            <Image
              src={'/img/icons/footerNote.png'}
              alt="Note Icon"
              width={24}
              height={24}
              className={styles.footerIcon}
            />
            <Image
              src={'/img/icons/footerFolder.png'}
              alt="Folder Icon"
              width={24}
              height={24}
              className={styles.footerIcon}
            />
            <div className={styles.footerDividersWrapper}>
              <div className={styles.footerDividerFirst}></div>
              <div className={styles.footerDividerSecond}></div>
            </div>
          </div>

          <div className={styles.footerPath}>
            <Icon
              name="computer"
              alt="Computer Icon"
              width={24}
              height={24}
              className="computerFooterIcon"
            />
            <div className={styles.footerPathText}>
              Muiraje: Каталог <span>8+8+8</span>
            </div>
          </div>
        </div>

        <div className={styles.footerRight}>
          <Image
            src={'/img/icons/footerVolume.png'}
            className={styles.footerIcon}
            alt="Volume Icon"
            width={24}
            height={24}
          />
          <Icon name="lang" alt="Language Icon" width={24} height={24} />
          {time ? (
            <div className={styles.time}>
              {time.time.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          ) : (
            <div className={styles.time}>Loading...</div>
          )}
        </div>
      </div>
    </footer>
  );
}
