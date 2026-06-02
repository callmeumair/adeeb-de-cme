'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
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
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`relative overflow-hidden group cursor-pointer rounded-[1.5rem] border border-gold/10 bg-charcoal shadow-[0_20px_60px_rgba(0,0,0,0.35)] ${
                    index === 0 ? 'h-[24rem] md:h-full md:min-h-[34rem]' : 'h-[18rem] md:h-[20rem]'
                  }`}
                >
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    priority={index === 0}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.16),transparent_35%)] opacity-80" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/8 transition-colors duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <p className="text-gold text-[10px] tracking-[0.35em] uppercase font-body mb-2">
                        {collection.count}
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl text-ivory mb-2">
                        {collection.name}
                      </h3>
                      <p className="text-smoke text-sm max-w-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        {collection.description}
                      </p>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 w-8 h-8 opacity-70 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute top-0 right-0 w-full h-px bg-gold/35" />
                    <div className="absolute top-0 right-0 h-full w-px bg-gold/35" />
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
