import { COLORS, getDesign, getProduct } from '@/data/catalog.mjs';

export const FREE_SHIPPING_FROM = 75;
export const FLAT_SHIPPING = 6.99;

export const SHIP_COUNTRIES = [
  'US', 'CA', 'GB', 'IE', 'AU', 'NZ', 'DE', 'FR', 'NL', 'BE', 'LU', 'AT', 'CH', 'ES', 'PT', 'IT',
  'PL', 'CZ', 'SK', 'HU', 'RO', 'SI', 'HR', 'GR', 'DK', 'SE', 'NO', 'FI', 'EE', 'LV', 'LT', 'JP', 'SG',
];

// Validate untrusted cart lines against the catalog. Prices always come from the server.
export function validateItems(raw) {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 30) return { error: 'Your cart is empty.' };
  const items = [];
  for (const r of raw) {
    const p = getProduct(String(r?.slug || ''));
    if (!p) return { error: 'An item in your cart is no longer available.' };
    if (!p.colors.includes(r.color) || !p.sizes.includes(r.size)) return { error: `Pick a valid option for ${p.title}.` };
    const qty = Math.max(1, Math.min(10, parseInt(r.qty, 10) || 1));
    items.push({ product: p, design: getDesign(p.design), color: r.color, size: r.size, qty, dark: COLORS[r.color].dark });
  }
  return { items };
}

// Compact cart encoding for Stripe metadata (500 chars per value).
export function encodeItems(items) {
  const parts = items.map((i) => [i.product.slug, i.color, i.size, i.qty].join('|'));
  const chunks = {};
  let cur = '';
  let n = 0;
  for (const part of parts) {
    if ((cur + ';' + part).length > 480) {
      chunks[`items_${n++}`] = cur;
      cur = part;
    } else cur = cur ? `${cur};${part}` : part;
  }
  if (cur) chunks[`items_${n}`] = cur;
  return chunks;
}

export function decodeItems(metadata = {}) {
  return Object.keys(metadata)
    .filter((k) => k.startsWith('items_'))
    .sort((a, b) => parseInt(a.slice(6), 10) - parseInt(b.slice(6), 10))
    .flatMap((k) => metadata[k].split(';'))
    .filter(Boolean)
    .map((s) => {
      const [slug, color, size, qty] = s.split('|');
      return { slug, color, size, qty: parseInt(qty, 10) || 1 };
    });
}
