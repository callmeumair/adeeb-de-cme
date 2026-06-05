import Link from 'next/link';
import Image from 'next/image';

const collections = [
  {
    name: 'Oud Royale',
    count: '12 Fragrances',
    slug: 'oud-royale',
    description: 'The pinnacle of Arabian luxury',
    image: '/assets/pics/collections/images.jpeg',
  },
  {
    name: 'Midnight Musk',
    count: '8 Fragrances',
    slug: 'midnight-musk',
    description: 'Dark, mysterious, unforgettable',
    image: '/assets/pics/collections/shopping.jpeg',
  },
  {
    name: 'Rose & Amber',
    count: '10 Fragrances',
    slug: 'rose-amber',
    description: 'Romance in every note',
    image: '/assets/pics/collections/shopping-2.jpeg',
  },
  {
    name: 'Bakhoor Noir',
    count: '6 Fragrances',
    slug: 'bakhoor-noir',
    description: 'Ancient incense reimagined',
    image: '/assets/pics/collections/images.jpeg',
  },
];

export const metadata = {
  title: 'Our Collections | ADEEB Perfumes',
  description: 'Explore our curated collections of masterfully crafted fragrances.',
};

export default function CollectionsPage() {
  return (
    <div className="py-24 px-6 md:px-[60px] max-w-[1440px] mx-auto min-h-screen">
      <div className="text-center max-w-2xl mx-auto mb-16 border-b border-gold/20 pb-12">
        <h1 className="font-display text-4xl md:text-5xl text-ivory mb-6 font-light">Our Collections</h1>
        <p className="text-smoke text-lg">
          Discover our masterfully crafted fragrance collections, each telling a unique story through scent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
        {collections.map((collection, index) => (
          <Link 
            key={index}
            href={`/collections/${collection.slug}`}
            className="group block relative h-[400px] md:h-[500px] overflow-hidden rounded-xl bg-charcoal border border-gold/10"
          >
            <div className="absolute inset-0">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-700 group-hover:scale-105"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-gold text-xs tracking-widest uppercase mb-2">{collection.count}</p>
                <h3 className="font-display text-3xl text-ivory mb-3">{collection.name}</h3>
                <p className="text-smoke opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {collection.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
