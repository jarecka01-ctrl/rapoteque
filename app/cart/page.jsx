import CartView from './CartView';

export const metadata = {
  title: 'Cart',
  robots: { index: false },
  alternates: { canonical: '/cart' },
};

export default function CartPage() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1 className="page-title">Your cart</h1>
      </header>
      <CartView />
    </div>
  );
}
