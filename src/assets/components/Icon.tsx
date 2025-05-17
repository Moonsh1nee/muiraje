import Image from 'next/image';

type IconName = 'computer';

interface IconProps {
  name: IconName;
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export default function Icon({
  name,
  className,
  alt = `${name} icon`,
  width = 24,
  height = 24,
}: IconProps) {
  const src = `/img/icons/${name}.svg`;

  return (
    <Image src={src} className={className} alt={alt} width={width} height={height} unoptimized />
  );
}
