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
