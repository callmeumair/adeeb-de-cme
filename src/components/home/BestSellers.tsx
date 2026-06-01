'use client';

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
};

function BottleSilhouette({ category }: { category: string }) {
  const colors: Record<string, string> = {
    Oud: '#d4a574',
    Musk: '#a0a0a0',
    Rose: '#c9748a',
    Woody: '#7a9a6a',
    Oriental: '#d4944c',
  };
  const color = colors[category] || '#c9a84c';

  return (
    <svg
      width="80"
      height="140"
      viewBox="0 0 80 140"
      fill="none"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
    >
      <rect x="32" y="4" width="16" height="6" rx="1" stroke={color} strokeWidth="1" />
      <rect x="29" y="10" width="22" height="16" rx="1.5" stroke={color} strokeWidth="1" />
      <path
        d="M34 26 L34 34 Q34 37 31 39 L18 48 Q14 51 14 56 L14 122 Q14 127 19 127 L61 127 Q66 127 66 122 L66 56 Q66 51 62 48 L49 39 Q46 37 46 34 L46 26"
        stroke={color}
        strokeWidth="1"
      />
      <rect x="12" y="127" width="56" height="6" rx="1" stroke={color} strokeWidth="1" />
    </svg>
  );
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              layout
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-charcoal overflow-hidden"
              >
                {/* Image area */}
                <div
                  className={`aspect-[3/4] bg-gradient-to-br ${
                    categoryAccents[product.category] || 'from-deep'
                  } to-charcoal relative overflow-hidden`}
                >
                  <BottleSilhouette category={product.category} />

                  {/* Badge */}
                  {product.badge && (
                    <div
                      className={`absolute top-3 left-3 px-3 py-1 text-[9px] tracking-[0.2em] uppercase font-body font-semibold ${
                        badgeColors[product.badge]
                      }`}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Hover actions */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-gold text-black py-3 text-[10px] tracking-[0.2em] uppercase font-body font-semibold hover:bg-gold-light transition-colors">
                      <ShoppingBag size={14} />
                      Add to Cart
                    </button>
                    <button className="w-12 flex items-center justify-center bg-charcoal border border-gold/20 text-gold hover:bg-gold hover:text-black transition-colors">
                      <Heart size={14} />
                    </button>
                  </div>
                </div>

                {/* Info area */}
                <div className="p-4">
                  <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-body mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-display text-lg text-ivory mb-1">
                    {product.name}
                  </h3>
                  <p className="text-smoke text-xs mb-2">
                    {product.topNotes.join(', ')}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={product.rating} />
                    <span className="text-smoke text-[10px]">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
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
