import { create } from 'zustand';
import productsData from '@/assets/data/Products.json';
import { Product} from '@/assets/interfaces/ProductTypes';

interface ProductState {
  products: Product[];
  loadProducts: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loadProducts: () => {
    try {
      const products: Product[] = productsData
        .map((item) => ({
          id: item.id,
          baseLink: item.baseLink,
          name: item.name,
          category: item.category,
          price: item.price,
          src: item.src,
          srcHover: item.srcHover ?? null,
          color: item.color ?? null,
          variants: item.variants || [],
        }));
      set({ products,});
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  }
}));