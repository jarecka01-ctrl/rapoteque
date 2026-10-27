// Minimal Printful client for creating orders from paid Stripe sessions.
// Catalog products are resolved at runtime by model number or title, so no
// catalog IDs are hard-coded. Variant matching uses color + size names.

import { GARMENTS, SITE, printFile } from '@/data/catalog.mjs';

const API = 'https://api.printful.com';

async function pf(path, init = {}) {
  const headers = {
    Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
    'Content-Type': 'application/json',
    ...(process.env.PRINTFUL_STORE_ID ? { 'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID } : {}),
  };
  const res = await fetch(API + path, { ...init, headers: { ...headers, ...(init.headers || {}) } });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Printful ${path} ${res.status}: ${JSON.stringify(json?.error || json).slice(0, 400)}`);
  return json.result;
}

let catalogCache = null;
const productCache = new Map();

async function catalogProductId(garmentKey) {
  const rule = GARMENTS[garmentKey].printful;
  if (!catalogCache) catalogCache = await pf('/products');
  const match = catalogCache.find((p) => {
    if (rule.model) return String(p.model).trim().toUpperCase() === rule.model.toUpperCase();
    return rule.titleIncludes.every((t) => String(p.title).toLowerCase().includes(t.toLowerCase()));
  });
  if (!match) throw new Error(`No Printful catalog product for garment "${garmentKey}"`);
  return match.id;
}

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

export async function resolveVariantId(garmentKey, color, size) {
  const id = await catalogProductId(garmentKey);
  if (!productCache.has(id)) productCache.set(id, await pf(`/products/${id}`));
  const { variants } = productCache.get(id);
  const sizeOk = (v) => norm(v.size) === norm(size) || (size === 'One size' && variants.length && true);
  const v =
    color === 'Print'
      ? variants.find((v) => norm(v.size) === norm(size)) || variants.find(sizeOk)
      : variants.find((v) => norm(v.color) === norm(color) && sizeOk(v));
  if (!v) throw new Error(`No Printful variant for ${garmentKey} / ${color} / ${size}`);
  return v.id;
}

function filesFor(item) {
  const g = GARMENTS[item.product.garment];
  const variant = item.dark ? 'dark' : 'light';
  if (g.placement === 'aop') {
    const url = new URL('/print/retro-patchwork.png', SITE.url).toString();
    return ['front', 'back', 'sleeve_left', 'sleeve_right'].map((type) => ({ type, url }));
  }
  const url = new URL(printFile(item.design.slug, variant), SITE.url).toString();
  return [{ type: g.placement, url }];
}

export async function createPrintfulOrder({ externalId, recipient, items }) {
  const orderItems = [];
  for (const item of items) {
    orderItems.push({
      variant_id: await resolveVariantId(item.product.garment, item.color, item.size),
      quantity: item.qty,
      retail_price: item.product.price.toFixed(2),
      name: item.product.title,
      files: filesFor(item),
    });
  }
  const confirm = process.env.PRINTFUL_AUTO_CONFIRM === 'true';
  return pf(`/orders?confirm=${confirm ? 'true' : 'false'}`, {
    method: 'POST',
    body: JSON.stringify({ external_id: externalId.replace(/[^A-Za-z0-9]/g, '').slice(-32), recipient, items: orderItems }),
  });
}
