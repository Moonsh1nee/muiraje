import Image from 'next/image';
import styles from '@/assets/styles/components/Icon.module.scss';

export type IconName = 'computer' | 'btnCross' | 'btnRoll' | 'btnFullScreen' | 'lang' | 'people' | 'arrLeft' | 'arrRight' | 'iconCart' | 'iconHeart' | 'iconSearch' | 'cartPageIcon' | 'phone' | 'document';

interface IconProps {
  name: IconName;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Icon({
  name,
  alt = `${name} icon`,
  width = 24,
  height = 24,
  className = '',
}: IconProps) {
  const src = `/img/icons/${name}.svg`;

  return (
    <Image src={src} className={styles[className] || styles[name] || styles.icon} alt={alt} width={width} height={height}/>
  );
}
