'use client';
import { useWishlistStore } from '@/store/wishlistStore';
import { mockProducts } from '@/lib/mockData';
import { ProductGrid } from '@/components/shop/ProductGrid';

export default function WishlistPage() {
  const { ids } = useWishlistStore();
  const wishlistedProducts = mockProducts.filter(p => ids.includes(p.id || ''));
  
  return (
    <div className="py-24 px-6 md:px-[60px] max-w-[1440px] mx-auto min-h-[60vh]">
      <h1 className="font-display text-4xl text-ivory mb-8">My Wishlist</h1>
      {wishlistedProducts.length > 0 ? (
        <ProductGrid products={wishlistedProducts} />
      ) : (
        <p className="text-smoke py-20 text-center">Your wishlist is empty.</p>
      )}
    </div>
  );
}
