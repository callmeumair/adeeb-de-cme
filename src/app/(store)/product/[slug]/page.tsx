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
