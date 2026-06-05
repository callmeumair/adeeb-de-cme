import Image from 'next/image';
import Link from 'next/link';
import { GoldDivider } from '@/components/ui/GoldDivider';

const collections = [
  {
    href: '/collections/oud-royale',
    label: 'Oud Royale',
    image: '/assets/pics/collections/images.jpeg',
  },
  {
    href: '/collections/midnight-musk',
    label: 'Midnight Musk',
    image: '/assets/pics/collections/shopping.jpeg',
  },
  {
    href: '/collections/rose-amber',
    label: 'Rose & Amber',
    image: '/assets/pics/collections/shopping-2.jpeg',
  },
  {
    href: '/collections/bakhoor-noir',
    label: 'Bakhoor Noir',
    image: '/assets/pics/collections/images.jpeg',
  },
  {
    href: '/shop?sort=newest',
    label: 'New Arrivals',
    image: '/assets/pics/collections/shopping.jpeg',
  },
];

const customerCare = [
  { href: '/contact', label: 'Contact Us' },
  { href: '/shipping', label: 'Shipping Info' },
  { href: '/returns', label: 'Returns & Exchange' },
  { href: '/track-order', label: 'Track Order' },
  { href: '/faqs', label: 'FAQs' },
];

const theHouse = [
  { href: '/about', label: 'Our Story' },
  { href: '/craftsmanship', label: 'Craftsmanship' },
  { href: '/sustainability', label: 'Sustainability' },
  { href: '/press', label: 'Press' },
  { href: '/careers', label: 'Careers' },
];

const socialLinks = [
  { label: 'IG', fullLabel: 'Instagram', href: 'https://www.instagram.com/adeebperfumescme?igsh=MTlybWtzaDlzMXNmaA==' },
  { label: 'X', fullLabel: 'Twitter', href: 'https://x.com' },
  { label: 'FB', fullLabel: 'Facebook', href: 'https://facebook.com' },
  { label: 'YT', fullLabel: 'YouTube', href: 'https://youtube.com' },
];

const paymentMethods = ['UPI', 'Visa', 'Mastercard', 'Razorpay'];

export function Footer() {
  return (
    <footer className="bg-black border-t border-gold/10">
      {/* Main Grid */}
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl tracking-[0.3em] text-gold">
                ADEEB DE CME
              </span>
            </Link>
            <p className="mt-4 font-display text-sm italic text-smoke leading-relaxed">
              Where artistry meets fragrance
            </p>

            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.fullLabel}
                  className="flex h-10 w-10 items-center justify-center border border-gold/20 text-smoke hover:text-gold hover:border-gold/50 transition-all duration-300 text-[10px] font-body uppercase tracking-wider"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Collections */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-body font-medium">
              Collections
            </h4>
            <ul className="space-y-3">
              {collections.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group flex items-center gap-3">
                    <span className="relative h-14 w-14 overflow-hidden border border-gold/10 bg-charcoal shrink-0">
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </span>
                    <span className="text-smoke group-hover:text-gold text-sm transition-colors duration-300">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Customer Care */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-body font-medium">
              Customer Care
            </h4>
            <ul className="space-y-3">
              {customerCare.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-smoke hover:text-gold text-sm transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — The House */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-body font-medium">
              The House
            </h4>
            <ul className="space-y-3">
              {theHouse.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-smoke hover:text-gold text-sm transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <GoldDivider className="mx-6 lg:mx-12" />

      {/* Bottom Bar */}
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-smoke/60 text-xs tracking-wide font-body">
            &copy; {new Date().getFullYear()} ADEEB DE CME. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="px-3 py-1 border border-gold/10 text-smoke/50 text-[9px] font-body uppercase tracking-wider"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
