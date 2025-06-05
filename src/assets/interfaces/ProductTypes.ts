export interface ProductVariant {
  link: string;
  name?: string;
  waitForMe?: string;
  aboutMe?: string[];
  myPrice?: number;
  size?: string[];
  colorActive?: string | null;
  length?: string[] | null;
  img?: string[];
  bgImg?: string;
  bgText?: string;
  bgPos?: string;
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
  variants?: ProductVariant[];
}