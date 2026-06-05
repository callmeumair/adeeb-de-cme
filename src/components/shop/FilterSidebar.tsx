'use client';
export function FilterSidebar() {
  return (
    <div className="w-64 shrink-0 pr-8 hidden md:block">
      <h3 className="font-display text-xl text-ivory mb-6 border-b border-gold/10 pb-4">Filters</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-gold text-xs tracking-[0.2em] uppercase mb-3">Category</h4>
          {['Oud', 'Musk', 'Rose', 'Woody', 'Oriental', 'Bakhoor'].map(c => (
            <label key={c} className="flex items-center gap-3 mb-2 text-sm text-smoke cursor-pointer">
              <input type="checkbox" className="accent-gold bg-charcoal border-gold/20 rounded-none" />
              {c}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
