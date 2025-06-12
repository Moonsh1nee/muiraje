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
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (item) => {
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) =>
          cartItem.link === item.link &&
          cartItem.size === item.size &&
          cartItem.length === item.length &&
          cartItem.color === item.color
      );
      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.link === item.link &&
            cartItem.size === item.size &&
            cartItem.length === item.length &&
            cartItem.color === item.color
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          ),
        };
      }
      return { cart: [...state.cart, item] };
    });
  },
}));