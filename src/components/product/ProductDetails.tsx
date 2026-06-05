'use client';

import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';

export function ProductDetails({ product }: { product: Partial<Product> }) {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: product.id + '-default',
      productId: product.id || '',
      name: product.name || '',
      image: product.images?.[0] || '',
      size: '50ml',
      price: product.price || 0,
      quantity: 1,
      slug: product.slug || ''
    });
  };

  return (
    <Button 
      variant="primary" 
      className="w-full py-4 text-base tracking-[0.2em]" 
      onClick={handleAddToCart}
    >
      Add to Cart
    </Button>
  );
}
