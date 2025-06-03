import { create } from "zustand";
import productsData from "@/assets/data/Products.json";
import { ProductVariant, Product } from "@/assets/interfaces/ProductTypes";

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  loadProducts: () => void;
  getProductByBaseLink: (baseLink: string) => Product | undefined;
  getVariantByLink: (link: string) => ProductVariant | undefined;
  filterByCategory: (category: string) => Product[];
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  loadProducts: () => {
    try {
      set({ isLoading: true, error: null });
      const products: Product[] = productsData
        .filter((item): item is typeof item => !!item.id && !!item.baseLink)
        .map((item) => ({
          id: item.id,
          baseLink: item.baseLink,
          name: item.name,
          category: item.category,
          price: item.price,
          src: item.src,
          srcHover: item.srcHover ?? null,
          variants: item.variants || [],
        }));
      set({ products, isLoading: false });
    } catch (err) {
      set({ isLoading: false, error: 'Failed to load products' });
      console.error('Error loading products:', err);
    }
  },
  getProductByBaseLink: (baseLink: string) => {
    return get().products.find((product: Product) => product.baseLink === baseLink);
  },
  getVariantByLink: (link: string) => {
    return get()
      .products.flatMap((product: Product) => product.variants || [])
      .find((variant: ProductVariant) => variant.link === link);
  },
  filterByCategory: (category: string) => {
    if (category === 'All') {
      return get().products;
    }
    return get().products.filter((product: Product) => product.category === category);
  },
}));