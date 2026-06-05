export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-3xl text-ivory mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Revenue', value: '₹12,45,000' },
          { label: 'Orders Today', value: '23' },
          { label: 'Total Customers', value: '1,247' },
          { label: 'Low Stock', value: '8' }
        ].map(s => (
          <div key={s.label} className="bg-charcoal border border-gold/10 p-6">
            <h3 className="text-smoke text-xs tracking-widest uppercase mb-2">{s.label}</h3>
            <p className="font-display text-3xl text-ivory">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-charcoal border border-gold/10 p-8 h-64 flex items-center justify-center text-smoke">
        Analytics Chart Placeholder
      </div>
    </div>
  );
}
