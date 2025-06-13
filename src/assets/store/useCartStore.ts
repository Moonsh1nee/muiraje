import { create } from "zustand";

interface CartItem {
  productId: number;
  image: string;
  name: string;
  link: string;
  price: number;
  color?: string | null; 
  size?: string | null; 
  length?: string | null; 
  quantity: number; 
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  loadCart: () => void;
}

const CART_STORAGE_KEY = 'cart';

export const useCartStore = create<CartState>((set) => {
  let initialCart: CartItem[] = [];
  if (typeof window !== 'undefined') {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        initialCart = JSON.parse(savedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }

  return {
    cart: initialCart,
    addToCart: (item) => {
      set((state) => {
        const existingItem = state.cart.find(
          (cartItem) =>
            cartItem.link === item.link &&
            cartItem.size === item.size &&
            cartItem.length === item.length &&
            cartItem.color === item.color
        );
        let updatedCart: CartItem[];
        if (existingItem) {
          updatedCart = state.cart.map((cartItem) =>
            cartItem.link === item.link &&
            cartItem.size === item.size &&
            cartItem.length === item.length &&
            cartItem.color === item.color
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          );
        } else {
          updatedCart = [...state.cart, item];
        }

        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
          } catch (error) {
            console.error('Error saving cart to localStorage:', error);
          }
        }
        return { cart: updatedCart };
      });
    },
    loadCart: () => {
      if (typeof window !== 'undefined') {
        try {
          const savedCart = localStorage.getItem(CART_STORAGE_KEY);
          if (savedCart) {
            const parsedCart: CartItem[] = JSON.parse(savedCart);
            set({ cart: parsedCart });
          } else {
            set({ cart: [] });
          }
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
          set({ cart: [] });
        }
      }
    },
  };
});