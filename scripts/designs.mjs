// Original Rapoteque artwork, drawn as SVG.
// Front prints use a 1200 x 1600 canvas (12" x 16" print area at 100 units/inch).
// Embroidery uses 1200 x 480. The AOP pattern is a seamless 1200 x 1200 tile.
//
// Fonts (all SIL OFL, bundled in assets/fonts): Boldonse, Big Shoulders,
// Erica One, Nothing You Could Do, Silkscreen, Bricolage Grotesque.

export const PAL = {
  cobalt: '#2340c8',
  yellow: '#ffd23f',
  red: '#e63b2e',
  silver: '#c9cdd3',
  ink: '#15171c',
  paper: '#f4f5f1',
};

// Ink sets: what a design is printed with on light vs dark garments.
export function inks(variant) {
  return variant === 'dark'
    ? { fg: PAL.paper, bg: PAL.ink, a1: PAL.yellow, a2: PAL.red, a3: '#5f7bff', mute: PAL.silver }
    : { fg: PAL.ink, bg: PAL.paper, a1: PAL.cobalt, a2: PAL.red, a3: PAL.yellow, mute: '#8b9099' };
}

const W = 1200;
const H = 1600;

const svg = (body, w = W, h = H) =>
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// Text helper. Uses textLength to lock width so print files are predictable.
function text(str, { x = W / 2, y, size, font = 'Boldonse', fill, anchor = 'middle', width, ls = 0, weight }) {
  const tl = width ? ` textLength="${width}" lengthAdjust="spacingAndGlyphs"` : '';
  const fw = weight ? ` font-weight="${weight}"` : '';
  return `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}"${fw} fill="${fill}" text-anchor="${anchor}" letter-spacing="${ls}"${tl}>${esc(str)}</text>`;
}


// Place characters along a circle (librsvg has weak textPath support).
// Angles in degrees, 0 = 3 o'clock, negative = upper half.
function arcText(str, cx, cy, r, a0, a1, { size, font, fill, weight, flip = false }) {
  const chars = [...str];
  const n = chars.length;
  let out = '';
  chars.forEach((ch, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const a = a0 + (a1 - a0) * t;
    const rad = (a * Math.PI) / 180;
    const x = cx + Math.cos(rad) * r;
    const y = cy + Math.sin(rad) * r;
    const rot = flip ? a - 90 : a + 90;
    const fw = weight ? ` font-weight="${weight}"` : '';
    out += `<text x="0" y="0" font-family="${font}" font-size="${size}"${fw} fill="${fill}" text-anchor="middle" dominant-baseline="central" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)})">${esc(ch)}</text>`;
  });
  return out;
}

function reel(cx, cy, r, c) {
  let teeth = '';
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    const x = cx + Math.cos(a) * r * 0.55;
    const y = cy + Math.sin(a) * r * 0.55;
    teeth += `<rect x="${x - r * 0.09}" y="${y - r * 0.18}" width="${r * 0.18}" height="${r * 0.36}" fill="${c.bgTone}" transform="rotate(${(i * 60) + 90} ${x} ${y})"/>`;
  }
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c.fg}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.78}" fill="${c.bgTone}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.7}" fill="${c.fg}"/>${teeth}`;
}

function cassette(x, y, w, c, { label = 'SIDE A', sub = '90 MIN' } = {}) {
  const h = w * 0.63;
  const s = w / 900;
  const k = { ...c, bgTone: c.tone };
  return `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="0" y="0" width="900" height="567" rx="38" fill="${c.fg}"/>
    <rect x="34" y="34" width="832" height="360" rx="18" fill="${c.a1}"/>
    <rect x="34" y="34" width="832" height="70" fill="${c.a3}"/>
    <rect x="34" y="104" width="832" height="22" fill="${c.a2}"/>
    ${text(label, { x: 70, y: 86, size: 40, font: 'Boldonse', fill: c.ink, anchor: 'start' })}
    ${text(sub, { x: 830, y: 86, size: 34, font: 'Big Shoulders', weight: 700, fill: c.ink, anchor: 'end' })}
    <rect x="200" y="170" width="500" height="170" rx="85" fill="${c.tone}"/>
    <rect x="330" y="215" width="240" height="80" rx="10" fill="${c.fg}" opacity="0.25"/>
    ${reel(285, 255, 62, k)}
    ${reel(615, 255, 62, k)}
    <path d="M150 567 L210 430 L690 430 L750 567 Z" fill="${c.tone}"/>
    <circle cx="300" cy="500" r="16" fill="${c.fg}"/><circle cx="600" cy="500" r="16" fill="${c.fg}"/>
    <rect x="410" y="485" width="80" height="30" rx="6" fill="${c.fg}"/>
    <circle cx="70" cy="70" r="0"/>
  </g>`;
  void h;
}

// ---------- Front prints ----------

const DESIGN_SVGS = {
  'press-play': (v) => {
    const c = inks(v);
    const tone = v === 'dark' ? PAL.ink : PAL.paper;
    return svg(`
      ${text('PRESS', { y: 270, size: 200, fill: c.fg, width: 1000 })}
      ${text('PLAY', { y: 545, size: 200, fill: c.fg, width: 1000 })}
      ${cassette(150, 660, 900, { fg: c.fg, a1: c.a1 === PAL.yellow ? PAL.cobalt : c.a1, a2: PAL.red, a3: PAL.yellow, ink: PAL.ink, tone })}
      <polygon points="560,1330 560,1450 660,1390" fill="${c.a2}"/>
      ${text('SIDE A / RECORDED LOUD', { y: 1545, size: 64, font: 'Big Shoulders', weight: 700, fill: c.fg, width: 900 })}
    `);
  },

  'pause-tape-producer': (v) => {
    const c = inks(v);
    const btn = (x, shape) => `<g transform="translate(${x} 1250)"><rect width="220" height="170" rx="18" fill="none" stroke="${c.fg}" stroke-width="14"/>${shape}</g>`;
    return svg(`
      ${text('PAUSE', { y: 400, size: 420, font: 'Big Shoulders', weight: 700, fill: c.fg, width: 1100 })}
      ${text('TAPE', { y: 760, size: 420, font: 'Big Shoulders', weight: 700, fill: c.a1, width: 1100 })}
      ${text('PRODUCER', { y: 1120, size: 300, font: 'Big Shoulders', weight: 700, fill: c.fg, width: 1100 })}
      ${btn(50, `<polygon points="130,45 130,125 70,85" fill="${c.fg}"/><polygon points="80,45 80,125 20,85" fill="${c.fg}" transform="translate(30 0)"/>`)}
      ${btn(340, `<polygon points="80,40 80,130 160,85" fill="${c.fg}"/>`)}
      ${btn(630, `<rect x="65" y="42" width="30" height="86" fill="${c.a2}"/><rect x="125" y="42" width="30" height="86" fill="${c.a2}"/>`)}
      ${btn(920, `<rect x="70" y="45" width="80" height="80" fill="${c.fg}"/>`)}
      ${text('two decks, one break, no excuses', { y: 1540, size: 70, font: 'Nothing You Could Do', fill: c.fg })}
    `);
  },

  'crate-digger': (v) => {
    const c = inks(v);
    const sleeves = [
      [210, -12, c.a1], [330, 6, c.a2], [450, -4, c.a3], [570, 10, c.fg], [690, -8, c.a1], [810, 4, c.a2],
    ]
      .map(
        ([x, r, col]) => `<g transform="rotate(${r} ${x + 90} 720)"><rect x="${x}" y="420" width="190" height="300" fill="${col}"/><circle cx="${x + 95}" cy="520" r="62" fill="${v === 'dark' ? PAL.ink : PAL.paper}" opacity="0.9"/><circle cx="${x + 95}" cy="520" r="18" fill="${col}"/></g>`
      )
      .join('');
    let slats = '';
    for (let i = 0; i < 5; i++) slats += `<rect x="${170 + i * 180}" y="700" width="40" height="330" fill="${c.bg}" opacity="0.0"/>`;
    return svg(`
      ${text('CRATE', { y: 260, size: 250, font: 'Erica One', fill: c.fg, width: 1000 })}
      ${sleeves}
      <rect x="150" y="660" width="900" height="400" rx="20" fill="${c.fg}"/>
      ${[0, 1, 2, 3].map((i) => `<rect x="${215 + i * 200}" y="720" width="170" height="70" rx="35" fill="${v === 'dark' ? PAL.ink : PAL.paper}"/>`).join('')}
      ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${200 + i * 118}" y="840" width="34" height="180" rx="8" fill="${v === 'dark' ? PAL.ink : PAL.paper}"/>`).join('')}
      ${slats}
      ${text('DIGGER', { y: 1300, size: 250, font: 'Erica One', fill: c.fg, width: 1000 })}
      ${text('dust on the needle, gold in the grooves', { y: 1470, size: 66, font: 'Nothing You Could Do', fill: c.a1 })}
    `);
  },

  'block-party-1973': (v) => {
    const c = inks(v);
    let dots = '';
    for (let r = 0; r < 14; r++) {
      for (let k = 0; k < 14; k++) {
        const x = 330 + k * 40;
        const y = 300 + r * 40;
        const d = Math.hypot(x - 600, y - 540);
        if (d < 270) dots += `<circle cx="${x}" cy="${y}" r="${Math.max(3, 17 - d / 20)}" fill="${c.a3 === PAL.yellow ? PAL.red : c.a1}"/>`;
      }
    }
    return svg(`
      <rect x="40" y="40" width="1120" height="1520" fill="none" stroke="${c.fg}" stroke-width="18"/>
      <rect x="70" y="70" width="1060" height="1460" fill="none" stroke="${c.fg}" stroke-width="5" stroke-dasharray="20 14"/>
      ${text('THE PEOPLE PRESENT', { y: 220, size: 70, font: 'Big Shoulders', weight: 700, fill: c.fg, width: 820 })}
      ${dots}
      ${text('BLOCK', { y: 1080, size: 185, fill: c.fg, width: 960 })}
      ${text('PARTY', { y: 1330, size: 185, fill: c.a1, width: 960 })}
      ${text('EST. 1973', { y: 1430, size: 80, font: 'Big Shoulders', weight: 700, fill: c.fg, width: 440 })}
      ${text('bring your own speakers', { y: 1505, size: 58, font: 'Nothing You Could Do', fill: c.fg })}
    `);
  },

  'fluent-in-boom-bap': (v) => {
    const c = inks(v);
    let bars = '';
    const hs = [40, 110, 70, 200, 60, 150, 90, 230, 50, 120, 80, 210, 60, 160, 100, 240, 40, 130, 70, 190, 60, 140];
    hs.forEach((h, i) => {
      bars += `<rect x="${130 + i * 43}" y="${1240 - h / 2}" width="26" height="${h}" rx="13" fill="${i % 4 === 3 ? c.a2 : c.a1}"/>`;
    });
    return svg(`
      ${text('fluent in', { y: 250, size: 150, font: 'Nothing You Could Do', fill: c.fg })}
      ${text('BOOM', { y: 640, size: 250, fill: c.fg, width: 1080 })}
      ${text('BAP', { y: 990, size: 250, fill: c.fg, width: 820 })}
      ${bars}
    `);
  },

  'turn-it-up': (v) => {
    const c = inks(v);
    const body = v === 'dark' ? PAL.silver : PAL.ink;
    const inner = v === 'dark' ? PAL.ink : PAL.paper;
    const spk = (cx) => `<circle cx="${cx}" cy="780" r="190" fill="${inner}"/><circle cx="${cx}" cy="780" r="160" fill="${c.a1 === PAL.yellow ? PAL.cobalt : c.a1}"/><circle cx="${cx}" cy="780" r="100" fill="${inner}"/><circle cx="${cx}" cy="780" r="70" fill="${PAL.yellow}"/><circle cx="${cx}" cy="780" r="22" fill="${inner}"/>`;
    return svg(`
      <line x1="880" y1="260" x2="1040" y2="90" stroke="${c.fg}" stroke-width="14" stroke-linecap="round"/>
      <path d="M380 420 L380 330 Q380 290 420 290 L780 290 Q820 290 820 330 L820 420" fill="none" stroke="${c.fg}" stroke-width="40"/>
      <rect x="80" y="420" width="1040" height="660" rx="40" fill="${body}"/>
      <rect x="80" y="420" width="1040" height="80" rx="40" fill="${PAL.red}"/>
      <rect x="80" y="460" width="1040" height="40" fill="${PAL.red}"/>
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="${430 + i * 70}" y="445" width="44" height="34" rx="6" fill="${inner}"/>`).join('')}
      ${spk(300)}${spk(900)}
      <rect x="500" y="650" width="200" height="260" rx="14" fill="${inner}"/>
      <rect x="525" y="690" width="150" height="90" rx="8" fill="${body}"/>
      <circle cx="565" cy="735" r="22" fill="${inner}"/><circle cx="635" cy="735" r="22" fill="${inner}"/>
      ${[0, 1, 2].map((i) => `<rect x="${525 + i * 52}" y="820" width="42" height="60" rx="6" fill="${i === 1 ? PAL.red : body}"/>`).join('')}
      ${text('TURN IT', { y: 1310, size: 150, fill: c.fg, width: 940 })}
      ${text('UP', { y: 1545, size: 150, fill: c.a1, width: 360 })}
    `);
  },

  'spray-can-society': (v) => {
    const c = inks(v);
    const can = v === 'dark' ? PAL.silver : PAL.ink;
    return svg(`
      <g transform="rotate(-12 600 600)">
        <rect x="470" y="190" width="70" height="60" rx="10" fill="${c.a2}"/>
        <rect x="430" y="240" width="150" height="70" rx="20" fill="${can}"/>
        <path d="M400 330 Q400 290 450 290 L560 290 Q610 290 610 330 L610 900 Q610 940 570 940 L440 940 Q400 940 400 900 Z" fill="${can}"/>
        <rect x="400" y="460" width="210" height="300" fill="${c.a1 === PAL.yellow ? PAL.yellow : PAL.cobalt}"/>
        <rect x="400" y="560" width="210" height="40" fill="${PAL.red}"/>
      </g>
      <circle cx="330" cy="200" r="16" fill="${c.a2}"/><circle cx="270" cy="260" r="10" fill="${c.a2}"/><circle cx="360" cy="140" r="8" fill="${c.a2}"/><circle cx="240" cy="180" r="6" fill="${c.a2}"/>
      ${text('SPRAY CAN', { y: 1180, size: 170, font: 'Erica One', fill: c.fg, width: 1080 })}
      ${text('SOCIETY', { y: 1380, size: 190, font: 'Erica One', fill: c.a1, width: 1000 })}
      <path d="M180 1400 L180 1480 M330 1400 L330 1530 M640 1400 L640 1470 M900 1400 L900 1510" stroke="${c.a1}" stroke-width="26" stroke-linecap="round"/>
    `);
  },

  'mic-check': (v) => {
    const c = inks(v);
    const metal = v === 'dark' ? PAL.silver : PAL.ink;
    const inner = v === 'dark' ? PAL.ink : PAL.paper;
    let grille = '';
    for (let i = 0; i < 9; i++) grille += `<line x1="${470 + i * 32}" y1="190" x2="${470 + i * 32}" y2="560" stroke="${inner}" stroke-width="10"/>`;
    return svg(`
      <rect x="430" y="150" width="340" height="450" rx="170" fill="${metal}"/>
      ${grille}
      <rect x="420" y="360" width="360" height="50" fill="${PAL.red}"/>
      <path d="M380 420 Q380 720 600 720 Q820 720 820 420" fill="none" stroke="${metal}" stroke-width="34"/>
      <rect x="580" y="720" width="40" height="190" fill="${metal}"/>
      <rect x="470" y="900" width="260" height="40" rx="20" fill="${metal}"/>
      ${text('MIC CHECK', { y: 1210, size: 150, fill: c.fg, width: 1000 })}
      ${text('ONE, TWO', { y: 1480, size: 230, font: 'Big Shoulders', weight: 700, fill: c.a1, width: 800 })}
    `);
  },

  'golden-era-certified': (v) => {
    const c = inks(v);
    const gold = PAL.yellow;
    const star = (cx, cy, R, r) => {
      let p = '';
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        const rr = i % 2 ? r : R;
        p += `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr} `;
      }
      return `<polygon points="${p}" fill="${PAL.red}"/>`;
    };
    let teeth = '';
    for (let i = 0; i < 48; i++) {
      const a = (i * Math.PI * 2) / 48;
      teeth += `<circle cx="${600 + Math.cos(a) * 470}" cy="${720 + Math.sin(a) * 470}" r="34" fill="${gold}"/>`;
    }
    return svg(`
      ${teeth}
      <circle cx="600" cy="720" r="470" fill="${gold}"/>
      <circle cx="600" cy="720" r="420" fill="${PAL.ink}"/>
      <circle cx="600" cy="720" r="250" fill="none" stroke="${gold}" stroke-width="10"/>
      ${arcText('GOLDEN ERA', 600, 720, 335, -150, -30, { size: 66, font: 'Boldonse', fill: gold })}
      ${arcText('1986 - 1996', 600, 720, 335, 145, 35, { size: 80, font: 'Big Shoulders', weight: 700, fill: gold, flip: true })}
      ${star(600, 720, 170, 72)}
      ${text('CERTIFIED', { y: 1430, size: 170, fill: c.fg, width: 1100 })}
    `);
  },

  'enter-the-cypher': (v) => {
    const c = inks(v);
    let steps = '';
    for (let i = 0; i < 14; i++) {
      const a = (i * Math.PI * 2) / 14;
      const x = 600 + Math.cos(a) * 430;
      const y = 720 + Math.sin(a) * 430;
      const deg = (a * 180) / Math.PI + 90;
      const col = i % 3 === 0 ? c.a2 : c.a1;
      steps += `<g transform="translate(${x} ${y}) rotate(${deg})"><ellipse cx="-22" cy="0" rx="22" ry="42" fill="${col}"/><ellipse cx="22" cy="-14" rx="18" ry="34" fill="${col}"/></g>`;
    }
    return svg(`
      ${steps}
      <circle cx="600" cy="720" r="320" fill="none" stroke="${c.fg}" stroke-width="12" stroke-dasharray="4 26" stroke-linecap="round"/>
      ${text('ENTER THE', { y: 620, size: 110, font: 'Big Shoulders', weight: 700, fill: c.fg, width: 440 })}
      ${text('CYPHER', { y: 870, size: 125, fill: c.fg, width: 540 })}
      ${text('step in, keep it moving', { y: 1380, size: 88, font: 'Nothing You Could Do', fill: c.fg })}
    `);
  },

  'rewind-that': (v) => {
    const c = inks(v);
    const lcd = v === 'dark' ? '#2a2e18' : PAL.ink;
    return svg(`
      <rect x="80" y="260" width="1040" height="360" rx="30" fill="${lcd}"/>
      ${text('REWIND', { y: 470, size: 170, font: 'Silkscreen', fill: '#c8ff5a', width: 900 })}
      ${text('THAT', { y: 580, size: 90, font: 'Silkscreen', fill: '#c8ff5a', width: 380 })}
      <polygon points="600,760 600,1160 280,960" fill="${c.a1}"/>
      <polygon points="920,760 920,1160 600,960" fill="${c.a2}"/>
      ${text('pull up, selector', { y: 1400, size: 96, font: 'Nothing You Could Do', fill: c.fg })}
    `);
  },

  'tiny-beatmaker': (v) => {
    const c = inks(v);
    const cols = [PAL.cobalt, PAL.red, PAL.yellow, '#1ba39c'];
    let pads = '';
    for (let r = 0; r < 4; r++)
      for (let k = 0; k < 4; k++)
        pads += `<rect x="${260 + k * 180}" y="${300 + r * 180}" width="150" height="150" rx="22" fill="${cols[(r + k) % 4]}"/>`;
    return svg(`
      <rect x="220" y="260" width="760" height="760" rx="40" fill="none" stroke="${c.fg}" stroke-width="14"/>
      ${pads}
      ${text('TINY', { y: 1260, size: 155, fill: c.fg, width: 620 })}
      ${text('BEATMAKER', { y: 1480, size: 115, fill: c.fg, width: 980 })}
    `);
  },

  'mixtape-baby': (v) => {
    const c = inks(v);
    const tone = v === 'dark' ? PAL.ink : PAL.paper;
    return svg(`
      ${cassette(230, 300, 740, { fg: c.fg, a1: PAL.cobalt, a2: PAL.red, a3: PAL.yellow, ink: PAL.ink, tone }, { label: 'VOL. 1', sub: 'NEW' })}
      ${text('MIXTAPE', { y: 1060, size: 190, fill: c.fg, width: 1000 })}
      ${text('baby', { y: 1330, size: 230, font: 'Nothing You Could Do', fill: c.a2 })}
    `);
  },

  'future-breaker': (v) => {
    const c = inks(v);
    const star = (cx, cy, R, col) => {
      let p = '';
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        const rr = i % 2 ? R * 0.42 : R;
        p += `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr} `;
      }
      return `<polygon points="${p}" fill="${col}"/>`;
    };
    return svg(`
      ${star(220, 280, 90, c.a3 === PAL.yellow ? PAL.yellow : c.a1)}
      ${star(980, 360, 70, c.a2)}
      ${star(1000, 1350, 80, c.a1)}
      ${star(200, 1300, 60, c.a2)}
      ${text('FUTURE', { y: 720, size: 230, fill: c.fg, width: 1000 })}
      ${text('BREAKER', { y: 1000, size: 200, fill: c.a1, width: 1060 })}
      ${text('spin, freeze, repeat', { y: 1200, size: 86, font: 'Nothing You Could Do', fill: c.fg })}
    `);
  },
};

// ---------- Embroidery (hats) ----------
// Embroidery files are kept to one or two thread colors.
const EMB_SVGS = {
  'boom-bap-embroidered': (v) =>
    svg(text('BOOM BAP', { x: 600, y: 300, size: 150, fill: v === 'dark' ? PAL.paper : PAL.ink, width: 1080 }), 1200, 480),
  'golden-era-embroidered': (v) =>
    svg(
      `${text('GOLDEN ERA', { x: 600, y: 330, size: 260, font: 'Big Shoulders', weight: 700, fill: v === 'dark' ? PAL.yellow : PAL.ink, width: 1000 })}`,
      1200,
      480
    ),
};

// ---------- All-over pattern ----------
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function patchworkTile(seed = 1990) {
  const R = rng(seed);
  const cols = ['#1ba39c', '#d6336c', '#f2b705', '#2340c8', '#15171c', '#f26b1d', '#6c3fc4', '#f4f5f1'];
  const pick = () => cols[Math.floor(R() * cols.length)];
  const S = 150;
  let out = '';
  for (let r = 0; r < 8; r++) {
    for (let k = 0; k < 8; k++) {
      const x = k * S;
      const y = r * S;
      let bg = pick();
      let fg = pick();
      while (fg === bg) fg = pick();
      out += `<rect x="${x}" y="${y}" width="${S}" height="${S}" fill="${bg}"/>`;
      const t = Math.floor(R() * 8);
      const cx = x + S / 2;
      const cy = y + S / 2;
      if (t === 0) out += `<polygon points="${x},${y + S} ${cx},${y} ${x + S},${y + S}" fill="${fg}"/>`;
      if (t === 1) out += `<circle cx="${cx}" cy="${cy}" r="52" fill="${fg}"/><circle cx="${cx}" cy="${cy}" r="30" fill="${bg}"/><circle cx="${cx}" cy="${cy}" r="12" fill="${fg}"/>`;
      if (t === 2) {
        let d = `M${x} ${cy + 20}`;
        for (let i = 0; i < 6; i++) d += ` L${x + (i + 0.5) * 25} ${cy - 20} L${x + (i + 1) * 25} ${cy + 20}`;
        out += `<path d="${d}" fill="none" stroke="${fg}" stroke-width="14"/>`;
      }
      if (t === 3) out += `<rect x="${x + 20}" y="${y + 45}" width="110" height="64" rx="8" fill="${fg}"/><circle cx="${x + 52}" cy="${y + 72}" r="10" fill="${bg}"/><circle cx="${x + 98}" cy="${y + 72}" r="10" fill="${bg}"/>`;
      if (t === 4) for (let i = 0; i < 5; i++) out += `<rect x="${x}" y="${y + i * 30 + 8}" width="${S}" height="14" fill="${fg}"/>`;
      if (t === 5) out += `<polygon points="${x},${y} ${x + S},${y} ${x},${y + S}" fill="${fg}"/>`;
      if (t === 6) for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) out += `<circle cx="${x + 25 + i * 50}" cy="${y + 25 + j * 50}" r="13" fill="${fg}"/>`;
      if (t === 7) out += `<rect x="${x + 35}" y="${y + 35}" width="80" height="80" fill="${fg}" transform="rotate(45 ${cx} ${cy})"/>`;
    }
  }
  return out;
}

// A large pattern sheet (tile repeated) for AOP print files and mockups.
export function patchworkSheet(w, h, scale = 1) {
  const tile = patchworkTile();
  const t = 1200 * scale;
  let body = `<defs><pattern id="pw" width="${t}" height="${t}" patternUnits="userSpaceOnUse"><g transform="scale(${scale})">${tile}</g></pattern></defs><rect width="${w}" height="${h}" fill="url(#pw)"/>`;
  return svg(body, w, h);
}

export function designSvg(slug, variant) {
  if (DESIGN_SVGS[slug]) return DESIGN_SVGS[slug](variant);
  if (EMB_SVGS[slug]) return EMB_SVGS[slug](variant);
  return null;
}

export const PRINT_SLUGS = Object.keys(DESIGN_SVGS);
export const EMB_SLUGS = Object.keys(EMB_SVGS);
