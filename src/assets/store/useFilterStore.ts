import { create } from 'zustand';

interface FilterState {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedCategory: 'All',
  setSelectedCategory: (category: string) => set({ selectedCategory: category }),
}));