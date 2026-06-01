const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n');
  console.log(`Updated ${filePath}`);
};

const components = {
  contact: `
'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Message sent successfully. We will be in touch shortly.');
    e.target.reset();
  };

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <p className="eyebrow mb-4">GET IN TOUCH</p>
        <h1 className="font-display text-4xl md:text-5xl text-ivory font-light">Contact Us</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="bg-charcoal p-10 border border-gold/10">
          <h2 className="font-display text-2xl text-gold mb-8">The House of ADEEB</h2>
          
          <div className="space-y-8 text-smoke">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold mb-2">Email</p>
              <a href="mailto:info@cmefood.com" className="hover:text-ivory transition-colors">info@cmefood.com</a>
            </div>
            
            <div>
              <p className="text-xs uppercase tracking-widest text-gold mb-2">Phone / WhatsApp</p>
              <p>Primary: <a href="tel:+919112803345" className="hover:text-ivory transition-colors">+91 91128 03345</a></p>
              <p className="mt-1">Restaurant: <a href="tel:+919421041162" className="hover:text-ivory transition-colors">+91 94210 41162</a></p>
              <a 
                href="https://wa.me/919112803345" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block mt-4 text-xs tracking-widest uppercase border border-gold/30 px-4 py-2 hover:bg-gold/10 transition-colors text-ivory"
              >
                Message on WhatsApp
              </a>
            </div>
            
            <div>
              <p className="text-xs uppercase tracking-widest text-gold mb-2">Boutique & Office</p>
              <p className="leading-relaxed">
                B-21, Hotgi Road,<br />
                Near Lokmat Office,<br />
                Solapur, Maharashtra, India
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-smoke mb-2">Full Name</label>
                <input required className="w-full bg-charcoal border border-gold/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors font-body text-sm" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-smoke mb-2">Email Address</label>
                <input required type="email" className="w-full bg-charcoal border border-gold/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors font-body text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-smoke mb-2">Inquiry Type</label>
              <select className="w-full bg-charcoal border border-gold/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors font-body text-sm appearance-none">
                <option>General Inquiry</option>
                <option>Order Status</option>
                <option>Fragrance Consultation</option>
                <option>Wholesale & Partnerships</option>
                <option>Travel & Hospitality</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-smoke mb-2">Message</label>
              <textarea required rows={5} className="w-full bg-charcoal border border-gold/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors font-body text-sm"></textarea>
            </div>

            <button type="submit" className="w-full bg-gold text-black py-4 uppercase tracking-[0.2em] font-medium hover:bg-gold-light transition">
              Send Message
            </button>
            {status && <p className="text-gold text-sm text-center mt-4">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
  `,
  trackOrder: `
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
  `,
  about: `
export default function AboutPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <p className="eyebrow mb-4">THE HOUSE OF ADEEB</p>
        <h1 className="font-display text-4xl md:text-6xl text-ivory font-light leading-tight">Our Story</h1>
      </div>

      <div className="prose prose-invert prose-gold mx-auto space-y-8 text-smoke leading-relaxed text-lg">
        <p className="first-letter:text-7xl first-letter:font-display first-letter:text-gold first-letter:mr-3 first-letter:float-left">
          From the vibrant heart of Solapur, Maharashtra, the CMÉ brand has always been synonymous with unparalleled hospitality and culinary excellence. Founded on the principle of serving unforgettable experiences, we spent years perfecting the art of delighting the senses. Now, we translate that same mastery into the realm of luxury perfumery with ADEEB DE CME.
        </p>

        <p>
          Just as a masterful dish requires the precise balance of rare spices and fresh ingredients, a truly timeless fragrance demands absolute perfection in its composition. ADEEB DE CME was born from our deep-rooted desire to capture the soul of Arabian elegance and blend it with our heritage of Indian hospitality.
        </p>

        <div className="my-12 py-8 border-y border-gold/20 text-center">
          <p className="font-display text-3xl text-gold italic">
            "A fragrance is more than a scent; it is the silent ambassador of your presence."
          </p>
        </div>

        <p>
          We source the finest Ouds, authentic Musks, and precious florals from across the globe, bringing them back to our ateliers to be blended by master artisans. ADEEB DE CME is not just a perfume brand; it is an extension of the CMÉ vision—a commitment to premium quality, profound emotional connection, and absolute luxury.
        </p>
      </div>
    </div>
  );
}
  `,
  shipping: `
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
  `,
  returns: `
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
  `,
  faqs: `
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
  `,
  craftsmanship: `
export default function CraftsmanshipPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <p className="eyebrow mb-4">THE HOUSE OF ADEEB</p>
        <h1 className="font-display text-4xl md:text-6xl text-ivory font-light leading-tight">Master Craftsmanship</h1>
      </div>

      <div className="prose prose-invert prose-gold mx-auto space-y-8 text-smoke leading-relaxed text-lg">
        <p>
          At ADEEB DE CME, we approach perfumery as an ancient art form. Every bottle is a culmination of hundreds of hours of dedication, blending, and maturation. We do not mass-produce; we curate.
        </p>

        <h2 className="font-display text-3xl text-gold mt-12 mb-6">The Raw Materials</h2>
        <p>
          The soul of a fragrance lies in its ingredients. Our master perfumers travel the world to source the absolute best: authentic Oud from the deep forests of Southeast Asia, Taif roses harvested at dawn, and genuine ambergris. We never compromise on the purity of our extracts.
        </p>

        <h2 className="font-display text-3xl text-gold mt-12 mb-6">The Art of Blending</h2>
        <p>
          Our perfumes are macerated for months in temperature-controlled environments to allow the complex notes to marry perfectly. This slow, deliberate process ensures that when you wear an ADEEB fragrance, you experience a scent profile that evolves beautifully throughout the day.
        </p>
      </div>
    </div>
  );
}
  `,
  sustainability: `
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
  `,
  press: `
export default function PressPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto min-h-screen text-center">
      <p className="eyebrow mb-4">THE HOUSE OF ADEEB</p>
      <h1 className="font-display text-4xl md:text-5xl text-ivory font-light mb-16">Press & Media</h1>

      <div className="text-smoke/50 text-lg italic border border-gold/10 p-16 bg-charcoal">
        <p className="font-display text-2xl text-gold mb-4">"A stunning debut in luxury perfumery."</p>
        <p>— Media Features Coming Soon —</p>
        <p className="mt-8 text-sm">For press inquiries, please contact <a href="mailto:info@cmefood.com" className="text-gold">info@cmefood.com</a></p>
      </div>
    </div>
  );
}
  `,
  careers: `
export default function CareersPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto min-h-screen text-center">
      <p className="eyebrow mb-4">THE HOUSE OF ADEEB</p>
      <h1 className="font-display text-4xl md:text-5xl text-ivory font-light mb-12">Careers</h1>

      <div className="bg-charcoal p-12 border border-gold/10">
        <p className="text-smoke text-lg leading-relaxed mb-8">
          Join a passionate team dedicated to redefining Arabian luxury. Rooted in the esteemed CMÉ hospitality brand in Solapur, we are always seeking visionary talent to grow our perfumery operations.
        </p>

        <div className="border-t border-gold/20 pt-8 mt-8">
          <p className="text-ivory font-display text-xl mb-2">There are currently no open positions.</p>
          <p className="text-smoke text-sm">
            However, we are always eager to connect with talent. Send your resume and portfolio to <a href="mailto:info@cmefood.com" className="text-gold">info@cmefood.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
  `
};

Object.keys(components).forEach(key => {
  let pathName = key;
  if (key === 'trackOrder') pathName = 'track-order';
  write(`src/app/(store)/${pathName}/page.tsx`, components[key]);
});
