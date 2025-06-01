export interface ProductItem {
  id: number;
  link: string;
  name: string;
  waitForMe: string;
  aboutMe: string[];
  myPrice: number;
  size: string[];
  sizeActive?: string;
  color?: string[];
  colorActive?: string;
  length?: string[];
  img: string[];
  bgImg: string;
  bgText: string;
}