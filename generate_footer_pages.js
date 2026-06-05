const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n');
  console.log(`Created ${filePath}`);
};

const pages = [
  { path: 'contact', title: 'Contact Us', content: 'Get in touch with our customer care team. We are available to assist you with any inquiries regarding our fragrances, your orders, or our brand.' },
  { path: 'shipping', title: 'Shipping Information', content: 'We offer worldwide shipping to ensure our luxury fragrances reach you safely. Complimentary shipping on orders over $200.' },
  { path: 'returns', title: 'Returns & Exchange', content: 'Your satisfaction is our priority. We accept returns within 14 days of purchase for unopened and unused products.' },
  { path: 'track-order', title: 'Track Your Order', content: 'Enter your order ID below to view the current status of your shipment.' },
  { path: 'faqs', title: 'Frequently Asked Questions', content: 'Find answers to common questions about our ingredients, sillage, and ordering process.' },
  { path: 'about', title: 'Our Story', content: 'Born from a passion for timeless Arabian perfumery, Adeeb De CME bridges the gap between ancient traditions and modern luxury.' },
  { path: 'craftsmanship', title: 'Master Craftsmanship', content: 'Every bottle is a testament to our dedication. We source the rarest ingredients and employ master perfumers to create unforgettable scents.' },
  { path: 'sustainability', title: 'Our Commitment to Sustainability', content: 'Luxury should not cost the earth. We are committed to ethical sourcing, sustainable packaging, and minimizing our environmental footprint.' },
  { path: 'press', title: 'Press & Media', content: 'Explore the latest features, reviews, and news about Adeeb De CME in global publications.' },
  { path: 'careers', title: 'Careers at Adeeb', content: 'Join our growing family of artisans, creators, and luxury retail specialists. We are always looking for passionate talent.' }
];

pages.forEach(p => {
  const componentName = p.path.replace(/-([a-z])/g, (g) => g[1].toUpperCase()).replace(/^\w/, c => c.toUpperCase()) + 'Page';
  write(`src/app/(store)/${p.path}/page.tsx`, `
export default function ${componentName}() {
  return (
    <div className="py-32 px-6 max-w-4xl mx-auto min-h-[60vh] flex flex-col justify-center text-center">
      <p className="eyebrow mb-6">ADEEB DE CME</p>
      <h1 className="font-display text-4xl md:text-6xl text-ivory mb-8 font-light leading-tight">${p.title}</h1>
      <p className="text-smoke max-w-2xl mx-auto leading-relaxed text-lg">${p.content}</p>
      
      <div className="mt-16 w-24 h-px bg-gold/50 mx-auto"></div>
      
      <div className="mt-16 text-smoke/50 text-sm italic">
        (This page is currently being populated with content. Please check back later.)
      </div>
    </div>
  );
}
`);
});
