import Razorpay from 'razorpay';
import CryptoJS from 'crypto-js';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

/**
 * Verify the Razorpay payment signature to ensure payment authenticity.
 * Uses HMAC SHA256 with the Razorpay key secret.
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = CryptoJS.HmacSHA256(
    body,
    process.env.RAZORPAY_KEY_SECRET as string
  ).toString(CryptoJS.enc.Hex);

  return expectedSignature === signature;
}

export default razorpay;
