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
