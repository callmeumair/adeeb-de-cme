'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const tiles = [
  { image: '/assets/pics/pic1.jpg', span: 'lg:col-span-2 lg:row-span-2' },
  { image: '/assets/pics/pic2.jpg', span: 'lg:col-span-1' },
  { image: '/assets/pics/pic3.jpg', span: 'lg:col-span-1' },
  { image: '/assets/pics/pic4.jpg', span: 'lg:col-span-2' },
  { image: '/assets/pics/pic5.jpg', span: 'lg:col-span-1' },
  { image: '/assets/pics/pic6.jpg', span: 'lg:col-span-1' },
  { image: '/assets/pics/pic7.jpg', span: 'lg:col-span-1' },
  { image: '/assets/pics/pic8.jpg', span: 'lg:col-span-1' },
  { image: '/assets/pics/pic9.jpg', span: 'lg:col-span-2' },
];

export function InstagramFeed() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-black" ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center section-padding mb-12"
      >
        <p className="eyebrow mb-4">FOLLOW THE JOURNEY</p>
        <h2 className="font-display text-4xl md:text-5xl text-ivory font-light">
          @adeebperfumescme
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] gap-2 md:gap-3 px-2 md:px-6 lg:px-12">
        {tiles.map((tile, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.55, delay: index * 0.07, ease: 'easeOut' }}
            className={tile.span}
          >
            <div
              className="relative group cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-charcoal h-full"
            >
              <Image
                src={tile.image}
                alt={`Instagram post ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/12 transition-all duration-500 flex items-end justify-start p-5">
                <motion.span
                  initial={false}
                  className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                >
                  <span className="text-ivory font-body text-[10px] tracking-[0.35em] uppercase">
                    Instagram
                  </span>
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Follow link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center mt-10"
      >
        <a
          href="https://instagram.com/adeebperfumescme"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-gold/15 bg-white/5 px-5 py-3 text-gold text-xs tracking-[0.3em] font-body uppercase hover:border-gold/40 hover:bg-gold/10 transition-all duration-300"
        >
          Follow us @adeebperfumescme
        </a>
      </motion.div>
    </section>
  );
}
