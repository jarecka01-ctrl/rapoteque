import { COLLECTIONS, GIFT_COLLECTION, PRODUCTS, SITE } from '@/data/catalog.mjs';
import { GUIDES } from '@/data/guides.mjs';
import { PAGES } from '@/data/pages.mjs';

export default function sitemap() {
  const u = (p) => new URL(p, SITE.url).toString();
  const now = new Date();
  return [
    { url: u('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: u('/shop'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...[...COLLECTIONS, GIFT_COLLECTION].map((c) => ({
      url: u(`/collections/${c.slug}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    })),
    ...PRODUCTS.map((p) => ({
      url: u(`/products/${p.slug}`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: p.colors.map((c) => u(p.image(c))),
    })),
    { url: u('/guides'), lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    ...GUIDES.map((g) => ({ url: u(`/guides/${g.slug}`), lastModified: new Date(g.date), changeFrequency: 'monthly', priority: 0.7 })),
    ...Object.keys(PAGES).map((p) => ({ url: u(`/${p}`), lastModified: now, changeFrequency: 'yearly', priority: 0.3 })),
  ];
}
