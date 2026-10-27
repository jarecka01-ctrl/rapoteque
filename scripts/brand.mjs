// Generates the social share image and site icons.
import { createRequire } from 'module';
import { designSvg, PAL } from './designs.mjs';

const sharp = createRequire(import.meta.url)('sharp');
const root = new URL('..', import.meta.url).pathname;

const art = await sharp(Buffer.from(designSvg('press-play', 'dark'))).resize(390, 520).png().toBuffer();

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${PAL.cobalt}"/>
  <rect x="0" y="0" width="56" height="630" fill="${PAL.yellow}"/>
  <rect x="0" y="600" width="1200" height="10" fill="${PAL.yellow}"/>
  <rect x="0" y="610" width="1200" height="10" fill="${PAL.red}"/>
  <rect x="0" y="620" width="1200" height="10" fill="${PAL.paper}"/>
  <text x="110" y="250" font-family="Boldonse" font-size="76" fill="${PAL.yellow}">RAPOTEQUE</text>
  <text x="110" y="340" font-family="Big Shoulders" font-weight="700" font-size="58" fill="${PAL.paper}">Old school hip hop apparel</text>
  <text x="110" y="410" font-family="Bricolage Grotesque" font-size="32" fill="#d9ddf7">Original designs. Printed on demand. Shipped worldwide.</text>
</svg>`;
await sharp(Buffer.from(og))
  .composite([{ input: art, left: 760, top: 50 }])
  .png()
  .toFile(`${root}public/og.png`);

const icon = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="${PAL.cobalt}"/>
  <rect x="56" y="150" width="400" height="230" rx="28" fill="${PAL.paper}"/>
  <rect x="80" y="172" width="352" height="34" fill="${PAL.yellow}"/>
  <rect x="80" y="206" width="352" height="12" fill="${PAL.red}"/>
  <circle cx="186" cy="290" r="44" fill="${PAL.ink}"/><circle cx="186" cy="290" r="18" fill="${PAL.paper}"/>
  <circle cx="326" cy="290" r="44" fill="${PAL.ink}"/><circle cx="326" cy="290" r="18" fill="${PAL.paper}"/>
</svg>`;
await sharp(Buffer.from(icon(512))).png().toFile(`${root}app/icon.png`);
await sharp(Buffer.from(icon(512))).png().toFile(`${root}public/icon.png`);
await sharp(Buffer.from(icon(180))).resize(180, 180).png().toFile(`${root}app/apple-icon.png`);
console.log('brand assets done');
