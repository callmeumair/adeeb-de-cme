import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingBag, Users, Warehouse } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-black">
      <div className="w-64 bg-deep border-r border-gold/10 flex flex-col hidden md:flex shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-gold/10">
          <span className="text-gold font-display text-xl tracking-widest">ADEEB ADMIN</span>
        </div>
        <nav className="flex-1 py-6 space-y-1">
           <Link href="/admin" className="flex items-center gap-3 px-6 py-3 text-smoke hover:text-ivory hover:bg-charcoal/50"><LayoutDashboard size={18}/> Dashboard</Link>
           <Link href="/admin/products" className="flex items-center gap-3 px-6 py-3 text-smoke hover:text-ivory hover:bg-charcoal/50"><Package size={18}/> Products</Link>
           <Link href="/admin/orders" className="flex items-center gap-3 px-6 py-3 text-smoke hover:text-ivory hover:bg-charcoal/50"><ShoppingBag size={18}/> Orders</Link>
           <Link href="/admin/customers" className="flex items-center gap-3 px-6 py-3 text-smoke hover:text-ivory hover:bg-charcoal/50"><Users size={18}/> Customers</Link>
           <Link href="/admin/inventory" className="flex items-center gap-3 px-6 py-3 text-smoke hover:text-ivory hover:bg-charcoal/50"><Warehouse size={18}/> Inventory</Link>
        </nav>
        <div className="p-6 border-t border-gold/10">
          <Link href="/" className="text-gold text-sm hover:underline">Back to Store</Link>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
