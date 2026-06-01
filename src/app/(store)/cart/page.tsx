'use client';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function CartPage() {
  const { items, total } = useCartStore();
  return (
    <div className="py-24 px-6 md:px-[60px] max-w-[1440px] mx-auto min-h-[60vh]">
      <h1 className="font-display text-4xl text-ivory mb-8 border-b border-gold/20 pb-4">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-20 text-smoke">Your cart is empty. <Link href="/shop" className="text-gold hover:underline">Continue Shopping</Link></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
             {items.map(i => (
               <div key={i.id} className="flex gap-4 border border-gold/10 p-4">
                 <div className="font-body text-ivory">{i.name} - {i.size}</div>
                 <div className="ml-auto text-gold">{i.price} x {i.quantity}</div>
               </div>
             ))}
          </div>
          <div className="bg-charcoal p-6 border border-gold/20 h-fit">
            <h3 className="font-display text-2xl text-ivory mb-4">Summary</h3>
            <div className="flex justify-between text-smoke mb-4"><span>Subtotal</span><span>{total}</span></div>
            <Link href="/checkout" className="block w-full bg-gold text-black text-center py-3 uppercase tracking-widest font-bold">Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}
