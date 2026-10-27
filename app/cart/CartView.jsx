'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';

const FREE_FROM = 75;
const FLAT = 6.99;

export default function CartView() {
  const { items, ready, subtotal, setQty } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  if (!ready) return null;

  if (items.length === 0) {
    return (
      <div className="empty">
        <p>Your cart is empty. Start with a classic.</p>
        <Link href="/shop" className="btn">
          Shop all designs
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= FREE_FROM ? 0 : FLAT;
  const toFree = Math.max(0, FREE_FROM - subtotal);

  async function checkout() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.map(({ slug, color, size, qty }) => ({ slug, color, size, qty })) }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(
        data.code === 'not_configured'
          ? 'Checkout opens soon. This store is in preview, so payments are not switched on yet.'
          : data.error || 'Checkout could not start. Try again in a moment.'
      );
    } catch {
      setError('Checkout could not start. Check your connection and try again.');
    }
    setBusy(false);
  }

  return (
    <div className="cart-layout">
      <div>
        {items.map((it, i) => (
          <div className="cart-line" key={`${it.slug}-${it.color}-${it.size}`}>
            <Link href={`/products/${it.slug}`}>
              <Image src={it.image} alt="" width={96} height={96} />
            </Link>
            <div>
              <h3>
                <Link href={`/products/${it.slug}`}>{it.title}</Link>
              </h3>
              <p>
                {it.color === 'Print' ? '' : `${it.color}, `}
                {it.size}
              </p>
              <div className="qty">
                <button type="button" aria-label={`Remove one ${it.title}`} onClick={() => setQty(i, it.qty - 1)}>
                  −
                </button>
                <span aria-live="polite">{it.qty}</span>
                <button type="button" aria-label={`Add one ${it.title}`} onClick={() => setQty(i, it.qty + 1)}>
                  +
                </button>
              </div>
            </div>
            <strong>${(it.qty * it.price).toFixed(2)}</strong>
          </div>
        ))}
      </div>

      <aside className="summary" aria-label="Order summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>{shipping ? `$${shipping.toFixed(2)}` : 'Free'}</span>
        </div>
        <div className="summary-row summary-total">
          <span>Total</span>
          <span>${(subtotal + shipping).toFixed(2)}</span>
        </div>
        {toFree > 0 && <p style={{ fontSize: '.9rem' }}>Add ${toFree.toFixed(2)} more for free shipping.</p>}
        <button type="button" className="btn btn--ink btn--block" onClick={checkout} disabled={busy}>
          {busy ? 'Opening checkout…' : 'Check out'}
        </button>
        {error && (
          <p className="notice" role="alert">
            {error}
          </p>
        )}
        <p style={{ fontSize: '.85rem', marginTop: 14, color: 'var(--muted)' }}>
          Secure payment by Stripe. Taxes and duties, if any, are shown at checkout.
        </p>
      </aside>
    </div>
  );
}
