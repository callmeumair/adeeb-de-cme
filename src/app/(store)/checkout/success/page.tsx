import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CheckoutSuccessPage() {
  return (
    <div className="py-32 px-6 max-w-3xl mx-auto min-h-[70vh] flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-8 border border-gold/20">
        <CheckCircle className="h-10 w-10 text-gold" />
      </div>
      
      <h1 className="font-display text-4xl text-ivory mb-4 uppercase tracking-widest">Order Confirmed</h1>
      <p className="text-smoke font-body text-lg mb-12 max-w-md mx-auto">
        Thank you for your purchase. Your luxury fragrance journey is about to begin. We'll email you a tracking link once your order ships.
      </p>

      <div className="bg-charcoal border border-gold/10 p-8 w-full max-w-lg mb-12 flex flex-col gap-4">
        <div className="flex items-center justify-center gap-3 text-gold mb-4 border-b border-gold/10 pb-4">
          <Package className="h-5 w-5" />
          <span className="font-display text-xl tracking-widest uppercase">Premium Packaging</span>
        </div>
        <p className="text-smoke text-sm text-center">
          Your items will be carefully packed in our signature ADEEB DE CME luxury unboxing experience.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/shop">
          <Button variant="primary" size="lg" className="w-full sm:w-auto">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
