import { notFound } from 'next/navigation';
import { PAGES } from '@/data/pages.mjs';
import { Blocks, Breadcrumbs } from '@/components/ui';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(PAGES).map((page) => ({ page }));
}

export async function generateMetadata({ params }) {
  const { page } = await params;
  const p = PAGES[page];
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/${page}` },
  };
}

export default async function InfoPage({ params }) {
  const { page } = await params;
  const p = PAGES[page];
  if (!p) notFound();
  return (
    <div className="wrap">
      <header className="page-head">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: p.title, path: `/${page}` },
          ]}
        />
        <h1 className="page-title">{p.title}</h1>
      </header>
      <div className="prose">
        <Blocks blocks={p.body} />
      </div>
    </div>
  );
}
