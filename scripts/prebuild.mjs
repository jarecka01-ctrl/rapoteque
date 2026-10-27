// Runs before `next build`. Makes the build self-sufficient:
// 1. If the bundled fonts are missing (e.g. a source-only deploy), downloads the
//    same SIL OFL fonts as TTF from Google Fonts into assets/fonts.
// 2. Points fontconfig at assets/fonts so sharp/librsvg can render the artwork.
// 3. Renders print files, mockups and brand assets if they are missing.

import { existsSync, mkdirSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const root = new URL('..', import.meta.url).pathname;
const fontDir = join(root, 'assets/fonts');
mkdirSync(fontDir, { recursive: true });

const FONTS = [
  { file: 'Boldonse-Regular.ttf', family: 'Boldonse', weight: 400 },
  { file: 'BigShoulders-Regular.ttf', family: 'Big Shoulders', weight: 400 },
  { file: 'BigShoulders-Bold.ttf', family: 'Big Shoulders', weight: 700 },
  { file: 'EricaOne-Regular.ttf', family: 'Erica One', weight: 400 },
  { file: 'NothingYouCouldDo-Regular.ttf', family: 'Nothing You Could Do', weight: 400 },
  { file: 'Silkscreen-Regular.ttf', family: 'Silkscreen', weight: 400 },
  { file: 'BricolageGrotesque-Regular.ttf', family: 'Bricolage Grotesque', weight: 400 },
  { file: 'BricolageGrotesque-Bold.ttf', family: 'Bricolage Grotesque', weight: 700 },
];

for (const f of FONTS) {
  const dest = join(fontDir, f.file);
  if (existsSync(dest)) continue;
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(f.family)}:wght@${f.weight}`,
    // No modern User-Agent: Google then serves plain TrueType files.
    { headers: { 'User-Agent': 'Mozilla/4.0' } }
  ).then((r) => r.text());
  const url = css.match(/url\((https:[^)]+)\)/)?.[1];
  if (!url) throw new Error(`Could not find a font URL for ${f.family} ${f.weight}:\n${css.slice(0, 300)}`);
  const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
  writeFileSync(dest, buf);
  console.log(`font: downloaded ${f.file} (${buf.length} bytes)`);
}

// fontconfig must be configured before sharp is loaded.
const conf = join(root, '.fonts.conf');
writeFileSync(
  conf,
  `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig><dir>${fontDir}</dir><cachedir>/tmp/fontconfig-cache</cachedir></fontconfig>`
);
process.env.FONTCONFIG_FILE = conf;

const mockDir = join(root, 'public/mockups');
const printDir = join(root, 'public/print');
const haveArt =
  existsSync(mockDir) && readdirSync(mockDir).length > 0 && existsSync(printDir) && readdirSync(printDir).length > 0;

if (!haveArt || process.env.FORCE_RENDER === 'true') {
  await import('./render.mjs');
}
if (!existsSync(join(root, 'public/og.png')) || !existsSync(join(root, 'app/icon.png'))) {
  await import('./brand.mjs');
}
console.log('prebuild complete');
