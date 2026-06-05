export default function SustainabilityPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <p className="eyebrow mb-4">THE HOUSE OF ADEEB</p>
        <h1 className="font-display text-4xl md:text-5xl text-ivory font-light">Sustainability</h1>
      </div>
      
      <div className="bg-charcoal p-10 border border-gold/10 text-center space-y-8">
        <p className="text-smoke text-lg leading-relaxed max-w-2xl mx-auto">
          Luxury cannot exist at the expense of our planet. ADEEB DE CME is committed to building a legacy that respects both tradition and the environment.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-gold/10">
          <div>
            <h3 className="font-display text-xl text-gold mb-3">Ethical Sourcing</h3>
            <p className="text-sm text-smoke">Our Oud and rare botanicals are sourced from sustainable plantations that protect natural ecosystems.</p>
          </div>
          <div>
            <h3 className="font-display text-xl text-gold mb-3">Recyclable Packaging</h3>
            <p className="text-sm text-smoke">Our opulent boxes and heavy glass flacons are designed to be entirely recyclable and reusable.</p>
          </div>
          <div>
            <h3 className="font-display text-xl text-gold mb-3">Cruelty-Free</h3>
            <p className="text-sm text-smoke">We strictly adhere to cruelty-free practices. None of our formulations or ingredients are tested on animals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
