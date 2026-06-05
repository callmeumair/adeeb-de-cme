'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const features = [
  {
    number: '01',
    icon: '♦',
    title: 'Rare Ingredients',
    desc: 'Sourced from the finest plantations across Arabia, India, and Southeast Asia.',
  },
  {
    number: '02',
    icon: '✦',
    title: 'Master Crafted',
    desc: 'Each fragrance is composed by master perfumers with decades of expertise.',
  },
  {
    number: '03',
    icon: '♢',
    title: 'Long Lasting',
    desc: 'Our EDP concentration ensures 12+ hours of captivating sillage.',
  },
  {
    number: '04',
    icon: '✶',
    title: 'Luxury Packaging',
    desc: 'Presented in handcrafted boxes worthy of the precious contents within.',
  },
];

function FeatureCard({
  feature,
  index,
  isInView,
}: {
  feature: (typeof features)[0];
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-charcoal p-8 group overflow-hidden cursor-default"
    >
      {/* Hover gold tint */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundColor: 'rgba(201,168,76,0.03)' }}
      />

      {/* Large faint number */}
      <span className="absolute top-4 right-4 text-6xl font-display text-ivory/[0.04] select-none leading-none">
        {feature.number}
      </span>

      {/* Content */}
      <div className="relative z-10">
        <span className="text-3xl text-gold mb-4 block">{feature.icon}</span>
        <h3 className="font-display text-xl text-ivory mb-2">
          {feature.title}
        </h3>
        <p className="text-smoke text-sm leading-relaxed">{feature.desc}</p>
      </div>

      {/* Bottom gold sweep line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden">
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="h-full bg-gold origin-left"
        />
      </div>
    </motion.div>
  );
}

export function WhyChoose() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 section-padding bg-deep" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">THE ADEEB DIFFERENCE</p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory font-light">
            Why Choose Us
          </h2>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.number}
              feature={feature}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
