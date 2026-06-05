'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { MobileMenu } from './MobileMenu';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/collections', label: 'Collections' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const wishlistIds = useWishlistStore((s) => s.ids);
  const { toggleMobileMenu, toggleSearch } = useUIStore();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl bg-black/80 border-b border-gold/10'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">
          {/* Left — Mobile Menu Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label="Open menu"
              className="text-ivory hover:text-gold transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Left — Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-[10px] uppercase tracking-[0.3em] text-smoke hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center — Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
          >
            <span className="font-display text-xl lg:text-2xl tracking-[0.3em] text-gold select-none whitespace-nowrap">
              ADEEB DE CME
            </span>
          </Link>

          {/* Right — Icons */}
          <div className="flex items-center gap-5">
            <button
              onClick={toggleSearch}
              aria-label="Search"
              className="hidden lg:flex text-smoke hover:text-gold transition-colors duration-300"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            <Link
              href="/wishlist"
              className="relative hidden lg:flex text-smoke hover:text-gold transition-colors duration-300"
              aria-label="Wishlist"
            >
              <Heart className="h-[18px] w-[18px]" />
              {mounted && wishlistIds.length > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center bg-gold text-black text-[8px] font-bold rounded-full">
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            <button
              onClick={toggleCart}
              className="relative text-smoke hover:text-gold transition-colors duration-300"
              aria-label="Cart"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center bg-gold text-black text-[8px] font-bold rounded-full">
                  {itemCount}
                </span>
              )}
            </button>

            <Link
              href="/account"
              className="hidden lg:flex text-smoke hover:text-gold transition-colors duration-300"
              aria-label="Account"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu />
    </>
  );
}
