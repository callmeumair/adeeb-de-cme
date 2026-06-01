'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const tiles = [
  { gradient: 'from-deep via-charcoal/80 to-deep' },
  { gradient: 'from-charcoal via-deep/80 to-charcoal' },
  { gradient: 'from-deep via-charcoal/60 to-deep' },
  { gradient: 'from-charcoal via-deep/60 to-charcoal' },
  { gradient: 'from-deep via-charcoal/80 to-deep' },
  { gradient: 'from-charcoal via-deep/80 to-charcoal' },
];

function TileWatermark() {
  return (
    <svg
      width="60"
      height="100"
      viewBox="0 0 60 100"
      fill="none"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08]"
    >
      <rect x="22" y="3" width="16" height="6" rx="1" stroke="#c9a84c" strokeWidth="0.8" />
      <rect x="20" y="9" width="20" height="14" rx="1" stroke="#c9a84c" strokeWidth="0.8" />
      <path
        d="M26 23 L26 30 Q26 32 23 34 L12 42 Q8 44 8 49 L8 84 Q8 88 12 88 L48 88 Q52 88 52 84 L52 49 Q52 44 48 42 L37 34 Q34 32 34 30 L34 23"
        stroke="#c9a84c"
        strokeWidth="0.8"
      />
      <rect x="6" y="88" width="48" height="5" rx="1" stroke="#c9a84c" strokeWidth="0.8" />
    </svg>
  );
}

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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
        {tiles.map((tile, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <div
              className={`aspect-square bg-gradient-to-br ${tile.gradient} relative group cursor-pointer overflow-hidden`}
            >
              <TileWatermark />

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
