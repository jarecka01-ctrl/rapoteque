// Renders print-ready files and product mockups from scripts/designs.mjs.
//   node scripts/render.mjs
// Output:
//   public/print/<design>--light.png   3600x4800 transparent (DTG, light garments)
//   public/print/<design>--dark.png    3600x4800 transparent (DTG, dark garments)
//   public/print/<design>--<v>.png     1200x480  (embroidery)
//   public/print/retro-patchwork.png   6000x6000 seamless pattern (all-over print)
//   public/mockups/<product>--<color>.webp
// Requires sharp (npm i -D sharp) and the fonts in assets/fonts installed
// system-wide (fontconfig), e.g. copy them to ~/.fonts and run fc-cache.

import { createRequire } from 'module';
import { mkdirSync } from 'fs';
import { designSvg, PRINT_SLUGS, EMB_SLUGS, patchworkTile } from './designs.mjs';
import { PRODUCTS, GARMENTS, COLORS, colorSlug, getDesign } from '../data/catalog.mjs';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const root = new URL('..', import.meta.url).pathname;
mkdirSync(root + 'public/print', { recursive: true });
mkdirSync(root + 'public/mockups', { recursive: true });

const only = process.argv.includes('--mockups-only');

// ---------- Print files ----------
if (!only) {
  for (const slug of PRINT_SLUGS) {
    for (const v of ['light', 'dark']) {
      await sharp(Buffer.from(designSvg(slug, v)), { density: 72 * 3 })
        .resize(3600, 4800)
        .png({ compressionLevel: 9, palette: false })
        .toFile(`${root}public/print/${slug}--${v}.png`);
    }
  }
  for (const slug of EMB_SLUGS) {
    for (const v of ['light', 'dark']) {
      await sharp(Buffer.from(designSvg(slug, v)), { density: 72 * 1.5 })
        .resize(1800, 720)
        .png({ compressionLevel: 9 })
        .toFile(`${root}public/print/${slug}--${v}.png`);
    }
  }
  const tile = patchworkTile();
  const sheet = `<svg xmlns="http://www.w3.org/2000/svg" width="6000" height="6000" viewBox="0 0 6000 6000"><defs><pattern id="p" width="1500" height="1500" patternUnits="userSpaceOnUse"><g transform="scale(1.25)">${tile}</g></pattern></defs><rect width="6000" height="6000" fill="url(#p)"/></svg>`;
  await sharp(Buffer.from(sheet)).png({ compressionLevel: 9 }).toFile(`${root}public/print/retro-patchwork.png`);
  console.log('print files done');
}

// ---------- Garment silhouettes (1200x1200 canvas) ----------
const SHAPES = {
  tee: {
    body: 'M420 170 Q600 240 780 170 L1010 285 L1095 520 L955 575 L900 470 L905 1080 Q600 1100 295 1080 L300 470 L245 575 L105 520 L190 285 Z',
    collar: 'M420 170 Q600 240 780 170 Q770 205 755 215 Q600 280 445 215 Q430 205 420 170 Z',
    folds: ['M300 470 Q330 760 310 1060', 'M900 470 Q870 760 890 1060', 'M560 900 Q620 980 700 1060'],
    print: { x: 420, y: 320, w: 360, h: 480 },
  },
  'kids-tee': {
    scale: 0.82,
    of: 'tee',
  },
  sweatshirt: {
    body: 'M420 170 Q600 240 780 170 L1000 260 Q1060 450 1110 860 L1115 945 L995 955 L960 900 L905 520 L905 1040 L295 1040 L295 520 L240 900 L205 955 L85 945 L90 860 Q140 450 200 260 Z',
    rib: ['M295 1040 L905 1040 L905 1095 Q600 1110 295 1095 Z', 'M995 955 L1115 945 L1118 1000 L1000 1010 Z', 'M205 955 L85 945 L82 1000 L200 1010 Z'],
    collar: 'M420 170 Q600 240 780 170 Q775 215 750 228 Q600 290 450 228 Q425 215 420 170 Z',
    folds: ['M295 560 Q320 800 300 1030', 'M905 560 Q880 800 900 1030', 'M150 600 Q190 760 180 900', 'M1050 600 Q1010 760 1020 900'],
    print: { x: 420, y: 320, w: 360, h: 480 },
  },
  hoodie: {
    body: 'M420 190 Q600 250 780 190 L1000 270 Q1060 460 1110 870 L1115 950 L995 960 L960 905 L905 530 L905 1040 L295 1040 L295 530 L240 905 L205 960 L85 950 L90 870 Q140 460 200 270 Z',
    rib: ['M295 1040 L905 1040 L905 1095 Q600 1110 295 1095 Z', 'M995 960 L1115 950 L1118 1005 L1000 1015 Z', 'M205 960 L85 950 L82 1005 L200 1015 Z'],
    hood: 'M380 230 Q360 90 600 70 Q840 90 820 230 Q800 300 700 320 L600 330 L500 320 Q400 300 380 230 Z',
    hoodInner: 'M450 230 Q450 140 600 130 Q750 140 750 230 Q730 280 600 295 Q470 280 450 230 Z',
    pocket: 'M410 820 L790 820 L850 1000 L350 1000 Z',
    strings: ['M555 300 L545 520', 'M645 300 L655 520'],
    folds: ['M295 560 Q320 800 300 1030', 'M905 560 Q880 800 900 1030'],
    print: { x: 450, y: 360, w: 300, h: 400 },
  },
  onesie: {
    body: 'M440 200 Q600 270 760 200 L945 295 L995 435 L880 475 L840 420 L840 860 Q840 975 735 1030 Q700 1050 690 1080 L510 1080 Q500 1050 465 1030 Q360 975 360 860 L360 420 L320 475 L205 435 L255 295 Z',
    collar: 'M440 200 Q600 270 760 200 Q745 235 725 245 Q600 300 475 245 Q455 235 440 200 Z',
    folds: ['M360 470 Q380 700 370 850', 'M840 470 Q820 700 830 850'],
    print: { x: 450, y: 340, w: 300, h: 400 },
  },
  'dad-hat': {
    custom: 'hat',
    print: { x: 420, y: 470, w: 360, h: 144 },
  },
  beanie: {
    custom: 'beanie',
    print: { x: 420, y: 690, w: 360, h: 144 },
  },
  'aop-sweatshirt': { of: 'sweatshirt', aop: true },
  'aop-bomber': { custom: 'bomber', aop: true },
};

const shade = (hex, amt) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = (s) => Math.max(0, Math.min(255, ((n >> s) & 255) + amt));
  return '#' + [16, 8, 0].map((s) => ch(s).toString(16).padStart(2, '0')).join('');
};

function garmentSvg(garmentKey, colorName, art /* {href,w,h} */) {
  let spec = SHAPES[garmentKey];
  const base = spec.of ? SHAPES[spec.of] : spec;
  const aop = !!spec.aop;
  const fillHex = COLORS[colorName].hex;
  const fill = aop ? 'url(#pat)' : fillHex;
  const dark = shade(fillHex, -22);
  const lineCol = COLORS[colorName].dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.08)';
  const scale = spec.scale || 1;
  const bg = '#e4e6ea';

  const defs = `
    <defs>
      <linearGradient id="sh" x1="0" x2="1">
        <stop offset="0" stop-color="#000" stop-opacity=".16"/>
        <stop offset=".18" stop-color="#000" stop-opacity="0"/>
        <stop offset=".82" stop-color="#000" stop-opacity="0"/>
        <stop offset="1" stop-color="#000" stop-opacity=".16"/>
      </linearGradient>
      <radialGradient id="flr" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      ${aop ? `<pattern id="pat" width="300" height="300" patternUnits="userSpaceOnUse"><g transform="scale(.25)">${patchworkTile()}</g></pattern>` : ''}
    </defs>`;

  let g = '';
  const printBox = base.print;
  const artTag = (box) =>
    art ? `<image href="${art.href}" x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" preserveAspectRatio="xMidYMid meet"/>` : '';

  if (base.custom === 'hat' || spec.custom === 'hat') {
    g += `<ellipse cx="600" cy="905" rx="420" ry="40" fill="url(#flr)"/>`;
    g += `<path d="M260 760 Q260 330 600 320 Q940 330 940 760 Z" fill="${fill}"/>`;
    g += `<path d="M600 322 L600 760 M420 360 Q380 560 400 760 M780 360 Q820 560 800 760" stroke="${dark}" stroke-width="5" fill="none"/>`;
    g += `<circle cx="600" cy="326" r="16" fill="${dark}"/>`;
    g += `<path d="M290 745 Q600 700 910 745 Q900 860 600 900 Q300 860 290 745 Z" fill="${dark}"/>`;
    g += `<path d="M320 770 Q600 730 880 770 Q860 845 600 875 Q340 845 320 770 Z" fill="none" stroke="${shade(fillHex, -45)}" stroke-width="4" stroke-dasharray="10 8"/>`;
    g += `<path d="M260 760 Q260 330 600 320 Q940 330 940 760 Z" fill="url(#sh)"/>`;
    g += artTag(SHAPES['dad-hat'].print);
  } else if (spec.custom === 'beanie') {
    g += `<ellipse cx="600" cy="905" rx="340" ry="36" fill="url(#flr)"/>`;
    const dome = 'M330 700 L330 560 Q330 250 600 240 Q870 250 870 560 L870 700 Z';
    g += `<clipPath id="dome"><path d="${dome}"/></clipPath><path d="${dome}" fill="${fill}"/><g clip-path="url(#dome)">`;
    for (let i = 0; i < 13; i++) g += `<line x1="${355 + i * 41}" y1="240" x2="${355 + i * 41}" y2="700" stroke="${dark}" stroke-width="4" opacity=".7"/>`;
    g += `</g>`;
    g += `<rect x="310" y="640" width="580" height="240" rx="24" fill="${shade(fillHex, -10)}"/>`;
    for (let i = 0; i < 28; i++) g += `<line x1="${330 + i * 20}" y1="650" x2="${330 + i * 20}" y2="870" stroke="${dark}" stroke-width="3" opacity=".6"/>`;
    g += `<path d="M310 640 L890 640 L890 880 L310 880 Z" fill="url(#sh)"/>`;
    g += artTag(SHAPES.beanie.print);
  } else if (spec.custom === 'bomber') {
    const body = 'M430 180 L770 180 L1000 270 Q1060 460 1105 860 L1110 930 L990 940 L955 890 L900 520 L900 1030 L300 1030 L300 520 L245 890 L210 940 L90 930 L95 860 Q140 460 200 270 Z';
    g += `<ellipse cx="600" cy="1110" rx="460" ry="40" fill="url(#flr)"/>`;
    g += `<path d="${body}" fill="url(#pat)"/>`;
    g += `<path d="M300 1030 L900 1030 L900 1095 L300 1095 Z" fill="#15171c"/>`;
    g += `<path d="M990 940 L1110 930 L1113 995 L995 1005 Z M210 940 L90 930 L87 995 L205 1005 Z" fill="#15171c"/>`;
    g += `<path d="M430 180 Q600 120 770 180 L740 240 Q600 200 460 240 Z" fill="#15171c"/>`;
    g += `<rect x="594" y="215" width="12" height="880" fill="#c9cdd3"/>`;
    g += `<path d="M380 700 L470 640 M820 700 L730 640" stroke="#15171c" stroke-width="12" stroke-linecap="round"/>`;
    g += `<path d="${body}" fill="url(#sh)"/>`;
  } else {
    const t = scale !== 1 ? ` transform="translate(${600 * (1 - scale)} ${640 * (1 - scale)}) scale(${scale})"` : '';
    g += `<g${t}>`;
    g += `<ellipse cx="600" cy="1110" rx="460" ry="40" fill="url(#flr)"/>`;
    if (base.hood) g += `<path d="${base.hood}" fill="${aop ? fill : shade(fillHex, -6)}"/><path d="${base.hoodInner}" fill="${shade(fillHex, -40)}"/>`;
    g += `<path d="${base.body}" fill="${fill}"/>`;
    (base.rib || []).forEach((d) => (g += `<path d="${d}" fill="${aop ? '#15171c' : dark}"/>`));
    if (base.collar) g += `<path d="${base.collar}" fill="${aop ? '#15171c' : dark}"/>`;
    (base.folds || []).forEach((d) => (g += `<path d="${d}" stroke="${lineCol}" stroke-width="6" fill="none" stroke-linecap="round"/>`));
    if (base.pocket) g += `<path d="${base.pocket}" fill="none" stroke="${dark}" stroke-width="6"/>`;
    (base.strings || []).forEach((d) => (g += `<path d="${d}" stroke="${shade(fillHex, 40)}" stroke-width="10" stroke-linecap="round"/>`));
    g += `<path d="${base.body}" fill="url(#sh)"/>`;
    if (!aop) g += artTag(printBox);
    g += `</g>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="1200" viewBox="0 0 1200 1200"><rect width="1200" height="1200" fill="${bg}"/>${defs}${g}</svg>`;
}

// Cache design art as base64 PNG data URIs (small, just for mockups).
const artCache = new Map();
async function artFor(designSlug, variant, kind) {
  const key = `${designSlug}:${variant}`;
  if (artCache.has(key)) return artCache.get(key);
  const svg = designSvg(designSlug, variant);
  const [w, h] = kind === 'embroidery' ? [900, 360] : [900, 1200];
  const png = await sharp(Buffer.from(svg)).resize(w, h).png().toBuffer();
  const v = { href: `data:image/png;base64,${png.toString('base64')}`, w, h };
  artCache.set(key, v);
  return v;
}

let count = 0;
for (const p of PRODUCTS) {
  const d = getDesign(p.design);
  for (const color of p.colors) {
    const variant = COLORS[color].dark ? 'dark' : 'light';
    const art = d.kind === 'aop' ? null : await artFor(d.slug, variant, d.kind);
    const svg = garmentSvg(p.garment, color, art);
    await sharp(Buffer.from(svg))
      .resize(1000, 1000)
      .webp({ quality: 80 })
      .toFile(`${root}public/mockups/${p.slug}--${colorSlug(color)}.webp`);
    count++;
  }
}
console.log('mockups done:', count, 'garments:', Object.keys(GARMENTS).length);
