import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

export type CartItem = { product: Product; qty: number };

type State = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
};

export const useCart = create<State>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item,
              ),
            };
          }
          return { items: [...state.items, { product, qty: 1 }] };
        }),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.product.id !== id) })),
      setQty: (id, qty) =>
        set((state) => ({
          items: state.items
            .map((item) => (item.product.id === id ? { ...item, qty: Math.max(0, qty) } : item))
            .filter((item) => item.qty > 0),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((sum, item) => sum + item.qty, 0),
      total: () => get().items.reduce((sum, item) => sum + item.qty * item.product.price, 0),
    }),
    { name: "ha-cart" },
  ),
);
