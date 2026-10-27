import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { decodeItems, validateItems } from '@/lib/order';
import { createPrintfulOrder } from '@/lib/printful';

export const runtime = 'nodejs';

// Stripe -> Printful. Configure in Stripe: endpoint /api/stripe-webhook,
// event checkout.session.completed.
export async function POST(req) {
  const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, PRINTFUL_API_KEY } = process.env;
  if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'not configured' }, { status: 503 });
  }
  const stripe = new Stripe(STRIPE_SECRET_KEY);
  const sig = req.headers.get('stripe-signature');
  const raw = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    return NextResponse.json({ error: `Bad signature: ${e.message}` }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') return NextResponse.json({ received: true });

  const session = event.data.object;
  if (session.payment_status !== 'paid') return NextResponse.json({ received: true, skipped: 'unpaid' });

  if (!PRINTFUL_API_KEY) {
    console.error('Paid order without PRINTFUL_API_KEY; fulfil manually:', session.id);
    return NextResponse.json({ received: true, warning: 'printful not configured' });
  }

  const { items, error } = validateItems(decodeItems(session.metadata));
  if (error) {
    console.error('Could not decode order items for', session.id, error);
    return NextResponse.json({ received: true, error });
  }

  // Newer API versions put shipping under collected_information.
  const ship = session.collected_information?.shipping_details || session.shipping_details || {};
  const addr = ship.address || session.customer_details?.address || {};
  const recipient = {
    name: ship.name || session.customer_details?.name || 'Customer',
    address1: addr.line1,
    address2: addr.line2 || undefined,
    city: addr.city,
    state_code: addr.state || undefined,
    country_code: addr.country,
    zip: addr.postal_code,
    email: session.customer_details?.email || undefined,
    phone: session.customer_details?.phone || undefined,
  };

  try {
    const order = await createPrintfulOrder({ externalId: session.id, recipient, items });
    console.log('Printful order created', order?.id, 'for', session.id);
    return NextResponse.json({ received: true, printful: order?.id });
  } catch (e) {
    // Return 500 so Stripe retries; duplicates are blocked by Printful's unique external_id.
    console.error('Printful order failed for', session.id, e);
    return NextResponse.json({ error: 'fulfillment failed' }, { status: 500 });
  }
}
