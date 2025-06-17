import { create } from 'zustand';

interface Category {
  src: string;
  alt: string;
  width: number;
  height: number;
  text: string;
}

interface CategoryState {
  categories: Category[];
  currentCategory: string;
  loadCategories: () => Promise<void>;
  setCategory: (category: string) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  currentCategory: 'All',
  loadCategories: async () => {
    try {
      const categoriesData = await import('@/assets/data/CatalogCategory.json').then(
        (mod) => mod.default,
      );
      const categories = categoriesData.map((cat: Category) => ({
        src: cat.src,
        alt: cat.alt,
        width: cat.width,
        height: cat.height,
        text: cat.text,
      }));

      set({ categories });
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  },
  setCategory: (category: string) => set({ currentCategory: category }),
}));