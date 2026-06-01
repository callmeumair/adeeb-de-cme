'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield } from 'lucide-react';

const pyramidTiers = [
  {
    label: 'Top Notes',
    notes: ['Bergamot', 'Saffron', 'Pink Pepper'],
    duration: 'First 30 minutes',
    indent: 0,
  },
  {
    label: 'Heart Notes',
    notes: ['Oud', 'Rose', 'Jasmine'],
    duration: '2 - 4 hours',
    indent: 1,
  },
  {
    label: 'Base Notes',
    notes: ['Amber', 'Musk', 'Sandalwood'],
    duration: '8 - 12+ hours',
    indent: 2,
  },
];

const performanceBars = [
  { label: 'Longevity', value: 85, detail: '12+ hours' },
  { label: 'Projection', value: 78, detail: 'Strong sillage' },
  { label: 'Concentration', value: 92, detail: 'Eau de Parfum' },
];

function AnimatedBar({
  label,
  value,
  detail,
  delay,
  isInView,
}: {
  label: string;
  value: number;
  detail: string;
  delay: number;
  isInView: boolean;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-ivory text-sm font-body">{label}</span>
        <span className="text-gold text-sm font-body">{value}%</span>
      </div>
      <div className="h-2 bg-gold/10 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-gold to-gold-light"
        />
      </div>
      <p className="text-smoke text-xs mt-1">{detail}</p>
    </div>
  );
}

export function FragrancePyramid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 section-padding bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="eyebrow mb-4">THE SCIENCE OF SCENT</p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory font-light">
            Fragrance Architecture
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column — Pyramid tiers */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {pyramidTiers.map((tier, index) => (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                className="border-l-2 border-gold"
                style={{ paddingLeft: `${24 + tier.indent * 24}px` }}
              >
                <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-body mb-2">
                  {tier.label}
                </p>
                <h3 className="font-display text-lg md:text-xl text-ivory mb-1">
                  {tier.notes.join(' · ')}
                </h3>
                <p className="text-smoke text-xs">{tier.duration}</p>
              </motion.div>
            ))}

            {/* Pyramid visual hint */}
            <div className="pt-4 pl-6">
              <svg
                width="200"
                height="100"
                viewBox="0 0 200 100"
                fill="none"
                className="opacity-20"
              >
                <path
                  d="M100 5 L190 90 L10 90 Z"
                  stroke="#c9a84c"
                  strokeWidth="1"
                  fill="none"
                />
                <line x1="40" y1="55" x2="160" y2="55" stroke="#c9a84c" strokeWidth="0.5" />
                <line x1="60" y1="35" x2="140" y2="35" stroke="#c9a84c" strokeWidth="0.5" />
                <text x="100" y="25" textAnchor="middle" fill="#c9a84c" fontSize="6" fontFamily="serif" letterSpacing="2" opacity="0.7">
                  TOP
                </text>
                <text x="100" y="48" textAnchor="middle" fill="#c9a84c" fontSize="6" fontFamily="serif" letterSpacing="2" opacity="0.7">
                  HEART
                </text>
                <text x="100" y="78" textAnchor="middle" fill="#c9a84c" fontSize="6" fontFamily="serif" letterSpacing="2" opacity="0.7">
                  BASE
                </text>
              </svg>
            </div>
          </motion.div>

          {/* Right column — Performance bars + guarantee */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="font-display text-2xl text-ivory mb-8">
              Performance
            </h3>

            {performanceBars.map((bar, index) => (
              <AnimatedBar
                key={bar.label}
                {...bar}
                delay={0.5 + index * 0.2}
                isInView={isInView}
              />
            ))}

            {/* Guarantee card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="border border-gold/20 p-6 mt-8"
            >
              <div className="flex items-start gap-4">
                <Shield className="text-gold shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-display text-lg text-ivory mb-2">
                    Authenticity Guaranteed
                  </h4>
                  <p className="text-smoke text-sm leading-relaxed">
                    Every ADEEB DE CME fragrance comes with a certificate of
                    authenticity. We source only genuine ingredients and our
                    formulations are crafted in-house to ensure the highest
                    quality standards.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
