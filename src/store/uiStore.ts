'use client';

import { create } from 'zustand';

interface UIStore {
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  toggleMobileMenu: () => void;
  toggleSearch: () => void;
  closeAll: () => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  mobileMenuOpen: false,
  searchOpen: false,

  toggleMobileMenu: () => {
    set({ mobileMenuOpen: !get().mobileMenuOpen, searchOpen: false });
  },

  toggleSearch: () => {
    set({ searchOpen: !get().searchOpen, mobileMenuOpen: false });
  },

  closeAll: () => {
    set({ mobileMenuOpen: false, searchOpen: false });
  },
}));
