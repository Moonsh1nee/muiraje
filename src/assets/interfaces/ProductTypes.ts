export interface ProductVariant {
  link: string;
  name: string;
  waitForMe?: string;
  aboutMe?: string[];
  warning: boolean;
  myPrice: number;
  size?: string[];
  color?: string[] | null;
  colorActive?: string | null;
  length?: string[] | null;
  img?: string[];
  bgImg?: string;
  bgText?: string;
  bgWidth?: number;
  bgHeight?: number;
}

export interface Product {
  id: number;
  baseLink: string;
  name: string;
  category: string;
  price: number;
  src: string;
  srcHover?: string | null;
  color?: string[] | null;
  variants: ProductVariant[];
}