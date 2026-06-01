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
    try {
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
          address: JSON.parse(JSON.stringify(address)), // Ensure proper JSON serialization
          items: {
            create: items.map(item => ({
              productId: item.productId,
              name: item.name,
              size: item.size,
              price: item.price,
              quantity: item.quantity,
              image: item.image || null,
            }))
          }
        }
      });

      // TODO: Send order confirmation email via resend if needed

      return NextResponse.json({ success: true, orderId: order.id });
    } catch (dbError) {
      console.error('Database error while creating order:', dbError);
      throw dbError;
    }
  } catch (error) {
    console.error('Error in verify-payment:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Internal Server Error', details: process.env.NODE_ENV === 'development' ? String(error) : undefined },
      { status: 500 }
    );
  }
}
