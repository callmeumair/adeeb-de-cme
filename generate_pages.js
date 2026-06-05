const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n');
  console.log(`Created ${filePath}`);
};

// 1. PRODUCT COMPONENTS
write('src/components/product/ProductCard.tsx', `
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
          <Heart className={\`h-5 w-5 \${isWishlisted ? 'fill-gold text-gold' : ''}\`} />
        </button>
        <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-105 transition-transform duration-500">
          <svg width="40" height="80" viewBox="0 0 40 80" fill="none" stroke="currentColor" className="text-ivory">
            <path d="M10,20 L30,20 L35,40 L35,70 L5,70 L5,40 Z" strokeWidth="1" />
            <rect x="15" y="5" width="10" height="15" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
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
        <Link href={\`/product/\${product.slug}\`} className="font-display text-lg text-ivory hover:text-gold transition-colors mb-1">
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
`);

write('src/components/shop/ProductGrid.tsx', `
'use client';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types';

export function ProductGrid({ products }: { products: Partial<Product>[] }) {
  if (products.length === 0) {
    return <div className="text-center py-20 text-smoke">No products found.</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
`);

write('src/components/shop/FilterSidebar.tsx', `
'use client';
export function FilterSidebar() {
  return (
    <div className="w-64 shrink-0 pr-8 hidden md:block">
      <h3 className="font-display text-xl text-ivory mb-6 border-b border-gold/10 pb-4">Filters</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-gold text-xs tracking-[0.2em] uppercase mb-3">Category</h4>
          {['Oud', 'Musk', 'Rose', 'Woody', 'Oriental', 'Bakhoor'].map(c => (
            <label key={c} className="flex items-center gap-3 mb-2 text-sm text-smoke cursor-pointer">
              <input type="checkbox" className="accent-gold bg-charcoal border-gold/20 rounded-none" />
              {c}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
`);

// Mock data
write('src/lib/mockData.ts', `
import { Product } from '@/types';
export const mockProducts: Partial<Product>[] = [
  { id: '1', name: 'Royal Oud Intense', slug: 'royal-oud-intense', price: 4999, originalPrice: 6999, category: 'Oud', badge: 'BESTSELLER', images: [], topNotes: ['Saffron', 'Bergamot'], heartNotes: ['Oud', 'Rose'], baseNotes: ['Musk', 'Amber'] },
  { id: '2', name: 'Midnight Musk Elixir', slug: 'midnight-musk-elixir', price: 3499, originalPrice: null, category: 'Musk', badge: 'NEW', images: [], topNotes: ['Black Pepper'], heartNotes: ['Musk'], baseNotes: ['Vanilla'] },
  { id: '3', name: 'Rose de Arabia', slug: 'rose-de-arabia', price: 5499, originalPrice: 7499, category: 'Rose', badge: 'SALE', images: [], topNotes: ['Rose'], heartNotes: ['Oud'], baseNotes: ['Sandalwood'] },
  { id: '4', name: 'Amber Noir', slug: 'amber-noir', price: 4299, originalPrice: null, category: 'Woody', badge: null, images: [], topNotes: ['Amber'], heartNotes: ['Patchouli'], baseNotes: ['Cedar'] },
  { id: '5', name: 'Sultan\\'s Oud', slug: 'sultans-oud', price: 7999, originalPrice: 9999, category: 'Oud', badge: 'LIMITED', images: [], topNotes: ['Cardamom'], heartNotes: ['Oud'], baseNotes: ['Leather'] },
  { id: '6', name: 'Velvet Rose', slug: 'velvet-rose', price: 3999, originalPrice: null, category: 'Rose', badge: null, images: [], topNotes: ['Pink Pepper'], heartNotes: ['Rose'], baseNotes: ['Patchouli'] },
  { id: '7', name: 'Dark Saffron', slug: 'dark-saffron', price: 5999, originalPrice: null, category: 'Oriental', badge: 'NEW', images: [], topNotes: ['Saffron'], heartNotes: ['Leather'], baseNotes: ['Vetiver'] },
  { id: '8', name: 'White Musk Premium', slug: 'white-musk-premium', price: 2999, originalPrice: 3999, category: 'Musk', badge: null, images: [], topNotes: ['Aldehydes'], heartNotes: ['Musk'], baseNotes: ['Amber'] },
];
`);

// Shop Page
write('src/app/(store)/shop/page.tsx', `
import { ProductGrid } from '@/components/shop/ProductGrid';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { mockProducts } from '@/lib/mockData';

export default function ShopPage() {
  return (
    <div className="py-24 px-6 md:px-[60px] max-w-[1440px] mx-auto">
      <div className="mb-12 flex justify-between items-end border-b border-gold/20 pb-6">
        <div>
          <h1 className="font-display text-4xl text-ivory">Shop Collection</h1>
          <p className="text-smoke mt-2 text-sm">Showing {mockProducts.length} fragrances</p>
        </div>
      </div>
      <div className="flex">
        <FilterSidebar />
        <div className="flex-1">
          <ProductGrid products={mockProducts} />
        </div>
      </div>
    </div>
  );
}
`);

// Product Page
write('src/app/(store)/product/[slug]/page.tsx', `
import { mockProducts } from '@/lib/mockData';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const product = mockProducts.find(p => p.slug === slug);
  if (!product) notFound();

  return (
    <div className="py-24 px-6 md:px-[60px] max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-gradient-to-br from-deep to-charcoal flex items-center justify-center border border-gold/10">
          <svg width="80" height="160" viewBox="0 0 40 80" fill="none" stroke="currentColor" className="text-ivory opacity-20">
            <path d="M10,20 L30,20 L35,40 L35,70 L5,70 L5,40 Z" strokeWidth="1" />
            <rect x="15" y="5" width="10" height="15" strokeWidth="1" />
          </svg>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4">{product.category}</span>
          <h1 className="font-display text-4xl md:text-5xl text-ivory mb-2">{product.name}</h1>
          <p className="text-smoke mb-8 text-lg">{product.price}</p>
          <div className="space-y-4">
            <button className="w-full bg-gold text-black py-4 uppercase tracking-[0.2em] font-medium hover:bg-gold-light transition">Add to Cart</button>
          </div>
          <div className="mt-12 pt-8 border-t border-gold/10 text-smoke leading-relaxed">
            Experience the luxury of {product.name}, a masterfully blended fragrance featuring notes of {product.topNotes?.join(', ')} and {product.baseNotes?.join(', ')}.
          </div>
        </div>
      </div>
    </div>
  );
}
`);
