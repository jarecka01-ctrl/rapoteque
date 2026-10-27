import Link from 'next/link';
import ClearCart from './ClearCart';

export const metadata = {
  title: 'Order confirmed',
  robots: { index: false },
};

export default function Success() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1 className="page-title">Order confirmed</h1>
        <div className="page-intro">
          <p>
            Thanks for your order. A receipt is on its way to your inbox. Your pieces go into production now, and you
            will get a tracking link by email when they ship.
          </p>
        </div>
      </header>
      <ClearCart />
      <Link href="/shop" className="btn">
        Keep browsing
      </Link>
    </div>
  );
}
