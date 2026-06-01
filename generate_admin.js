const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n');
  console.log(`Created ${filePath}`);
};

// Cart
write('src/app/(store)/cart/page.tsx', `
'use client';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function CartPage() {
  const { items, total } = useCartStore();
  return (
    <div className="py-24 px-6 md:px-[60px] max-w-[1440px] mx-auto min-h-[60vh]">
      <h1 className="font-display text-4xl text-ivory mb-8 border-b border-gold/20 pb-4">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-20 text-smoke">Your cart is empty. <Link href="/shop" className="text-gold hover:underline">Continue Shopping</Link></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
             {items.map(i => (
               <div key={i.id} className="flex gap-4 border border-gold/10 p-4">
                 <div className="font-body text-ivory">{i.name} - {i.size}</div>
                 <div className="ml-auto text-gold">{i.price} x {i.quantity}</div>
               </div>
             ))}
          </div>
          <div className="bg-charcoal p-6 border border-gold/20 h-fit">
            <h3 className="font-display text-2xl text-ivory mb-4">Summary</h3>
            <div className="flex justify-between text-smoke mb-4"><span>Subtotal</span><span>{total()}</span></div>
            <Link href="/checkout" className="block w-full bg-gold text-black text-center py-3 uppercase tracking-widest font-bold">Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}
`);

// Checkout
write('src/app/(store)/checkout/page.tsx', `
export default function CheckoutPage() {
  return (
    <div className="py-24 px-6 max-w-3xl mx-auto min-h-[60vh]">
      <h1 className="font-display text-4xl text-ivory mb-8">Checkout</h1>
      <div className="bg-charcoal border border-gold/20 p-8 text-center text-smoke">
        Checkout integration placeholder
      </div>
    </div>
  );
}
`);

// Auth
write('src/app/(auth)/login/page.tsx', `
import Link from 'next/link';
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black">
      <div className="bg-deep border border-gold/20 p-8 w-full max-w-md text-center">
        <h1 className="font-display text-3xl text-ivory mb-6 tracking-widest text-gold">ADEEB DE CME</h1>
        <div className="space-y-4 text-left">
          <input type="email" placeholder="Email" className="w-full bg-charcoal border border-gold/20 p-3 text-ivory focus:border-gold outline-none" />
          <input type="password" placeholder="Password" className="w-full bg-charcoal border border-gold/20 p-3 text-ivory focus:border-gold outline-none" />
          <button className="w-full bg-gold text-black py-3 uppercase tracking-widest font-bold">Sign In</button>
        </div>
        <p className="mt-6 text-smoke text-sm">Don't have an account? <Link href="/register" className="text-gold">Register</Link></p>
      </div>
    </div>
  );
}
`);

write('src/app/(auth)/register/page.tsx', `
import Link from 'next/link';
export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black">
      <div className="bg-deep border border-gold/20 p-8 w-full max-w-md text-center">
        <h1 className="font-display text-3xl text-ivory mb-6 tracking-widest text-gold">REGISTER</h1>
        <div className="space-y-4 text-left">
          <input type="text" placeholder="Full Name" className="w-full bg-charcoal border border-gold/20 p-3 text-ivory focus:border-gold outline-none" />
          <input type="email" placeholder="Email" className="w-full bg-charcoal border border-gold/20 p-3 text-ivory focus:border-gold outline-none" />
          <input type="password" placeholder="Password" className="w-full bg-charcoal border border-gold/20 p-3 text-ivory focus:border-gold outline-none" />
          <button className="w-full bg-gold text-black py-3 uppercase tracking-widest font-bold">Create Account</button>
        </div>
        <p className="mt-6 text-smoke text-sm">Already have an account? <Link href="/login" className="text-gold">Login</Link></p>
      </div>
    </div>
  );
}
`);

// Admin
write('src/app/admin/layout.tsx', `
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
`);

write('src/app/admin/page.tsx', `
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
`);

write('src/app/admin/products/page.tsx', `
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
`);

// Account
write('src/app/(store)/account/page.tsx', `
export default function AccountPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto min-h-[60vh]">
      <h1 className="font-display text-4xl text-ivory mb-8">My Account</h1>
      <div className="bg-charcoal border border-gold/20 p-8 text-smoke">
        Profile and Orders Placeholder
      </div>
    </div>
  );
}
`);

// Wishlist
write('src/app/(store)/wishlist/page.tsx', `
'use client';
import { useWishlistStore } from '@/store/wishlistStore';
import { mockProducts } from '@/lib/mockData';
import { ProductGrid } from '@/components/shop/ProductGrid';

export default function WishlistPage() {
  const { ids } = useWishlistStore();
  const wishlistedProducts = mockProducts.filter(p => ids.includes(p.id || ''));
  
  return (
    <div className="py-24 px-6 md:px-[60px] max-w-[1440px] mx-auto min-h-[60vh]">
      <h1 className="font-display text-4xl text-ivory mb-8">My Wishlist</h1>
      {wishlistedProducts.length > 0 ? (
        <ProductGrid products={wishlistedProducts} />
      ) : (
        <p className="text-smoke py-20 text-center">Your wishlist is empty.</p>
      )}
    </div>
  );
}
`);
