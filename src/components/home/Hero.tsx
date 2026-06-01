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
            className="flex flex-col max-w-3xl"
          >
            <motion.p
              variants={childVariants}
              className="text-[9px] tracking-[0.5em] uppercase text-gold font-body mb-4"
            >
              THE ART OF ARABIAN PERFUMERY
            </motion.p>

            <motion.h1
              variants={childVariants}
              className="font-display text-5xl md:text-7xl font-light text-ivory leading-tight"
            >
              Where Every Drop Tells a Story of{' '}
              <em className="text-gold italic">Timeless</em> Elegance
            </motion.h1>

            <motion.p
              variants={childVariants}
              className="text-smoke text-base max-w-md mt-6 leading-relaxed"
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
