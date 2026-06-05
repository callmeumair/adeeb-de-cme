import { notFound } from 'next/navigation';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { mockProducts } from '@/lib/mockData';

const collections = {
  'oud-royale': {
    name: 'Oud Royale',
    description: 'The pinnacle of Arabian luxury',
    category: 'Oud',
  },
  'midnight-musk': {
    name: 'Midnight Musk',
    description: 'Dark, mysterious, unforgettable',
    category: 'Musk',
  },
  'rose-amber': {
    name: 'Rose & Amber',
    description: 'Romance in every note',
    category: 'Rose', // Simplified for matching mock products
  },
  'bakhoor-noir': {
    name: 'Bakhoor Noir',
    description: 'Ancient incense reimagined',
    category: 'Woody',
  },
};

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params object before using its properties
  const { slug } = await params;
  
  const collection = collections[slug as keyof typeof collections];

  if (!collection) {
    notFound();
  }

  // Filter mock products based on the category
  const collectionProducts = mockProducts.filter(
    (product) => product.category === collection.category
  );

  return (
    <div className="py-24 px-6 md:px-[60px] max-w-[1440px] mx-auto min-h-screen">
      <div className="mb-12 border-b border-gold/20 pb-8">
        <h1 className="font-display text-4xl md:text-5xl text-ivory mb-4">{collection.name}</h1>
        <p className="text-smoke text-lg max-w-2xl">{collection.description}</p>
      </div>
      
      {collectionProducts.length > 0 ? (
        <ProductGrid products={collectionProducts} />
      ) : (
        <div className="text-center py-20">
          <p className="text-smoke text-lg">More fragrances coming to this collection soon.</p>
        </div>
      )}
    </div>
  );
}
