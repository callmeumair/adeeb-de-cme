'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItemType } from '@/types';

interface CartStore {
  items: CartItemType[];
  isOpen: boolean;
  addItem: (item: CartItemType) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: number;
  itemCount: number;
}

const calculateTotals = (items: CartItemType[]) => ({
  total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  itemCount: items.reduce((count, item) => count + item.quantity, 0),
});

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      total: 0,
      itemCount: 0,

      addItem: (item: CartItemType) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (i) => i.productId === item.productId && i.size === item.size
        );

        if (existingIndex > -1) {
          const updated = [...items];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + item.quantity,
          };
          set({ items: updated, ...calculateTotals(updated) });
        } else {
          const updated = [...items, item];
          set({ items: updated, ...calculateTotals(updated) });
        }
      },

      removeItem: (id: string) => {
        const updated = get().items.filter((item) => item.id !== id);
        set({ items: updated, ...calculateTotals(updated) });
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          const updated = get().items.filter((item) => item.id !== id);
          set({ items: updated, ...calculateTotals(updated) });
          return;
        }
        const updated = get().items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        set({ items: updated, ...calculateTotals(updated) });
      },

      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },
    }),
    {
      name: 'adeeb-cart',
      // only partialize items, total and itemCount are re-calculated on load or can be omitted from partialize to save all
      partialize: (state) => ({ items: state.items, total: state.total, itemCount: state.itemCount }),
    }
  )
);
