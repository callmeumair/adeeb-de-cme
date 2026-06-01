'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

const menuLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/collections', label: 'Collections' },
  { href: '/about', label: 'Our Story' },
  { href: '/account', label: 'Account' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Twitter', href: 'https://x.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export function MobileMenu() {
  const { mobileMenuOpen, closeAll } = useUIStore();

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[60] bg-black flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 h-20">
            <span className="font-display text-xl tracking-[0.3em] text-gold">
              ADEEB DE CME
            </span>
            <button
              onClick={closeAll}
              aria-label="Close menu"
              className="text-ivory hover:text-gold transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Nav Links */}
          <motion.nav
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-1 flex-col items-center justify-center gap-8"
          >
            {menuLinks.map((link) => (
              <motion.div key={link.href} variants={itemVariants}>
                <Link
                  href={link.href}
                  onClick={closeAll}
                  className="font-display text-3xl text-ivory hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Bottom */}
          <div className="px-6 pb-10 flex flex-col items-center gap-6">
            {/* Social Row */}
            <div className="flex items-center gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-smoke hover:text-gold transition-colors text-xs uppercase tracking-[0.2em] font-body"
                >
                  {social.label === 'Instagram' ? (
                    <span className="text-[10px]">{social.label}</span>
                  ) : (
                    <span className="text-[10px]">{social.label}</span>
                  )}
                </a>
              ))}
            </div>

            {/* Contact */}
            <a
              href="mailto:hello@adeebdecme.com"
              className="text-smoke hover:text-gold transition-colors text-xs tracking-[0.15em] font-body"
            >
              hello@adeebdecme.com
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
