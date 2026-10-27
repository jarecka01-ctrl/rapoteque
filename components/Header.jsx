'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from './CartProvider';

const NAV = [
  { href: '/collections/old-school-hip-hop-shirts', label: 'T-shirts' },
  { href: '/collections/90s-hip-hop-hoodies-sweatshirts', label: 'Hoodies & sweats' },
  { href: '/collections/hip-hop-hats-beanies', label: 'Hats' },
  { href: '/collections/hip-hop-baby-kids-clothes', label: 'Baby & kids' },
  { href: '/collections/hip-hop-gifts', label: 'Gifts' },
  { href: '/guides', label: 'Guides' },
];

export default function Header() {
  const { count, ready } = useCart();
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/" className="wordmark" aria-label="Rapoteque home">
          Rapoteque
        </Link>
        <nav id="main-nav" className={`main-nav${open ? ' is-open' : ''}`} aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={pathname.startsWith(n.href) ? 'page' : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/cart" className="cart-link" aria-label={`Cart, ${ready ? count : 0} items`}>
            Cart <span className="cart-count">{ready ? count : 0}</span>
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </header>
  );
}
