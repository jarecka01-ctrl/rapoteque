import Link from 'next/link';
import { GUIDES } from '@/data/guides.mjs';
import { Breadcrumbs } from '@/components/ui';

export const metadata = {
  title: 'Hip Hop Guides: History, Style & Party Ideas',
  description:
    'Guides on old school hip hop: the golden age, boom bap, 80s and 90s fashion, party outfit ideas, slang and gift ideas for hip hop fans.',
  alternates: { canonical: '/guides' },
};

export default function Guides() {
  return (
    <div className="wrap">
      <header className="page-head">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Guides', path: '/guides' },
          ]}
        />
        <h1 className="page-title">Liner notes</h1>
        <div className="page-intro">
          <p>Short guides to the culture behind the clothes: history, style, slang and how to throw the party.</p>
        </div>
      </header>
      <ul className="guide-list">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}`}>
              <h2>{g.title}</h2>
              <p>{g.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
