type ProductItemProps = {
  product: {
    id: number;
    link: string;
    name: string;
    waitForMe: string;
    aboutMe: string;
    structure: string;
    myPrice: number;
    size: string;
    img: Array<string>;
    bgImg: string;
  };
};

export default function ProductItem({ product }: ProductItemProps) {
  console.log(product);
  return (
    <h1>test</h1>
  );
}
