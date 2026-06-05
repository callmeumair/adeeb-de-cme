'use client';
import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';

export const ProductCard = memo(function ProductCard({ product }: { product: Partial<Product> }) {
  const { ids, toggle } = useWishlistStore();
  const { addItem } = useCartStore();
  const isWishlisted = ids.includes(product.id || '');

  return (
    <div className="group relative bg-charcoal overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[3/4] bg-gradient-to-br from-deep to-charcoal overflow-hidden">
        {product.badge && (
          <div className="absolute top-2 left-2 z-10 bg-gold px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-black">
            {product.badge}
          </div>
        )}
        <button
          onClick={() => toggle(product.id || '')}
          className="absolute top-2 right-2 z-10 p-2 text-ivory hover:text-gold transition-colors"
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-gold text-gold' : ''}`} />
        </button>
        <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-105 transition-transform duration-500">
          <svg width="40" height="80" viewBox="0 0 40 80" fill="none" stroke="currentColor" className="text-ivory">
            <path d="M10,20 L30,20 L35,40 L35,70 L5,70 L5,40 Z" strokeWidth="1" />
            <rect x="15" y="5" width="10" height="15" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-0 md:translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2 bg-gradient-to-t from-charcoal to-transparent">
          <Button variant="primary" className="flex-1" size="sm" onClick={() => addItem({
            id: product.id + '-default',
            productId: product.id || '',
            name: product.name || '',
            image: product.images?.[0] || '',
            size: '50ml',
            price: product.price || 0,
            quantity: 1,
            slug: product.slug || ''
          })}>
            <ShoppingCart className="h-4 w-4 mr-2" /> Add
          </Button>
          <Button variant="secondary" size="sm" className="px-3">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2">{product.category}</span>
        <Link href={`/product/${product.slug}`} className="font-display text-lg text-ivory hover:text-gold transition-colors mb-1">
          {product.name}
        </Link>
        <p className="text-smoke text-xs truncate mb-3">{product.topNotes?.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gold font-body font-semibold">{formatPrice(product.price || 0)}</span>
            {product.originalPrice && (
              <span className="text-smoke text-xs line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <div className="flex text-gold text-xs">
            {'★'.repeat(Math.round(4.8))}
          </div>
        </div>
      </div>
    </div>
  );
});
