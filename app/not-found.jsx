import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1 className="page-title">This track got eaten by the tape deck</h1>
        <div className="page-intro">
          <p>The page you were looking for does not exist or has moved.</p>
        </div>
      </header>
      <Link href="/shop" className="btn">
        Shop all designs
      </Link>
    </div>
  );
}
