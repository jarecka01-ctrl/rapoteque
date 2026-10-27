# Rapoteque

Old school hip hop apparel store: Next.js on Vercel, Stripe Checkout, print-on-demand fulfillment through Printful.

All designs are original artwork (see `scripts/designs.mjs`). No artist names, likenesses, song or album titles, lyrics, logos or brand patterns are used anywhere in products, titles, tags or SEO copy. Keep it that way: it is what keeps the store, the Printful account and the payment processor safe.

## How it works

```
data/catalog.mjs      designs, garments, colors, collections, products (single source of truth)
data/guides.mjs       long-form SEO guides
data/pages.mjs        shipping, returns, privacy, terms, size guide, about, contact
scripts/designs.mjs   SVG artwork for every design + all-over pattern
scripts/render.mjs    renders print files (public/print) and product mockups (public/mockups)
scripts/brand.mjs     share image + icons
app/                  Next.js App Router pages, sitemap, robots, API routes
lib/order.js          cart validation, Stripe metadata encoding
lib/printful.js       Printful order creation (variant lookup by model + color + size)
```

Order flow: cart (localStorage) → `/api/checkout` creates a Stripe Checkout Session with server-side prices → Stripe calls `/api/stripe-webhook` on `checkout.session.completed` → the webhook creates a Printful order with the catalog variant and the print file URL from `public/print`.

## Environment variables

See `.env.example`. Without `STRIPE_SECRET_KEY` the store is fully browsable and the cart shows "Checkout opens soon".

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical domain, e.g. `https://rapoteque.com`. Printful downloads print files from here. |
| `NEXT_PUBLIC_NOINDEX` | `true` while in prototype, to keep the vercel.app URL out of Google. Remove at launch. |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Stripe Checkout + webhook verification. |
| `PRINTFUL_API_KEY`, `PRINTFUL_STORE_ID` | Printful private token (and store id if needed). |
| `PRINTFUL_AUTO_CONFIRM` | `true` sends orders to production automatically. Default creates drafts to confirm by hand. |

## Launch checklist

1. Buy the domain, add it to the Vercel project, set `NEXT_PUBLIC_SITE_URL`, remove `NEXT_PUBLIC_NOINDEX`.
2. Fill in the `[bracketed]` business details in `data/pages.mjs` (required by EU law).
3. Printful: create a "Manual order / API" store, generate a private token, set the env vars.
4. Place one test order per garment type with `PRINTFUL_AUTO_CONFIRM=false` and check the draft in Printful: variant, placement, print size. Embroidery files may need Printful's digitization step on the first order.
5. Order physical samples of the best sellers and replace the generated mockups with real photos (better conversion and better Google Shopping results).
6. Stripe: add the webhook endpoint `https://YOURDOMAIN/api/stripe-webhook` for `checkout.session.completed`, then switch to live keys.
7. Submit `https://YOURDOMAIN/sitemap.xml` in Google Search Console and connect Google Merchant Center (free listings).
8. Before adding any new design, run the phrase through the USPTO and EUIPO trademark search for clothing (class 25).

## Regenerating artwork

```
npm i
# fonts in assets/fonts must be visible to fontconfig, e.g.:
mkdir -p ~/.fonts && cp assets/fonts/*.ttf ~/.fonts && fc-cache -f
npm run render
node scripts/brand.mjs
```

Fonts are SIL Open Font License (see `assets/fonts/*-OFL.txt`).
