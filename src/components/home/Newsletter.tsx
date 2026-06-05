'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, FormEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success('Welcome to the ADEEB DE CME inner circle', {
      style: {
        background: '#1a1a1a',
        color: '#f8f4ed',
        border: '1px solid rgba(201,168,76,0.3)',
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
      },
      iconTheme: {
        primary: '#c9a84c',
        secondary: '#0a0a0a',
      },
    });
    setEmail('');
  };

  return (
    <section className="py-24 section-padding bg-deep" ref={ref}>
      <Toaster position="bottom-center" />
      <div className="max-w-3xl mx-auto text-center rounded-[2rem] border border-gold/10 bg-gradient-to-b from-white/[0.03] to-transparent px-6 py-12 md:px-10 md:py-14 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">STAY CONNECTED</p>
          <h2 className="font-display text-3xl md:text-4xl text-ivory font-light mb-4">
            Join the Inner Circle
          </h2>
          <p className="text-smoke text-sm leading-relaxed mb-8">
            Be the first to discover new collections, exclusive offers, and
            the art behind our fragrances.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 sm:gap-0 max-w-2xl mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 rounded-full sm:rounded-r-none bg-charcoal/90 border border-gold/20 px-6 py-4 text-ivory font-body text-sm tracking-wide placeholder:text-smoke/50 focus:border-gold focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="bg-gold text-black px-8 py-4 text-xs tracking-[0.3em] uppercase font-body font-medium hover:bg-gold-light transition-colors shrink-0 rounded-full sm:rounded-l-none shadow-[0_12px_30px_rgba(201,168,76,0.2)]"
          >
            Subscribe
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-smoke/45 text-xs mt-4 tracking-[0.18em] uppercase"
        >
          No spam, ever. Unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
}
