'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const collections = [
  {
    name: 'Oud Royale',
    count: '12 Fragrances',
    slug: 'oud-royale',
    description: 'The pinnacle of Arabian luxury',
    gradient: 'from-amber-900/80 via-amber-950/60 to-black',
    accent: '#d4a574',
  },
  {
    name: 'Midnight Musk',
    count: '8 Fragrances',
    slug: 'midnight-musk',
    description: 'Dark, mysterious, unforgettable',
    gradient: 'from-slate-800/80 via-slate-900/60 to-black',
    accent: '#8b9dc3',
  },
  {
    name: 'Rose & Amber',
    count: '10 Fragrances',
    slug: 'rose-amber',
    description: 'Romance in every note',
    gradient: 'from-rose-900/80 via-rose-950/60 to-black',
    accent: '#c9748a',
  },
  {
    name: 'Bakhoor Noir',
    count: '6 Fragrances',
    slug: 'bakhoor-noir',
    description: 'Ancient incense reimagined',
    gradient: 'from-stone-800/80 via-stone-900/60 to-black',
    accent: '#a89984',
  },
];

function PerfumeWatermark({ accent }: { accent: string }) {
  return (
    <svg
      width="120"
      height="180"
      viewBox="0 0 120 180"
      fill="none"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
    >
      <rect x="48" y="5" width="24" height="8" rx="1" stroke={accent} strokeWidth="1" />
      <rect x="44" y="13" width="32" height="22" rx="2" stroke={accent} strokeWidth="1" />
      <path
        d="M52 35 L52 48 Q52 52 48 55 L30 68 Q24 72 24 80 L24 160 Q24 166 30 166 L90 166 Q96 166 96 160 L96 80 Q96 72 90 68 L72 55 Q68 52 68 48 L68 35"
        stroke={accent}
        strokeWidth="1"
      />
      <line x1="32" y1="166" x2="88" y2="166" stroke={accent} strokeWidth="1" />
    </svg>
  );
}

export function FeaturedCollections() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 section-padding bg-black">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="eyebrow mb-4">OUR COLLECTIONS</p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory font-light">
            Curated Masterpieces
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={index === 0 ? 'md:row-span-2' : ''}
            >
              <Link href={`/shop/${collection.slug}`} className="block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className={`relative overflow-hidden group cursor-pointer ${
                    index === 0 ? 'h-80 md:h-full min-h-[300px]' : 'h-80'
                  }`}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${collection.gradient} opacity-80`}
                  />

                  {/* Decorative watermark */}
                  <PerfumeWatermark accent={collection.accent} />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-body mb-2">
                        {collection.count}
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl text-ivory mb-1">
                        {collection.name}
                      </h3>
                      <p className="text-smoke text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {collection.description}
                      </p>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 w-8 h-8">
                    <div className="absolute top-0 right-0 w-full h-px bg-gold/30" />
                    <div className="absolute top-0 right-0 h-full w-px bg-gold/30" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
