'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const tiles = [
  { image: '/assets/pics/pic1.jpg' },
  { image: '/assets/pics/pic2.jpg' },
  { image: '/assets/pics/pic3.jpg' },
  { image: '/assets/pics/pic4.jpg' },
  { image: '/assets/pics/pic5.jpg' },
  { image: '/assets/pics/pic6.jpg' },
  { image: '/assets/pics/pic7.jpg' },
  { image: '/assets/pics/pic8.jpg' },
  { image: '/assets/pics/pic9.jpg' },
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
      <div className="grid grid-cols-3 gap-1">
        {tiles.map((tile, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <div
              className={`aspect-square relative group cursor-pointer overflow-hidden`}
            >
              <Image
                src={tile.image}
                alt={`Instagram post ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/15 transition-all duration-500 flex items-center justify-center">
                <motion.span
                  initial={false}
                  className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"
                >
                  <span className="text-ivory font-body text-xs tracking-[0.2em]">INSTAGRAM</span>
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
          className="text-gold text-sm tracking-[0.3em] font-body uppercase hover:text-gold-light transition-colors"
        >
          Follow us @adeebperfumescme
        </a>
      </motion.div>
    </section>
  );
}
