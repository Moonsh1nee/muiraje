import { create } from "zustand";
import promoCodesData from '@/assets/data/promoCode.json'

export interface CartItem {
  image: string;
  name: string;
  link: string;
  price: number;
  color?: string | null; 
  size?: string | null; 
  length?: string | null; 
  warning: boolean;
  quantity: number; 
}

interface PromoCode {
  code: string;
  discount: number;
  expiry: string;
}

interface CartState {
  cart: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  promoCode: string | null;
  promoDiscount: number;
  isPromoError: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  loadCart: () => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => void;
  removePromoCode: () => void;
  resetPromoError: () => void;
}

const CART_STORAGE_KEY = 'cart';

const calculateTotals = (cart: CartItem[], promoDiscount: number) => {
  const basePrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = basePrice * (1 - promoDiscount / 100);
  return { totalQuantity, totalPrice };
};

const isPromoValid = (promo: PromoCode, currentDate: Date): boolean => {
  const expiryDate = new Date(promo.expiry);
  return expiryDate >= currentDate;
};

export const useCartStore = create<CartState>((set) => {
  const initialCart: CartItem[] = [];
  const initialPromoCode: string | null = null;
  const initialPromoDiscount = 0;
  const initialTotals = calculateTotals(initialCart, initialPromoDiscount);

  return {
    cart: initialCart,
    totalQuantity: initialTotals.totalQuantity,
    totalPrice: initialTotals.totalPrice,
    promoCode: initialPromoCode,
    promoDiscount: initialPromoDiscount,
    isPromoError: false,

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

        const totals = calculateTotals(updatedCart, state.promoDiscount);

        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
          } catch (error) {
            console.error('Error saving cart to localStorage:', error);
          }
        }
        return { 
          cart: updatedCart,
          totalQuantity: totals.totalQuantity,
          totalPrice: totals.totalPrice,
         };
      })
    },

    removeFromCart: (item) => {
      set((state) => {
        const updatedCart = state.cart.filter(
          (cartItem) =>
            !(cartItem.link === item.link &&
              cartItem.size === item.size &&
              cartItem.length === item.length &&
              cartItem.color === item.color)
        );

        const totals = calculateTotals(updatedCart, state.promoDiscount);

        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
          } catch (error) {
            console.error('Error saving cart to localStorage:', error);
          }
        }

        return { 
          cart: updatedCart,
          totalQuantity: totals.totalQuantity,
          totalPrice: totals.totalPrice,
         };
      })
    },

    updateQuantity: (item, quantity) => {
      set((state) => {
        let updatedCart: CartItem[];
        if (quantity <= 0) {
          updatedCart = state.cart.filter(
            (cartItem) =>
              !(cartItem.link === item.link &&
                cartItem.size === item.size &&
                cartItem.length === item.length &&
                cartItem.color === item.color)
          );
        }
        else {
          updatedCart = state.cart.map((cartItem) =>
            cartItem.link === item.link &&
            cartItem.size === item.size &&
            cartItem.length === item.length &&
            cartItem.color === item.color
              ? { ...cartItem, quantity }
              : cartItem
          );
        }

        const totals = calculateTotals(updatedCart, state.promoDiscount);

        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
          } catch (error) {
            console.error('Error saving cart to localStorage:', error);
          }
        }

        return { 
          cart: updatedCart,
          totalQuantity: totals.totalQuantity,
          totalPrice: totals.totalPrice,
         };
      })
    },

    loadCart: () => {
      set((state) => {
        if (typeof window !== 'undefined') {
          try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            const parsedCart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
            const totals = calculateTotals(parsedCart, state.promoDiscount);
            return {
              cart: parsedCart,
              totalQuantity: totals.totalQuantity,
              totalPrice: totals.totalPrice,
            };
          } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return {
              cart: [],
              totalQuantity: 0,
              totalPrice: 0,
            };
          }
        }
        return state;
      });
    },

    clearCart: () => {
      set(() => {
        if (typeof window !== 'undefined') {
          try {
            localStorage.removeItem(CART_STORAGE_KEY);
          } catch (error) {
            console.error('Error clearing cart from localStorage:', error);
          }
        }
        return { 
          cart: [],
          totalQuantity: 0,
          totalPrice: 0,
          promoCode: null,
          promoDiscount: 0,
          isPromoError: false,
         };
      });
    },

    applyPromoCode: (code: string) =>
      set((state) => {
        const promo = promoCodesData.find((p: PromoCode) => p.code === code);
        const currentDate = new Date();
        let promoDiscount = 0;
        let isPromoError = false;
        let promoCode: string | null = code;

        if (promo && isPromoValid(promo, currentDate)) {
          promoDiscount = promo.discount;
        } else {
          isPromoError = true;
          promoCode = null;
        }

        const totals = calculateTotals(state.cart, promoDiscount);

        return {
          promoCode,
          promoDiscount,
          isPromoError,
          totalPrice: totals.totalPrice,
          totalQuantity: totals.totalQuantity,
        };
      }),

    removePromoCode: () =>
      set((state) => {
        const totals = calculateTotals(state.cart, 0);

        return {
          promoCode: null,
          promoDiscount: 0,
          isPromoError: false,
          totalPrice: totals.totalPrice,
          totalQuantity: totals.totalQuantity,
        };
      }),

      resetPromoError: () =>
        set(() => ({
          isPromoError: false,
        }
      )),
  };
});