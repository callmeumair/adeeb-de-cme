'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: any) => {
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
