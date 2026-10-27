import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GUIDES, getGuide } from '@/data/guides.mjs';
import { COLLECTIONS, GIFT_COLLECTION, PRODUCTS } from '@/data/catalog.mjs';
import { Blocks, Breadcrumbs, Faq, ProductGrid } from '@/components/ui';
import { JsonLd, abs } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { type: 'article', title: g.title, description: g.description, url: `/guides/${g.slug}` },
  };
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  // One product per related design, first garment listed.
  const products = g.related.map((d) => PRODUCTS.find((p) => p.design === d)).filter(Boolean);
  const cols = [...COLLECTIONS, GIFT_COLLECTION].filter((c) => g.collections.includes(c.slug));
  const date = new Date(g.date);

  return (
    <div className="wrap">
      <header className="page-head">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Guides', path: '/guides' },
            { name: g.short, path: `/guides/${g.slug}` },
          ]}
        />
        <h1 className="page-title" style={{ maxWidth: '24ch' }}>
          {g.title}
        </h1>
        <p className="article-meta">
          <time dateTime={g.date}>{date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time>
        </p>
      </header>

      <article className="prose">
        <Blocks blocks={g.sections} />
        {cols.length > 0 && (
          <p>
            Shop the look:{' '}
            {cols.map((c, i) => (
              <span key={c.slug}>
                <Link href={`/collections/${c.slug}`}>{c.title}</Link>
                {i < cols.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </p>
        )}
      </article>

      <section className="section" aria-labelledby="shop">
        <div className="section-head">
          <h2 id="shop" className="section-title">
            Related designs
          </h2>
        </div>
        <ProductGrid products={products} />
      </section>

      <Faq items={g.faq} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: g.title,
          description: g.description,
          datePublished: g.date,
          dateModified: g.date,
          author: { '@type': 'Organization', name: 'Rapoteque' },
          publisher: { '@type': 'Organization', name: 'Rapoteque', logo: { '@type': 'ImageObject', url: abs('/icon.png') } },
          mainEntityOfPage: abs(`/guides/${g.slug}`),
          image: abs('/og.png'),
        }}
      />
    </div>
  );
}
