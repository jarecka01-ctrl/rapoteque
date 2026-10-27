import Link from 'next/link';
import { COLLECTIONS, GIFT_COLLECTION, PRODUCTS, productsForCollection } from '@/data/catalog.mjs';
import { GUIDES } from '@/data/guides.mjs';
import { ProductGrid } from '@/components/ui';
import { JsonLd, abs } from '@/lib/seo';

export const metadata = {
  alternates: { canonical: '/' },
};

const FEATURED = [
  'press-play-tee',
  'retro-patchwork-aop-sweatshirt',
  'crate-digger-hoodie',
  'boom-bap-embroidered-dad-hat',
  'block-party-1973-tee',
  'tiny-beatmaker-onesie',
  'turn-it-up-tee',
  'golden-era-certified-sweatshirt',
];

function designCount(slug) {
  return new Set(productsForCollection(slug).map((p) => p.design)).size;
}

export default function Home() {
  const featured = FEATURED.map((s) => PRODUCTS.find((p) => p.slug === s)).filter(Boolean);
  const sideA = COLLECTIONS.slice(0, 3);
  const sideB = [COLLECTIONS[3], GIFT_COLLECTION];

  return (
    <>
      <div className="wrap">
        <section className="jcard" aria-labelledby="hero-title">
          <div className="jcard-spine" aria-hidden="true">
            <span>Rapoteque / Side A</span>
          </div>
          <div className="jcard-main">
            <h1 id="hero-title" className="jcard-title">
              Old school hip hop, pressed on cotton
            </h1>
            <p className="jcard-lede">
              Original tees, hoodies, hats and baby onesies about tapes, crates, cyphers and block parties. Drawn
              in-house, printed when you order.
            </p>
            <div className="jcard-cta">
              <Link href="/shop" className="btn">
                Shop all designs
              </Link>
              <Link href="/collections/hip-hop-gifts" className="btn btn--ghost">
                Find a gift
              </Link>
            </div>
          </div>
          <div className="jcard-side">
            <nav aria-label="Collections">
              <p className="side-label">
                <span>Side A</span>
                <span>Wear it</span>
              </p>
              <ol className="tracklist">
                {sideA.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/collections/${c.slug}`}>
                      <span>{c.short}</span>
                      <span className="runtime">{designCount(c.slug)} designs</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
            <nav aria-label="More">
              <p className="side-label">
                <span>Side B</span>
                <span>Give it</span>
              </p>
              <ol className="tracklist side-b">
                {sideB.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/collections/${c.slug}`}>
                      <span>{c.short}</span>
                      <span className="runtime">{designCount(c.slug)} designs</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/guides">
                    <span>Guides</span>
                    <span className="runtime">{GUIDES.length} reads</span>
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="section" aria-labelledby="featured-title">
          <div className="section-head">
            <h2 id="featured-title" className="section-title">
              Heavy rotation
            </h2>
            <Link href="/shop" className="section-link">
              All {PRODUCTS.length} products
            </Link>
          </div>
          <ProductGrid products={featured} priorityCount={4} />
        </section>

        <section className="section">
          <div className="promise">
            <div>
              <h3>Drawn by us</h3>
              <p>Every graphic is original. No borrowed names, faces, logos or lyrics.</p>
            </div>
            <div>
              <h3>Made to order</h3>
              <p>Printed or stitched when you buy, so nothing sits in a warehouse.</p>
            </div>
            <div>
              <h3>Ships worldwide</h3>
              <p>Flat $6.99 shipping, free on orders over $75. 14-day returns.</p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="guides-title">
          <div className="flyer">
            <div>
              <h2 id="guides-title">Liner notes</h2>
              <p>
                Guides on the culture behind the clothes: the golden era, boom bap, 90s party outfits and more.
              </p>
              <Link href="/guides" className="btn">
                Read the guides
              </Link>
            </div>
            <ul>
              {GUIDES.slice(0, 4).map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`}>
                    {g.title}
                    <span>{g.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Rapoteque',
          url: abs('/'),
        }}
      />
    </>
  );
}
