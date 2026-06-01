'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'The Royal Oud Intense is unlike anything I\'ve experienced. The sillage is extraordinary — I receive compliments hours after application.',
    name: 'Arjun Mehta',
    location: 'Mumbai',
    rating: 5,
  },
  {
    quote:
      'ADEEB DE CME has redefined luxury for me. The Rose de Arabia is pure poetry in a bottle. Exquisite packaging too.',
    name: 'Priya Sharma',
    location: 'Delhi',
    rating: 5,
  },
  {
    quote:
      'As a fragrance collector, I can say these are genuine Arabian craftsmanship. The ingredients are top-tier and the longevity is remarkable.',
    name: 'Khalid Rahman',
    location: 'Hyderabad',
    rating: 5,
  },
  {
    quote:
      "Gifted the Sultan's Oud to my father and he was absolutely mesmerized. The presentation and quality exceeded all expectations.",
    name: 'Sneha Patel',
    location: 'Bangalore',
    rating: 5,
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const currentTestimonial = testimonials[active];

  return (
    <section className="py-24 section-padding bg-deep" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-12"
        >
          WHAT THEY SAY
        </motion.p>

        {/* Large decorative quotation mark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-8xl text-gold/10 leading-none select-none mb-4"
        >
          &ldquo;
        </motion.div>

        {/* Testimonial content */}
        <div className="min-h-[280px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <p className="font-display italic text-2xl md:text-3xl text-ivory leading-relaxed text-center mb-8">
                {currentTestimonial.quote}
              </p>

              {/* Star rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-gold text-gold"
                  />
                ))}
              </div>

              <p className="text-gold font-body text-sm tracking-[0.3em] uppercase">
                {currentTestimonial.name}
              </p>
              <p className="text-smoke text-xs mt-1">
                {currentTestimonial.location}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? 'w-3 h-3 bg-gold'
                  : 'w-2 h-2 bg-gold/20 hover:bg-gold/40'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
