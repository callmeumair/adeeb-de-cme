'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Video background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/assets/videos/video1.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      {/* Radial gold glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.05]"
          style={{
            background:
              'radial-gradient(circle, #c9a84c 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full section-padding py-20">
        <div className="flex flex-col justify-center max-w-7xl mx-auto">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col max-w-4xl"
          >
            <motion.p
              variants={childVariants}
              className="text-[9px] tracking-[0.5em] uppercase text-gold font-body mb-4"
            >
              THE ART OF ARABIAN PERFUMERY
            </motion.p>

            <motion.h1
              variants={childVariants}
              className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-light text-ivory leading-[1.02] max-w-3xl"
            >
              Where Every Drop Tells a Story of{' '}
              <em className="text-gold italic">Timeless</em> Elegance
            </motion.h1>

            <motion.p
              variants={childVariants}
              className="text-smoke text-base md:text-lg max-w-xl mt-6 leading-relaxed"
            >
              Handcrafted in the heart of tradition, our fragrances blend rare
              Arabian oud with contemporary artistry.
            </motion.p>

            <motion.div
              variants={childVariants}
              className="flex flex-wrap gap-4 mt-10"
            >
              <Link href="/shop" className="btn-primary">
                Explore Collections
              </Link>
              <a href="#story" className="btn-secondary">
                Our Heritage
              </a>
            </motion.div>

            <motion.div
              variants={childVariants}
              className="mt-10 flex flex-wrap gap-3 max-w-2xl"
            >
              {['Luxury Oud', 'Authentic Blends', 'Premium Delivery'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gold/15 bg-white/5 px-4 py-2 text-[10px] tracking-[0.25em] uppercase text-smoke backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero side card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hidden xl:block absolute right-12 bottom-24 w-[22rem]"
          >
            <div className="rounded-[1.5rem] border border-gold/10 bg-black/35 backdrop-blur-xl p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
              <p className="text-gold text-[9px] tracking-[0.45em] uppercase font-body mb-4">
                SIGNATURE EXPERIENCE
              </p>
              <div className="space-y-4">
                {[
                  ['01', 'Mastercrafted oud compositions'],
                  ['02', 'Luxury gift-ready packaging'],
                  ['03', 'Same-day dispatch on select orders'],
                ].map(([index, text]) => (
                  <div key={index} className="flex items-start gap-4 border-t border-white/5 pt-4 first:border-t-0 first:pt-0">
                    <span className="font-display text-xl text-ivory/70">{index}</span>
                    <p className="text-smoke text-sm leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-smoke/60 font-body">
          SCROLL
        </span>
        <div className="relative h-12 w-px bg-gold/20 overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-0 left-0 w-full h-3 bg-gradient-to-b from-transparent via-gold to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
