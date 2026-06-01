import { Resend } from 'resend';
import type { Order } from '@/types';
import { formatPrice } from '@/lib/utils';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'ADEEB DE CME <noreply@adeebdecme.com>';
const BRAND_NAME = 'ADEEB DE CME';

function emailWrapper(content: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${BRAND_NAME}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Helvetica Neue', Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #111111; max-width: 600px; width: 100%;">
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #1a1a1a;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 300; color: #c9a84c; letter-spacing: 0.3em; text-transform: uppercase;">
                    ${BRAND_NAME}
                  </h1>
                </td>
              </tr>
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  ${content}
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px; text-align: center; border-top: 1px solid #1a1a1a;">
                  <p style="margin: 0 0 8px; font-size: 11px; color: #888580; letter-spacing: 0.2em; text-transform: uppercase;">
                    The Art of Fragrance
                  </p>
                  <p style="margin: 0; font-size: 11px; color: #555555;">
                    &copy; ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function buildOrderItemsTable(order: Order): string {
  const rows = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #f8f4ed; font-size: 14px;">
          ${item.name} <span style="color: #888580;">(${item.size})</span>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #888580; font-size: 14px; text-align: center;">
          &times;${item.quantity}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #c9a84c; font-size: 14px; text-align: right;">
          ${formatPrice(item.price * item.quantity)}
        </td>
      </tr>
    `
    )
    .join('');

  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #333; color: #888580; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em;">Item</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #333; color: #888580; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; text-align: center;">Qty</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #333; color: #888580; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; text-align: right;">Amount</td>
      </tr>
      ${rows}
      <tr>
        <td colspan="2" style="padding: 12px 0; color: #888580; font-size: 13px; text-align: right;">Subtotal</td>
        <td style="padding: 12px 0; color: #f8f4ed; font-size: 13px; text-align: right;">${formatPrice(order.subtotal)}</td>
      </tr>
      ${order.discount > 0 ? `
      <tr>
        <td colspan="2" style="padding: 4px 0; color: #888580; font-size: 13px; text-align: right;">Discount</td>
        <td style="padding: 4px 0; color: #c9a84c; font-size: 13px; text-align: right;">-${formatPrice(order.discount)}</td>
      </tr>` : ''}
      <tr>
        <td colspan="2" style="padding: 4px 0; color: #888580; font-size: 13px; text-align: right;">Shipping</td>
        <td style="padding: 4px 0; color: #f8f4ed; font-size: 13px; text-align: right;">${order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 4px 0; color: #888580; font-size: 13px; text-align: right;">Tax</td>
        <td style="padding: 4px 0; color: #f8f4ed; font-size: 13px; text-align: right;">${formatPrice(order.tax)}</td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 16px 0 0; border-top: 1px solid #333; color: #f8f4ed; font-size: 16px; font-weight: 600; text-align: right;">Total</td>
        <td style="padding: 16px 0 0; border-top: 1px solid #333; color: #c9a84c; font-size: 16px; font-weight: 600; text-align: right;">${formatPrice(order.total)}</td>
      </tr>
    </table>
  `;
}

export async function sendOrderConfirmation(to: string, order: Order): Promise<void> {
  const content = `
    <p style="margin: 0 0 8px; font-size: 11px; color: #c9a84c; letter-spacing: 0.5em; text-transform: uppercase;">
      Order Confirmed
    </p>
    <h2 style="margin: 0 0 24px; font-size: 28px; font-weight: 300; color: #f8f4ed;">
      Thank you for your order
    </h2>
    <p style="margin: 0 0 24px; font-size: 14px; color: #888580; line-height: 1.6;">
      Your order <strong style="color: #f8f4ed;">#${order.id.slice(-8).toUpperCase()}</strong> has been confirmed. 
      We're preparing your fragrance with the utmost care.
    </p>
    ${buildOrderItemsTable(order)}
    <div style="margin-top: 32px; padding: 20px; background-color: #1a1a1a;">
      <p style="margin: 0 0 4px; font-size: 11px; color: #c9a84c; letter-spacing: 0.3em; text-transform: uppercase;">
        Shipping To
      </p>
      <p style="margin: 0; font-size: 14px; color: #f8f4ed; line-height: 1.6;">
        ${order.address.name}<br />
        ${order.address.line1}${order.address.line2 ? `, ${order.address.line2}` : ''}<br />
        ${order.address.city}, ${order.address.state} ${order.address.pincode}<br />
        ${order.address.country}
      </p>
    </div>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Order Confirmed — #${order.id.slice(-8).toUpperCase()}`,
    html: emailWrapper(content),
  });
}

export async function sendShippingNotification(
  to: string,
  order: Order,
  trackingLink: string
): Promise<void> {
  const content = `
    <p style="margin: 0 0 8px; font-size: 11px; color: #c9a84c; letter-spacing: 0.5em; text-transform: uppercase;">
      Order Shipped
    </p>
    <h2 style="margin: 0 0 24px; font-size: 28px; font-weight: 300; color: #f8f4ed;">
      Your order is on its way
    </h2>
    <p style="margin: 0 0 24px; font-size: 14px; color: #888580; line-height: 1.6;">
      Great news! Your order <strong style="color: #f8f4ed;">#${order.id.slice(-8).toUpperCase()}</strong> has been 
      shipped and is on its way to you.
    </p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${trackingLink}" style="display: inline-block; padding: 14px 40px; background-color: #c9a84c; color: #0a0a0a; font-size: 11px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; text-decoration: none;">
        Track Your Order
      </a>
    </div>
    <div style="padding: 20px; background-color: #1a1a1a;">
      <p style="margin: 0 0 4px; font-size: 11px; color: #c9a84c; letter-spacing: 0.3em; text-transform: uppercase;">
        Delivering To
      </p>
      <p style="margin: 0; font-size: 14px; color: #f8f4ed; line-height: 1.6;">
        ${order.address.name}<br />
        ${order.address.line1}${order.address.line2 ? `, ${order.address.line2}` : ''}<br />
        ${order.address.city}, ${order.address.state} ${order.address.pincode}
      </p>
    </div>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Order Shipped — #${order.id.slice(-8).toUpperCase()}`,
    html: emailWrapper(content),
  });
}

export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  const displayName = name || 'Connoisseur';

  const content = `
    <p style="margin: 0 0 8px; font-size: 11px; color: #c9a84c; letter-spacing: 0.5em; text-transform: uppercase;">
      Welcome
    </p>
    <h2 style="margin: 0 0 24px; font-size: 28px; font-weight: 300; color: #f8f4ed;">
      Welcome, ${displayName}
    </h2>
    <p style="margin: 0 0 24px; font-size: 14px; color: #888580; line-height: 1.6;">
      Thank you for joining ${BRAND_NAME}. You've stepped into a world where every scent tells a story — 
      crafted with rare ingredients and an unwavering commitment to elegance.
    </p>
    <p style="margin: 0 0 32px; font-size: 14px; color: #888580; line-height: 1.6;">
      Explore our curated collection of luxury fragrances, each designed to leave an unforgettable impression.
    </p>
    <div style="text-align: center;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://adeebdecme.com'}/shop" style="display: inline-block; padding: 14px 40px; background-color: #c9a84c; color: #0a0a0a; font-size: 11px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; text-decoration: none;">
        Explore Collection
      </a>
    </div>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Welcome to ${BRAND_NAME}`,
    html: emailWrapper(content),
  });
}

export async function sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
  const content = `
    <p style="margin: 0 0 8px; font-size: 11px; color: #c9a84c; letter-spacing: 0.5em; text-transform: uppercase;">
      Password Reset
    </p>
    <h2 style="margin: 0 0 24px; font-size: 28px; font-weight: 300; color: #f8f4ed;">
      Reset your password
    </h2>
    <p style="margin: 0 0 24px; font-size: 14px; color: #888580; line-height: 1.6;">
      We received a request to reset your password. Click the button below to choose a new password. 
      This link will expire in 1 hour.
    </p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${resetLink}" style="display: inline-block; padding: 14px 40px; background-color: #c9a84c; color: #0a0a0a; font-size: 11px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; text-decoration: none;">
        Reset Password
      </a>
    </div>
    <p style="margin: 0; font-size: 12px; color: #555555; line-height: 1.6;">
      If you didn't request this, you can safely ignore this email. Your password will remain unchanged.
    </p>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Reset Your Password — ${BRAND_NAME}`,
    html: emailWrapper(content),
  });
}

export default resend;
