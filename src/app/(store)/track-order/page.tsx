'use client';
import { useState } from 'react';

export default function TrackOrderPage() {
  const [tracking, setTracking] = useState(false);
  const [status, setStatus] = useState<any>(null);

  const handleTrack = (e: any) => {
    e.preventDefault();
    setTracking(true);
    setTimeout(() => {
      setTracking(false);
      setStatus({ stage: 'In Transit', location: 'Solapur Hub', eta: '2 Days' });
    }, 1500);
  };

  return (
    <div className="py-32 px-6 max-w-3xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <p className="eyebrow mb-4">CUSTOMER CARE</p>
        <h1 className="font-display text-4xl md:text-5xl text-ivory font-light mb-6">Track Your Order</h1>
        <p className="text-smoke">Enter your Order ID and Email Address to track your shipment's journey.</p>
      </div>

      <div className="bg-charcoal p-8 md:p-12 border border-gold/10">
        <form onSubmit={handleTrack} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-smoke mb-2">Order ID</label>
            <input required placeholder="e.g. ADEEB-10294" className="w-full bg-deep border border-gold/20 text-ivory p-4 focus:outline-none focus:border-gold transition-colors font-body" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-smoke mb-2">Email Address</label>
            <input required type="email" placeholder="Email used during checkout" className="w-full bg-deep border border-gold/20 text-ivory p-4 focus:outline-none focus:border-gold transition-colors font-body" />
          </div>
          <button type="submit" disabled={tracking} className="w-full bg-gold text-black py-4 uppercase tracking-[0.2em] font-medium hover:bg-gold-light transition disabled:opacity-50">
            {tracking ? 'Locating...' : 'Track Order'}
          </button>
        </form>

        {status && (
          <div className="mt-12 pt-8 border-t border-gold/10 animate-fade-in">
            <h3 className="font-display text-2xl text-gold mb-6">Current Status: {status.stage}</h3>
            <div className="space-y-4 text-smoke">
              <div className="flex justify-between border-b border-gold/5 pb-2">
                <span className="uppercase text-xs tracking-widest">Last Location</span>
                <span className="text-ivory">{status.location}</span>
              </div>
              <div className="flex justify-between border-b border-gold/5 pb-2">
                <span className="uppercase text-xs tracking-widest">Estimated Delivery</span>
                <span className="text-ivory">{status.eta}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
