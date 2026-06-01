'use client';

import { useCartStore } from '@/store/cartStore';
import type { CartItemType } from '@/types';

export function useCart() {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  function addToCart(item: CartItemType): void {
    addItem(item);
    openCart();
  }

  function removeFromCart(id: string): void {
    removeItem(id);
  }

  function updateItemQuantity(id: string, quantity: number): void {
    updateQuantity(id, quantity);
  }

  return {
    items,
    isOpen,
    total,
    itemCount,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
  };
}
