'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/hooks/useToast';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

// Validation Schema for Address
const addressSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  line1: z.string().min(5, 'Address is required'),
  line2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().min(6, 'Valid pincode is required'),
  country: z.string().min(2, 'Country is required'),
});

type AddressFormData = z.infer<typeof addressSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const toast = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: 'India',
    }
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !isProcessing) {
      router.push('/shop');
    }
  }, [items, router, isProcessing]);

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const onSubmit = async (data: AddressFormData) => {
    if (items.length === 0) return;
    setIsProcessing(true);

    try {
      // 1. Create order on backend
      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });
      
      const orderData = await res.json();
      
      if (!res.ok) throw new Error(orderData?.error || 'Failed to create order');

      // 2. Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ADEEB DE CME',
        description: 'Luxury Perfume Purchase',
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            // 3. Verify Payment
            const verifyRes = await fetch('/api/checkout/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                items,
                address: data,
                subtotal: total,
                shipping: 0,
                total,
              }),
            });

            const verifyData = await verifyRes.json();
            
            if (!verifyRes.ok) {
              throw new Error(verifyData?.error || `Verification failed with status ${verifyRes.status}`);
            }

            if (verifyData.success) {
              clearCart();
              toast.success('Payment successful! Your order has been placed.');
              setTimeout(() => router.push('/checkout/success'), 500);
            } else {
              throw new Error(verifyData?.error || 'Payment verification failed');
            }
          } catch (error: any) {
            console.error('Payment verification error:', error);
            toast.error(error.message || 'Payment verification failed. Please contact support.');
            setIsProcessing(false);
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: '#c9a84c',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        toast.error('Payment failed. Please try again.');
        setIsProcessing(false);
      });

      rzp.open();
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) return null; // Avoid flicker before redirect

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <h1 className="font-display text-4xl text-ivory mb-12 uppercase tracking-widest text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-charcoal p-8 border border-gold/10">
              <h2 className="font-display text-2xl text-gold mb-6 border-b border-gold/10 pb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-smoke mb-2">Full Name</label>
                  <input 
                    {...register('name')} 
                    className="w-full bg-deep border border-gold/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors font-body text-sm"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-smoke mb-2">Email Address</label>
                  <input 
                    {...register('email')} 
                    type="email"
                    className="w-full bg-deep border border-gold/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors font-body text-sm"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-smoke mb-2">Phone Number</label>
                  <input 
                    {...register('phone')} 
                    className="w-full bg-deep border border-gold/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors font-body text-sm"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            <div className="bg-charcoal p-8 border border-gold/10">
              <h2 className="font-display text-2xl text-gold mb-6 border-b border-gold/10 pb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-smoke mb-2">Address Line 1</label>
                  <input 
                    {...register('line1')} 
                    className="w-full bg-deep border border-gold/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors font-body text-sm"
                  />
                  {errors.line1 && <p className="text-red-400 text-xs mt-1">{errors.line1.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-smoke mb-2">Address Line 2 (Optional)</label>
                  <input 
                    {...register('line2')} 
                    className="w-full bg-deep border border-gold/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors font-body text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-smoke mb-2">City</label>
                  <input 
                    {...register('city')} 
                    className="w-full bg-deep border border-gold/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors font-body text-sm"
                  />
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-smoke mb-2">State</label>
                  <input 
                    {...register('state')} 
                    className="w-full bg-deep border border-gold/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors font-body text-sm"
                  />
                  {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state.message}</p>}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-smoke mb-2">Pincode</label>
                  <input 
                    {...register('pincode')} 
                    className="w-full bg-deep border border-gold/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors font-body text-sm"
                  />
                  {errors.pincode && <p className="text-red-400 text-xs mt-1">{errors.pincode.message}</p>}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-smoke mb-2">Country</label>
                  <input 
                    {...register('country')} 
                    readOnly
                    className="w-full bg-deep border border-gold/20 text-smoke p-3 focus:outline-none cursor-not-allowed font-body text-sm"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-charcoal p-8 border border-gold/10 sticky top-32">
            <h2 className="font-display text-2xl text-gold mb-6 border-b border-gold/10 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-20 w-16 bg-deep shrink-0 border border-gold/5">
                    <Image
                      src={item.image || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=200&auto=format&fit=crop'}
                      alt={item.name}
                      fill
                      className="object-cover opacity-80"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-display text-ivory text-sm line-clamp-1">{item.name}</h3>
                    <p className="text-smoke text-[10px] tracking-wider uppercase mt-1">
                      {item.size} × {item.quantity}
                    </p>
                    <p className="text-gold font-body text-sm mt-1">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gold/10 pt-4 space-y-3 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-smoke uppercase tracking-wider text-xs">Subtotal</span>
                <span className="text-ivory">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-smoke uppercase tracking-wider text-xs">Shipping</span>
                <span className="text-gold uppercase tracking-wider text-xs">Free</span>
              </div>
              <div className="flex justify-between text-lg pt-3 border-t border-gold/10 mt-3">
                <span className="font-display text-ivory tracking-wider">TOTAL</span>
                <span className="font-body text-gold">{formatPrice(total)}</span>
              </div>
            </div>

            <Button 
              type="submit" 
              form="checkout-form"
              variant="primary" 
              size="lg" 
              className="w-full"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Proceed to Payment'}
            </Button>
            
            <p className="text-center text-[10px] text-smoke mt-4 uppercase tracking-widest">
              Secure Checkout via Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
