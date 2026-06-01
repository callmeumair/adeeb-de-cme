'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { GoldDivider } from '@/components/ui/GoldDivider';

const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.4 },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } =
    useCartStore();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-[80] w-full sm:w-[440px] bg-deep border-l border-gold/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-20 shrink-0">
              <h2 className="font-body text-xs tracking-[0.3em] uppercase text-ivory">
                Your Cart
                {itemCount > 0 && (
                  <span className="ml-2 text-smoke">({itemCount})</span>
                )}
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="text-smoke hover:text-ivory transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <GoldDivider />

            {/* Body */}
            {items.length === 0 ? (
              /* Empty State */
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/10">
                  <ShoppingBag className="h-8 w-8 text-smoke/40" />
                </div>
                <div className="text-center">
                  <p className="font-display text-xl text-ivory mb-2">
                    Your cart is empty
                  </p>
                  <p className="text-smoke text-sm">
                    Discover our luxury fragrances
                  </p>
                </div>
                <Link href="/shop" onClick={closeCart}>
                  <Button variant="ghost" size="sm">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 py-4 border-b border-gold/5 last:border-0"
                    >
                      {/* Image */}
                      <div className="relative h-20 w-16 shrink-0 bg-charcoal overflow-hidden">
                        <Image
                          src={item.image || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=200&auto=format&fit=crop'}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <div>
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="font-display text-sm text-ivory hover:text-gold transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <p className="text-smoke text-[10px] tracking-wider uppercase mt-0.5">
                            {item.size}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-gold/10">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                              className="h-7 w-7 flex items-center justify-center text-smoke hover:text-ivory transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="h-7 w-8 flex items-center justify-center text-xs text-ivory border-x border-gold/10">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              aria-label="Increase quantity"
                              className="h-7 w-7 flex items-center justify-center text-smoke hover:text-ivory transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Price */}
                          <span className="font-body text-sm text-ivory">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="self-start mt-1 text-smoke/40 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="shrink-0 border-t border-gold/10 px-6 py-6 space-y-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-smoke">
                      Subtotal
                    </span>
                    <span className="font-body text-lg text-ivory">
                      {formatPrice(total)}
                    </span>
                  </div>

                  {/* Shipping Note */}
                  <p className="text-smoke text-[11px] text-center tracking-wide">
                    Free shipping on all orders
                  </p>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block"
                  >
                    <Button variant="primary" size="lg" className="w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
