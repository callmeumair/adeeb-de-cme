import { mockProducts } from '@/lib/mockData';
export default function AdminProducts() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl text-ivory">Products</h1>
        <button className="bg-gold text-black px-4 py-2 uppercase tracking-widest text-xs font-bold">Add Product</button>
      </div>
      <div className="bg-charcoal border border-gold/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-gold/10 text-smoke text-xs uppercase tracking-widest">
            <tr><th className="p-4">Name</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4">Status</th></tr>
          </thead>
          <tbody className="text-ivory text-sm">
            {mockProducts.map(p => (
              <tr key={p.id} className="border-b border-gold/5 last:border-0 hover:bg-deep">
                <td className="p-4">{p.name}</td>
                <td className="p-4 text-gold">{p.category}</td>
                <td className="p-4">₹{p.price}</td>
                <td className="p-4"><span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 text-xs">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
