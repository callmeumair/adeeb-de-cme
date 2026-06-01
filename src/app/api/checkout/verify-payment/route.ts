import { NextResponse } from 'next/server';
import { verifyPaymentSignature } from '@/lib/razorpay';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import type { CartItemType, Address } from '@/types';

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id || null;

    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      address,
      subtotal,
      shipping = 0,
      total
    } = body as {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      items: CartItemType[];
      address: Address;
      subtotal: number;
      shipping?: number;
      total: number;
    };

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !items || !address) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Verify Signature
    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Save order in database
    const order = await prisma.order.create({
      data: {
        ...(userId ? { userId } : {}),
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        subtotal,
        tax: 0, // Calculate tax if needed
        shipping,
        total,
        address: address as any, // Prisma Json handles object if typed correctly, cast to any to bypass strict type check for now
        items: {
          create: items.map(item => ({
            productId: item.productId,
            name: item.name,
            size: item.size,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          }))
        }
      }
    });

    // TODO: Send order confirmation email via resend if needed

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Error in verify-payment:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
