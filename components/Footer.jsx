import Link from 'next/link';
import { COLLECTIONS, GIFT_COLLECTION, SITE } from '@/data/catalog.mjs';
import { GUIDES } from '@/data/guides.mjs';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <p className="wordmark wordmark--footer">Rapoteque</p>
          <p>
            Original old school hip hop apparel. Every design is drawn in-house and printed on demand when you
            order.
          </p>
          <p>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <br />
            <a href={SITE.instagram} rel="noopener">
              Instagram
            </a>
          </p>
        </div>
        <div>
          <h2 className="footer-h">Shop</h2>
          <ul>
            {[...COLLECTIONS, GIFT_COLLECTION].map((c) => (
              <li key={c.slug}>
                <Link href={`/collections/${c.slug}`}>{c.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/shop">All products</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="footer-h">Read</h2>
          <ul>
            {GUIDES.slice(0, 6).map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`}>{g.short}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer-h">Help</h2>
          <ul>
            <li><Link href="/shipping">Shipping</Link></li>
            <li><Link href="/returns">Returns &amp; exchanges</Link></li>
            <li><Link href="/size-guide">Size guide</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-legal">
        <p>© {new Date().getFullYear()} Rapoteque. All designs are original artwork. Not affiliated with any artist, label or brand.</p>
      </div>
    </footer>
  );
}
