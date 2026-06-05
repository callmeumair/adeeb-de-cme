'use client';

import { useWishlistStore } from '@/store/wishlistStore';

export function useWishlist() {
  const ids = useWishlistStore((state) => state.ids);
  const toggle = useWishlistStore((state) => state.toggle);
  const clear = useWishlistStore((state) => state.clear);

  function contains(productId: string): boolean {
    return ids.includes(productId);
  }

  function toggleWishlist(productId: string): void {
    toggle(productId);
  }

  function clearWishlist(): void {
    clear();
  }

  return {
    ids,
    count: ids.length,
    contains,
    toggleWishlist,
    clearWishlist,
  };
}
