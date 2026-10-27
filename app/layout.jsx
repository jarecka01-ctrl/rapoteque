import localFont from 'next/font/local';
import { SITE } from '@/data/catalog.mjs';
import { CartProvider } from '@/components/CartProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { JsonLd, orgLd } from '@/lib/seo';
import './globals.css';
import './type-fixes.css';

const display = localFont({
  src: '../assets/fonts/Boldonse-Regular.ttf',
  variable: '--font-display',
  display: 'swap',
});

const condensed = localFont({
  src: [
    { path: '../assets/fonts/BigShoulders-Regular.ttf', weight: '400' },
    { path: '../assets/fonts/BigShoulders-Bold.ttf', weight: '700' },
  ],
  variable: '--font-condensed',
  display: 'swap',
});

const body = localFont({
  src: [
    { path: '../assets/fonts/BricolageGrotesque-Regular.ttf', weight: '400' },
    { path: '../assets/fonts/BricolageGrotesque-Bold.ttf', weight: '700' },
  ],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Rapoteque – Old School Hip Hop Clothing & 90s Rap Tees',
    template: '%s | Rapoteque',
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_US',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Rapoteque old school hip hop apparel' }],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
  robots: process.env.NEXT_PUBLIC_NOINDEX === 'true' ? { index: false, follow: false } : undefined,
};

export const viewport = {
  themeColor: '#2340c8',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${condensed.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
        <JsonLd data={orgLd} />
      </body>
    </html>
  );
}
