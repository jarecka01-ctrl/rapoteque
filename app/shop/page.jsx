import Link from 'next/link';
import { COLLECTIONS, PRODUCTS, productsForCollection } from '@/data/catalog.mjs';
import { Breadcrumbs, ProductGrid } from '@/components/ui';

export const metadata = {
  title: 'Shop All Old School Hip Hop Clothing',
  description:
    'Every Rapoteque design in one place: old school hip hop t-shirts, 90s hoodies and sweatshirts, embroidered hats and hip hop baby clothes.',
  alternates: { canonical: '/shop' },
};

export default function Shop() {
  return (
    <div className="wrap">
      <header className="page-head">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Shop all', path: '/shop' },
          ]}
        />
        <h1 className="page-title">Shop all</h1>
        <div className="page-intro">
          <p>
            {PRODUCTS.length} pieces across tees, sweats, hats and baby clothes. Every graphic is original, every piece
            is made to order.
          </p>
        </div>
      </header>
      {COLLECTIONS.map((c, i) => (
        <section key={c.slug} className={i ? 'section' : undefined} aria-labelledby={`h-${c.slug}`}>
          <div className="section-head">
            <h2 id={`h-${c.slug}`} className="section-title">
              {c.short}
            </h2>
            <Link href={`/collections/${c.slug}`} className="section-link">
              View collection
            </Link>
          </div>
          <ProductGrid products={productsForCollection(c.slug)} priorityCount={i === 0 ? 4 : 0} />
        </section>
      ))}
    </div>
  );
}
