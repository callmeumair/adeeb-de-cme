const keywords = [
  'Oud & Rose',
  'Rare Ingredients',
  'Arabian Craftsmanship',
  'Long-Lasting Sillage',
  'Premium Oud',
  'Luxury Gifting',
  'Artisan Blends',
  'Timeless Elegance',
];

function KeywordList() {
  return (
    <>
      {keywords.map((keyword, i) => (
        <span key={i} className="flex items-center gap-6 shrink-0">
          <span className="text-ivory/60 text-sm tracking-[0.3em] uppercase font-body whitespace-nowrap">
            {keyword}
          </span>
          <span className="text-gold/40 text-sm">✦</span>
        </span>
      ))}
    </>
  );
}

export function Marquee() {
  return (
    <div className="border-y border-gold/10 py-5 bg-deep/50 overflow-hidden">
      <div className="flex items-center gap-6 animate-marquee w-max">
        <KeywordList />
        <KeywordList />
      </div>
    </div>
  );
}
