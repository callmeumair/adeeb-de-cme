import type { Metadata } from 'next';
import { Cormorant_Garamond, Josefin_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { CustomCursor } from '@/components/ui/Cursor';
import { Toaster } from 'react-hot-toast';
import { MobileMenu } from '@/components/layout/MobileMenu';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ADEEB DE CME | Luxury Arabian Perfumes',
  description: 'Discover the finest luxury Arabian perfumes. Handcrafted fragrances with premium oud, musk, rose & amber. Free shipping across India.',
  keywords: ['luxury perfume', 'arabian perfume', 'oud', 'musk', 'rose', 'amber', 'ADEEB DE CME'],
  openGraph: {
    title: 'ADEEB DE CME | Luxury Arabian Perfumes',
    description: 'Discover the finest luxury Arabian perfumes.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'ADEEB DE CME',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${josefin.variable}`}>
      <body className="bg-black text-ivory font-body antialiased flex flex-col min-h-screen">
        <CustomCursor />
        <Navbar />
        <CartDrawer />
        <MobileMenu />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#f8f4ed',
              border: '1px solid rgba(201,168,76,0.2)',
              fontFamily: 'var(--font-body)',
            },
          }}
        />
      </body>
    </html>
  );
}
