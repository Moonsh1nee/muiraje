import { create } from 'zustand';
import { Product, ProductVariant} from '@/assets/interfaces/ProductTypes';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  loadProducts: () => Promise<void>;
  getProductByBaseLink: (baseLink: string) => Product | undefined;
  getVariantByLink: (baseLink: string) => ProductVariant | undefined;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: true,
  error: null,
  loadProducts: async () => {
    try {
      set({ isLoading: true, error: null });
      const productsData = await import('@/assets/data/Products.json').then(
        (mod) => mod.default
      );
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
        set({ products, isLoading: false });
    } catch (err) {
      set({ error: 'Failed to load products', isLoading: false });
      console.error('Failed to load products:', err);
    }
  },
  getProductByBaseLink: (baseLink: string) =>
    get().products.find(
      (p) => p.baseLink === baseLink || p.variants.some((v) => v.link === baseLink)
    ),
  getVariantByLink: (baseLink: string) => {
    const product = get().products.find((p) =>
      p.variants.some((v) => v.link === baseLink)
    );
    return product?.variants.find((v) => v.link === baseLink) || product?.variants[0];
  },
}));