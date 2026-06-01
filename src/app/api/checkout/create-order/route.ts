import { NextResponse } from 'next/server';
import razorpay from '@/lib/razorpay';
import { auth } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();
    // In a real app, you might want to require authentication, but guest checkout might also be allowed.
    // For now, we'll allow guest checkout.

    const body = await req.json();
    const { amount, currency = 'INR' } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Razorpay amount is in paise (smallest currency unit), so multiply by 100
    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return NextResponse.json({ error: 'Error creating Razorpay order' }, { status: 500 });
    }

    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error('Error in create-order:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
