'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function BrandStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="story" className="py-24 section-padding bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column — Styled image frame */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="border border-gold/20 p-3">
              <div className="aspect-[3/4] bg-charcoal relative overflow-hidden">
                {/* Background Video */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                >
                  <source src="/assets/videos/video2.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-transparent to-deep/30" />

                {/* Corner accents — top-left */}
                <div className="absolute top-4 left-4">
                  <div className="w-8 h-px bg-gold/30" />
                  <div className="w-px h-8 bg-gold/30" />
                </div>
                {/* Corner accents — top-right */}
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-px bg-gold/30 ml-auto" />
                  <div className="w-px h-8 bg-gold/30 ml-auto" />
                </div>
                {/* Corner accents — bottom-left */}
                <div className="absolute bottom-4 left-4">
                  <div className="w-px h-8 bg-gold/30" />
                  <div className="w-8 h-px bg-gold/30" />
                </div>
                {/* Corner accents — bottom-right */}
                <div className="absolute bottom-4 right-4">
                  <div className="w-px h-8 bg-gold/30 ml-auto" />
                  <div className="w-8 h-px bg-gold/30 ml-auto" />
                </div>

                {/* Subtle pattern lines */}
                <div className="absolute inset-0 opacity-[0.03]">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-px bg-gold"
                      style={{ top: `${(i + 1) * 12}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column — Story text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <p className="eyebrow mb-4">OUR HERITAGE</p>
            <h2 className="font-display text-4xl md:text-5xl text-ivory font-light mb-8 leading-tight">
              A Legacy of Arabian Craftsmanship
            </h2>

            <p className="text-smoke leading-relaxed mb-6">
              For generations, the art of perfumery has been woven into the
              fabric of Arabian culture. At ADEEB DE CME, we honour this
              timeless tradition by sourcing the rarest ingredients from the
              ancient oud forests of Southeast Asia, the saffron fields of
              Kashmir, and the rose valleys of Taif.
            </p>

            <p className="text-smoke leading-relaxed mb-8">
              Each fragrance is meticulously composed by master perfumers who
              understand that true luxury lies not in extravagance, but in the
              quiet confidence of wearing something truly exceptional. Our
              creations are an invitation to experience the extraordinary —
              where centuries-old tradition meets modern artistry.
            </p>

            <blockquote className="font-display italic text-xl text-gold border-l-2 border-gold pl-6 my-8 leading-relaxed">
              &ldquo;Every fragrance we create is a journey through the sands
              of time, a story told in notes of oud, rose, and musk.&rdquo;
            </blockquote>

            <p className="font-display italic text-gold-light text-lg">
              — Adeeb, Founder
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
