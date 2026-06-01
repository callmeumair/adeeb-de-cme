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
