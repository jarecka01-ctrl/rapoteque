import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  COLORS,
  GARMENTS,
  PRODUCTS,
  collectionForProduct,
  getDesign,
  getProduct,
} from '@/data/catalog.mjs';
import { GUIDES } from '@/data/guides.mjs';
import ProductBuy from '@/components/ProductBuy';
import { Breadcrumbs, Faq, ProductGrid } from '@/components/ui';
import { JsonLd, abs, offerExtras } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

function metaDescription(p, d, g) {
  return `${p.title}: ${d.story[0].split('. ')[0].replace(/\.$/, '')}. Original design on a ${g.blank}, printed on demand. $${p.price}.`.slice(
    0,
    158
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const d = getDesign(p.design);
  const g = GARMENTS[p.garment];
  const title = `${p.title}`;
  const description = metaDescription(p, d, g);
  return {
    title,
    description,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title,
      description,
      url: `/products/${p.slug}`,
      images: [{ url: p.image(p.colors[0]), width: 1000, height: 1000, alt: p.title }],
    },
  };
}

const KIND_FAQ = {
  print: [
    ['How is this printed?', 'Direct-to-garment printing with water-based inks that soak into the fabric, so the print stays soft and breathable.'],
    ['How should I wash it?', 'Machine wash cold, inside out, and hang dry or tumble dry low. Do not iron directly on the print.'],
  ],
  embroidery: [
    ['Is the design printed or embroidered?', 'It is flat embroidery, stitched to order.'],
    ['Will it fit me?', 'Yes. It is one size and adjusts or stretches to fit most adults.'],
  ],
  aop: [
    ['Is the pattern printed on the whole piece?', 'Yes. The fabric is sublimation printed edge to edge, then cut and sewn to order, so pattern placement varies slightly on each piece.'],
    ['Is this a copy of a famous sweater?', 'No. The patchwork pattern is original artwork drawn by Rapoteque, inspired by the colorful party clothes of the 90s.'],
  ],
};

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const d = getDesign(p.design);
  const g = GARMENTS[p.garment];
  const col = collectionForProduct(p);

  const colors = p.colors.map((c) => ({ name: c, hex: COLORS[c].hex, image: p.image(c) }));
  const sameDesign = PRODUCTS.filter((x) => x.design === p.design && x.slug !== p.slug);
  const sameGarment = PRODUCTS.filter((x) => x.garment === p.garment && x.design !== p.design);
  const related = [...sameDesign, ...sameGarment].slice(0, 4);
  const guide = GUIDES.find((x) => x.related.includes(d.slug));
  const faq = [
    ...KIND_FAQ[d.kind],
    ['How long does delivery take?', 'Each piece is made to order in 2–5 business days, then ships in 3–7 business days in the US and 5–14 to most other countries.'],
    ['Can I return it?', 'Yes. You have 14 days after delivery to return unworn items, and damaged or misprinted items are replaced free.'],
  ];

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'ProductGroup',
    name: p.title,
    description: d.story.join(' '),
    url: abs(`/products/${p.slug}`),
    brand: { '@type': 'Brand', name: 'Rapoteque' },
    productGroupID: p.slug,
    variesBy: ['https://schema.org/color', 'https://schema.org/size'],
    hasVariant: p.colors.flatMap((c) =>
      p.sizes.map((s) => ({
        '@type': 'Product',
        sku: `${p.slug}-${c}-${s}`.toLowerCase().replace(/[^a-z0-9-]+/g, '-'),
        name: `${p.title} – ${c}, ${s}`,
        image: abs(p.image(c)),
        color: c === 'Print' ? 'Multicolor' : c,
        size: s,
        offers: {
          '@type': 'Offer',
          price: p.price.toFixed(2),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          url: abs(`/products/${p.slug}`),
          ...offerExtras,
        },
      }))
    ),
  };

  return (
    <div className="wrap">
      <div style={{ paddingTop: 24 }}>
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: col.title, path: `/collections/${col.slug}` },
            { name: p.title, path: `/products/${p.slug}` },
          ]}
        />
      </div>

      <ProductBuy
        slug={p.slug}
        title={p.title}
        price={p.price}
        colors={colors}
        sizes={p.sizes}
        sizeGuide={g.sizes.length > 1}
      >
        <ul className="pdp-facts">
          <li>
            <span>Blank</span>
            <span>{g.blank}</span>
          </li>
          <li>
            <span>Made</span>
            <span>To order, in 2–5 business days</span>
          </li>
          <li>
            <span>Shipping</span>
            <span>$6.99 flat, free over $75</span>
          </li>
          <li>
            <span>Returns</span>
            <span>14 days</span>
          </li>
        </ul>

        <div className="pdp-copy">
          <h2>About the design</h2>
          {d.story.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
          <h2>Details</h2>
          <ul>
            {g.specs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          {guide && (
            <p>
              Read more: <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
            </p>
          )}
        </div>
      </ProductBuy>

      {related.length > 0 && (
        <section className="section" aria-labelledby="rel">
          <div className="section-head">
            <h2 id="rel" className="section-title">
              {sameDesign.length ? 'Same design, other styles' : 'You might also like'}
            </h2>
          </div>
          <ProductGrid products={related} />
        </section>
      )}

      <Faq items={faq} />
      <JsonLd data={productLd} />
    </div>
  );
}
