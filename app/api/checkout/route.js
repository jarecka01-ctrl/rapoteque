import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { SITE } from '@/data/catalog.mjs';
import { FLAT_SHIPPING, FREE_SHIPPING_FROM, SHIP_COUNTRIES, encodeItems, validateItems } from '@/lib/order';

export const runtime = 'nodejs';

export async function POST(req) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ code: 'not_configured', error: 'Checkout is not configured yet.' }, { status: 503 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { items, error } = validateItems(body?.items);
  if (error) return NextResponse.json({ error }, { status: 400 });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin = req.headers.get('origin') || SITE.url;
  const subtotal = items.reduce((n, i) => n + i.product.price * i.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_FROM ? 0 : FLAT_SHIPPING;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: items.map((i) => ({
        quantity: i.qty,
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(i.product.price * 100),
          product_data: {
            name: i.product.title,
            description: [i.color === 'Print' ? null : i.color, i.size].filter(Boolean).join(' / '),
            images: [new URL(i.product.image(i.color), SITE.url).toString()],
          },
        },
      })),
      shipping_address_collection: { allowed_countries: SHIP_COUNTRIES },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            display_name: shipping ? 'Standard shipping' : 'Free standard shipping',
            fixed_amount: { amount: Math.round(shipping * 100), currency: 'usd' },
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 14 },
            },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      metadata: encodeItems(items),
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error('stripe checkout error', e);
    return NextResponse.json({ error: 'Checkout could not start. Try again in a moment.' }, { status: 502 });
  }
}
