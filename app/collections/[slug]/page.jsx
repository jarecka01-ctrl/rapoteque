import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COLLECTIONS, GIFT_COLLECTION, productsForCollection } from '@/data/catalog.mjs';
import { GUIDES } from '@/data/guides.mjs';
import { Breadcrumbs, Faq, ProductGrid } from '@/components/ui';
import { JsonLd, abs } from '@/lib/seo';

const ALL = [...COLLECTIONS, GIFT_COLLECTION];

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = ALL.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/collections/${c.slug}` },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: `/collections/${c.slug}` },
  };
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  const c = ALL.find((x) => x.slug === slug);
  if (!c) notFound();
  const products = productsForCollection(slug);
  const guides = GUIDES.filter((g) => g.collections.includes(slug)).slice(0, 3);

  return (
    <div className="wrap">
      <header className="page-head">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: c.title, path: `/collections/${c.slug}` },
          ]}
        />
        <h1 className="page-title">{c.title}</h1>
        <div className="page-intro">
          <p>{c.intro[0]}</p>
        </div>
      </header>

      <ProductGrid products={products} priorityCount={4} />

      <section className="section">
        <div className="prose">
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            About this collection
          </h2>
          {c.intro.slice(1).map((t, i) => (
            <p key={i}>{t}</p>
          ))}
          {guides.length > 0 && (
            <p>
              Further reading:{' '}
              {guides.map((g, i) => (
                <span key={g.slug}>
                  <Link href={`/guides/${g.slug}`}>{g.short}</Link>
                  {i < guides.length - 1 ? ', ' : '.'}
                </span>
              ))}
            </p>
          )}
        </div>
      </section>

      <Faq items={c.faq} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: c.title,
          description: c.metaDescription,
          url: abs(`/collections/${c.slug}`),
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: products.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: abs(`/products/${p.slug}`),
              name: p.title,
            })),
          },
        }}
      />
    </div>
  );
}
