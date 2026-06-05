export default function ReturnsPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto min-h-screen">
      <h1 className="font-display text-4xl md:text-5xl text-ivory font-light mb-12 text-center">Returns & Exchange</h1>
      <div className="bg-charcoal p-8 md:p-12 border border-gold/10 space-y-8 text-smoke leading-relaxed">

        <section>
          <h2 className="font-display text-2xl text-gold mb-4">Our Return Policy</h2>
          <p>At ADEEB DE CME, your satisfaction is paramount. We accept returns and exchanges within 14 days of delivery. Due to the personal nature of our products, items must be returned in their original, unopened packaging with the cellophane seal intact.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-gold mb-4">How to Initiate a Return</h2>
          <ol className="list-decimal pl-5 space-y-2 mt-4">
            <li>Contact our Customer Care team at <a href="mailto:info@cmefood.com" className="text-gold">info@cmefood.com</a> with your Order ID.</li>
            <li>We will provide you with a Return Authorization (RA) number and shipping instructions.</li>
            <li>Pack the item securely and ship it back to our Solapur boutique.</li>
          </ol>
        </section>

        <section>
          <h2 className="font-display text-2xl text-gold mb-4">Refunds</h2>
          <p>Once your return is received and inspected, we will send an email notification. Approved refunds will be processed automatically to your original method of payment within 5-7 business days.</p>
        </section>
      </div>
    </div>
  );
}
