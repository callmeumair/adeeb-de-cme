'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';

const mockProducts = [
  {
    id: '1',
    name: 'Royal Oud Intense',
    slug: 'royal-oud-intense',
    price: 4999,
    originalPrice: 6999,
    category: 'Oud',
    badge: 'BESTSELLER',
    image: '/assets/pics/pic1.jpg',
    topNotes: ['Saffron', 'Bergamot'],
    heartNotes: ['Oud', 'Rose'],
    baseNotes: ['Musk', 'Amber'],
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Midnight Musk Elixir',
    slug: 'midnight-musk-elixir',
    price: 3499,
    originalPrice: null,
    category: 'Musk',
    badge: 'NEW',
    image: '/assets/pics/pic2.jpg',
    topNotes: ['Black Pepper', 'Cardamom'],
    heartNotes: ['White Musk', 'Orris'],
    baseNotes: ['Vetiver', 'Cedarwood'],
    rating: 4.6,
    reviews: 87,
  },
  {
    id: '3',
    name: 'Rose de Arabia',
    slug: 'rose-de-arabia',
    price: 5499,
    originalPrice: 7499,
    category: 'Rose',
    badge: 'SALE',
    image: '/assets/pics/pic3.jpg',
    topNotes: ['Pink Pepper', 'Lychee'],
    heartNotes: ['Damask Rose', 'Peony'],
    baseNotes: ['Patchouli', 'Vanilla'],
    rating: 4.9,
    reviews: 203,
  },
  {
    id: '4',
    name: 'Amber Noir',
    slug: 'amber-noir',
    price: 4299,
    originalPrice: null,
    category: 'Woody',
    badge: null,
    image: '/assets/pics/pic4.jpg',
    topNotes: ['Bergamot', 'Elemi'],
    heartNotes: ['Amber', 'Labdanum'],
    baseNotes: ['Sandalwood', 'Benzoin'],
    rating: 4.7,
    reviews: 96,
  },
  {
    id: '5',
    name: "Sultan's Oud",
    slug: 'sultans-oud',
    price: 7999,
    originalPrice: 9999,
    category: 'Oud',
    badge: 'LIMITED',
    image: '/assets/pics/pic5.jpg',
    topNotes: ['Saffron', 'Cinnamon'],
    heartNotes: ['Cambodian Oud', 'Turkish Rose'],
    baseNotes: ['Musk', 'Ambergris'],
    rating: 5.0,
    reviews: 58,
  },
  {
    id: '6',
    name: 'Velvet Rose',
    slug: 'velvet-rose',
    price: 3999,
    originalPrice: null,
    category: 'Rose',
    badge: null,
    image: '/assets/pics/pic6.jpg',
    topNotes: ['Raspberry', 'Bergamot'],
    heartNotes: ['Bulgarian Rose', 'Jasmine'],
    baseNotes: ['Cashmeran', 'White Musk'],
    rating: 4.5,
    reviews: 142,
  },
  {
    id: '7',
    name: 'Dark Saffron',
    slug: 'dark-saffron',
    price: 5999,
    originalPrice: null,
    category: 'Oriental',
    badge: 'NEW',
    image: '/assets/pics/pic7.jpg',
    topNotes: ['Saffron', 'Nutmeg'],
    heartNotes: ['Oud', 'Leather'],
    baseNotes: ['Amber', 'Tonka Bean'],
    rating: 4.8,
    reviews: 67,
  },
  {
    id: '8',
    name: 'White Musk Premium',
    slug: 'white-musk-premium',
    price: 2999,
    originalPrice: 3999,
    category: 'Musk',
    badge: null,
    image: '/assets/pics/pic8.jpg',
    topNotes: ['Aldehydes', 'Lily'],
    heartNotes: ['White Musk', 'Iris'],
    baseNotes: ['Sandalwood', 'Cedarwood'],
    rating: 4.4,
    reviews: 189,
  },
];

const categories = ['All', 'Oud', 'Musk', 'Rose', 'Woody', 'Oriental'];

const badgeColors: Record<string, string> = {
  BESTSELLER: 'bg-gold text-black',
  NEW: 'bg-ivory text-black',
  SALE: 'bg-rose-600 text-white',
  LIMITED: 'bg-amber-700 text-white',
};

const categoryAccents: Record<string, string> = {
  Oud: 'from-amber-900/30',
  Musk: 'from-slate-700/30',
  Rose: 'from-rose-900/30',
  Woody: 'from-emerald-900/30',
  Oriental: 'from-orange-900/30',
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={
            star <= Math.round(rating)
              ? 'fill-gold text-gold'
              : 'fill-none text-gold/30'
          }
        />
      ))}
    </div>
  );
}

export function BestSellers() {
  const [activeTab, setActiveTab] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filtered =
    activeTab === 'All'
      ? mockProducts
      : mockProducts.filter((p) => p.category === activeTab);

  return (
    <section className="py-24 section-padding bg-deep" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="eyebrow mb-4">CURATED FOR YOU</p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory font-light">
            Our Best Sellers
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-6 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`text-xs tracking-[0.3em] uppercase font-body pb-2 transition-all duration-300 border-b-2 ${
                activeTab === cat
                  ? 'text-gold border-gold'
                  : 'text-smoke border-transparent hover:text-ivory'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-7">
          {filtered.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              layout
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="group relative overflow-hidden rounded-[1.35rem] border border-white/5 bg-[#111111] shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
              >
                {/* Image area */}
                <div
                  className={`relative aspect-[3/4] overflow-hidden bg-gradient-to-br ${
                    categoryAccents[product.category] || 'from-deep'
                  } to-charcoal`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.18),transparent_38%)]" />

                  {/* Badge */}
                  {product.badge && (
                    <div
                      className={`absolute top-3 left-3 z-10 px-3 py-1 text-[9px] tracking-[0.2em] uppercase font-body font-semibold rounded-sm ${
                        badgeColors[product.badge]
                      }`}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Hover actions */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-2 translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-300">
                    <button className="flex-1 flex items-center justify-center gap-2 rounded-md bg-gold text-black py-3 text-[10px] tracking-[0.2em] uppercase font-body font-semibold hover:bg-gold-light transition-colors shadow-[0_10px_24px_rgba(201,168,76,0.15)]">
                      <ShoppingBag size={14} />
                      Add to Cart
                    </button>
                    <button className="w-12 flex items-center justify-center rounded-md bg-black/60 border border-gold/20 text-gold hover:bg-gold hover:text-black transition-colors backdrop-blur-sm">
                      <Heart size={14} />
                    </button>
                  </div>
                </div>

                {/* Info area */}
                <div className="p-4 md:p-5">
                  <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-body mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-display text-lg text-ivory mb-1 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-smoke text-xs mb-2 line-clamp-1">
                    {product.topNotes.join(', ')}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={product.rating} />
                    <span className="text-smoke text-[10px]">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-gold font-body font-semibold">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-smoke line-through text-sm">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
