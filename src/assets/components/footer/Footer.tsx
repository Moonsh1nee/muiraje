'use client';

import styles from '@/assets/styles/components/Footer.module.scss';
import Image from 'next/image';
import Icon from '../Icon';
import { useCurrentTime } from './Time';
import { useModalStore } from '@/assets/store/modalStore';

export default function Footer() {
  const time = useCurrentTime(60000);
  const toggleMenu = useModalStore((state) => state.toggleModal);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerLeft}>
          <button className={styles.footerButton} onClick={toggleMenu} data-footer-button>
            <div>
              <Image
                src={'/img/icons/footerPC.png'}
                alt="Computer Icon"
                width={32}
                height={27}
                className={styles.footerIcon}
              />
              <span className={styles.footerButtonText}>
                Пр<span>и</span>
                <span>в</span>!
              </span>
            </div>
          </button>

          <div className={styles.footerDividersWrapper}>
            <div className={styles.footerDividerFirst}></div>
            <div className={styles.footerDividerSecond}></div>
          </div>

          <div className={styles.footerIcons}>
            <Image
              src={'/img/icons/footerCalc.png'}
              alt="Calculator Icon"
              width={18}
              height={16}
              className={styles.footerIcon}
            />
            <Image
              src={'/img/icons/footerNote.png'}
              alt="Note Icon"
              width={18}
              height={16}
              className={styles.footerIcon}
            />
            <Image
              src={'/img/icons/footerFolder.png'}
              alt="Folder Icon"
              width={18}
              height={16}
              className={styles.footerIcon}
            />
          </div>

          <div className={styles.footerDividersWrapper}>
            <div className={styles.footerDividerSecond}></div>
            <div className={styles.footerDividerFirst}></div>
          </div>

          <div className={styles.footerPath}>
            <div>
              <div>
                <Icon
                  name="computer"
                  alt="Computer Icon"
                  width={24}
                  height={24}
                  className="computerFooterIcon"
                />
                <div className={styles.footerPathText}>
                  <div>
                    M<span>uiraje: </span>
                    <span>Каталог</span>
                  </div>
                  <div>8+8+8</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerRight}>
          <Image
            src={'/img/icons/footerVolume.png'}
            alt="Volume Icon"
            width={19}
            height={16}
            className={styles.footerIcon + ' ' + styles.volumeIcon}
          />
          <Icon name="lang" alt="Language Icon" width={36} height={36} />
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
