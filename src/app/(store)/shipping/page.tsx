export default function ShippingPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto min-h-screen">
      <h1 className="font-display text-4xl md:text-5xl text-ivory font-light mb-12 text-center">Shipping Information</h1>
      <div className="bg-charcoal p-8 md:p-12 border border-gold/10 space-y-8 text-smoke leading-relaxed">
        
        <section>
          <h2 className="font-display text-2xl text-gold mb-4">Domestic Shipping (India)</h2>
          <p>All domestic orders are processed within 1-2 business days. We offer complimentary express shipping on all ADEEB DE CME orders within India. Expected delivery is 3-5 business days depending on your location.</p>
        </section>
        
        <section>
          <h2 className="font-display text-2xl text-gold mb-4">International Shipping</h2>
          <p>We ship globally to select countries. International orders are processed within 2-3 business days. Shipping rates are calculated at checkout based on destination. Expected delivery is 7-14 business days. Please note that customers are responsible for any customs duties or import taxes incurred.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-gold mb-4">Order Tracking</h2>
          <p>Once your order has been dispatched, you will receive a confirmation email containing your tracking number. You can monitor your shipment via our <a href="/track-order" className="text-gold hover:underline">Track Order</a> page.</p>
        </section>
      </div>
    </div>
  );
}
