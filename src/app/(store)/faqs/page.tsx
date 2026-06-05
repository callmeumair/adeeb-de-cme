export default function FAQsPage() {
  const faqs = [
    { q: "What is the concentration of your fragrances?", a: "All ADEEB DE CME fragrances are Extrait de Parfum or Eau de Parfum concentration, ensuring 12+ hours of exceptional longevity and sillage." },
    { q: "Are your ingredients ethically sourced?", a: "Yes. We pride ourselves on sourcing our rare ingredients, including Oud and Musk, from ethical and sustainable plantations across the globe." },
    { q: "Can I sample a fragrance before buying a full bottle?", a: "We occasionally offer discovery sets. Please check our Collections page or contact customer care for availability." },
    { q: "Where is the brand based?", a: "We are proudly based in Solapur, Maharashtra, India. Our heritage stems from the CMÉ hospitality brand, located at B-21, Hotgi Road." }
  ];

  return (
    <div className="py-24 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <p className="eyebrow mb-4">CUSTOMER CARE</p>
        <h1 className="font-display text-4xl md:text-5xl text-ivory font-light">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-charcoal p-8 border border-gold/10 hover:border-gold/30 transition-colors">
            <h3 className="font-display text-xl text-ivory mb-4">{faq.q}</h3>
            <p className="text-smoke leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
