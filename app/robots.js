import { SITE } from '@/data/catalog.mjs';

export default function robots() {
  if (process.env.NEXT_PUBLIC_NOINDEX === 'true') {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/cart', '/checkout/', '/print/'] }],
    sitemap: new URL('/sitemap.xml', SITE.url).toString(),
    host: SITE.url,
  };
}
