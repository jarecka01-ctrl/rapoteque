// Single source of truth for the Rapoteque catalog.
// Used by the Next.js site AND by scripts/render-designs.mjs (print files + mockups).
//
// IP rule for this file: no artist names, song/album titles, lyrics, logos,
// brand names or likenesses. Only original artwork and generic culture terms.

export const SITE = {
  name: 'Rapoteque',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rapoteque.com',
  tagline: 'Old school hip hop apparel, printed on demand',
  description:
    'Original old school hip hop clothing: cassette, boombox, crate-digging and block party designs on tees, hoodies, sweatshirts, hats and baby onesies. Printed on demand, shipped worldwide.',
  email: 'hello@rapoteque.com',
  instagram: 'https://www.instagram.com/rapoteque_gems/',
  currency: 'USD',
};

// Garment blanks. `printful` tells the fulfillment code how to find the
// Printful catalog product at runtime (by model number or title fragment),
// so no catalog IDs are hard-coded.
export const GARMENTS = {
  tee: {
    label: 'T-Shirt',
    plural: 'T-Shirts',
    blank: 'Bella+Canvas 3001 unisex jersey tee',
    printful: { model: '3001' },
    placement: 'front',
    technique: 'dtg',
    price: 29,
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    specs: [
      '100% combed and ring-spun cotton (heather colors contain polyester)',
      'Lightweight 4.2 oz fabric with a soft, broken-in feel',
      'Side-seamed, retail fit, runs true to size',
      'Printed with water-based inks that soak into the fabric',
    ],
  },
  sweatshirt: {
    label: 'Sweatshirt',
    plural: 'Sweatshirts',
    blank: 'Gildan 18000 heavy blend crewneck',
    printful: { model: '18000' },
    placement: 'front',
    technique: 'dtg',
    price: 44,
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    specs: [
      '50% cotton, 50% polyester heavy blend fleece',
      'Classic relaxed fit with ribbed collar, cuffs and waistband',
      'Air-jet spun yarn for a soft, low-pill surface',
      'Size up one for the roomy 90s silhouette',
    ],
  },
  hoodie: {
    label: 'Hoodie',
    plural: 'Hoodies',
    blank: 'Gildan 18500 heavy blend hoodie',
    printful: { model: '18500' },
    placement: 'front',
    technique: 'dtg',
    price: 52,
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    specs: [
      '50% cotton, 50% polyester heavy blend fleece',
      'Double-lined hood with matching drawcord',
      'Front pouch pocket, ribbed cuffs and waistband',
      'Size up one for an oversized fit',
    ],
  },
  'kids-tee': {
    label: 'Kids T-Shirt',
    plural: 'Kids T-Shirts',
    blank: 'Bella+Canvas 3001Y youth jersey tee',
    printful: { model: '3001Y' },
    placement: 'front',
    technique: 'dtg',
    price: 25,
    sizes: ['S', 'M', 'L', 'XL'],
    specs: [
      '100% combed and ring-spun cotton',
      'Soft lightweight jersey that holds up to the playground',
      'Youth sizes S (6–8) to XL (14–16)',
      'Machine wash cold, inside out',
    ],
  },
  onesie: {
    label: 'Baby Onesie',
    plural: 'Baby Onesies',
    blank: 'Rabbit Skins 4400 baby bodysuit',
    printful: { model: '4400' },
    placement: 'front',
    technique: 'dtg',
    price: 24,
    sizes: ['6M', '12M', '18M', '24M'],
    specs: [
      '100% combed ringspun cotton',
      'Three-snap closure at the bottom for quick changes',
      'Lap-shoulder neckline that slides on easily',
      'Printed with baby-safe water-based inks',
    ],
  },
  'dad-hat': {
    label: 'Dad Hat',
    plural: 'Dad Hats',
    blank: 'Yupoong 6245CM low-profile cap',
    printful: { model: '6245CM' },
    placement: 'embroidery_front',
    technique: 'embroidery',
    price: 28,
    sizes: ['One size'],
    specs: [
      '100% chino cotton twill',
      'Unstructured, six-panel, low-profile crown',
      'Adjustable strap with antique buckle',
      'Flat embroidery on the front panel',
    ],
  },
  beanie: {
    label: 'Beanie',
    plural: 'Beanies',
    blank: 'Cuffed knit beanie',
    printful: { titleIncludes: ['Cuffed Beanie'] },
    placement: 'embroidery_front',
    technique: 'embroidery',
    price: 26,
    sizes: ['One size'],
    specs: [
      '100% hypoallergenic acrylic knit',
      'Cuffed, snug fit that stretches to most head sizes',
      'Flat embroidery on the cuff',
      'Hand wash cold',
    ],
  },
  'aop-sweatshirt': {
    label: 'All-Over Print Sweatshirt',
    plural: 'All-Over Print Sweatshirts',
    blank: 'All-over print recycled unisex sweatshirt',
    printful: { titleIncludes: ['All-Over Print', 'Recycled', 'Sweatshirt'] },
    placement: 'aop',
    technique: 'sublimation',
    price: 62,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    specs: [
      '70% recycled polyester, 27% polyester, 3% elastane',
      'Brushed fleece inside, smooth face for a crisp all-over print',
      'Each piece is printed, cut and sewn to order',
      'Relaxed unisex fit',
    ],
  },
  'aop-bomber': {
    label: 'Bomber Jacket',
    plural: 'Bomber Jackets',
    blank: 'All-over print unisex bomber jacket',
    printful: { titleIncludes: ['All-Over Print', 'Bomber'] },
    placement: 'aop',
    technique: 'sublimation',
    price: 84,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    specs: [
      '100% polyester shell with a soft brushed lining',
      'Ribbed collar, cuffs and hem, metal zipper',
      'Two front pockets and a sleeve pocket',
      'Each piece is printed, cut and sewn to order',
    ],
  },
};

// Garment colors. `dark` decides whether a design prints in its light or dark ink set.
export const COLORS = {
  Black: { hex: '#1b1c20', dark: true },
  White: { hex: '#f7f7f5', dark: false },
  Navy: { hex: '#232a42', dark: true },
  'Athletic Heather': { hex: '#b7b9bc', dark: false },
  'Sport Grey': { hex: '#a9abae', dark: false },
  Mustard: { hex: '#d9a63a', dark: false },
  Khaki: { hex: '#b9a77f', dark: false },
  Stone: { hex: '#d6cfc0', dark: false },
  Print: { hex: '#2340c8', dark: true },
};

export const COLLECTIONS = [
  {
    slug: 'old-school-hip-hop-shirts',
    title: 'Old School Hip Hop T-Shirts',
    short: 'T-shirts',
    garments: ['tee'],
    metaTitle: 'Old School Hip Hop T-Shirts – 80s & 90s Rap Tees',
    metaDescription:
      'Original old school hip hop t-shirts: cassette tapes, boomboxes, crate digging and block party graphics. Soft Bella+Canvas tees, printed on demand.',
    intro: [
      'These are tees for people who still know where their tape deck is. Every graphic here is drawn in-house around the objects and rituals of the golden era: the cassette you paused at exactly the right moment, the crate you dug through for one clean break, the block party flyer taped to a lamppost.',
      'All shirts are printed on the Bella+Canvas 3001, a soft, side-seamed cotton tee with a fit that works tucked, layered or thrown on with wide-leg denim. Each one is printed when you order it, which means less waste and no dusty warehouse stock.',
    ],
    faq: [
      ['How do the shirts fit?', 'The Bella+Canvas 3001 is a unisex retail fit that runs true to size. For a boxier 90s look, size up one.'],
      ['How long does printing and shipping take?', 'Printing takes 2–5 business days. Standard shipping adds 3–7 business days in the US and 5–14 business days to most other countries.'],
      ['Will the print crack or fade?', 'The designs are printed with water-based inks that bond with the cotton. Wash inside out on cold and skip the dryer to keep them sharp for years.'],
    ],
  },
  {
    slug: '90s-hip-hop-hoodies-sweatshirts',
    title: '90s Hip Hop Hoodies & Sweatshirts',
    short: 'Hoodies & sweatshirts',
    garments: ['sweatshirt', 'hoodie', 'aop-sweatshirt', 'aop-bomber'],
    metaTitle: '90s Hip Hop Hoodies, Sweatshirts & Retro Sweaters',
    metaDescription:
      'Heavyweight hoodies, crewnecks and colorful all-over print 90s sweaters with original old school hip hop artwork. Printed on demand, shipped worldwide.',
    intro: [
      'Cold-weather layers built for the cypher, the record store and the walk home after. The crewnecks and hoodies use Gildan heavy blend fleece cut generously, so they drape the way 90s sweats did.',
      'For something louder, the all-over print sweatshirt and bomber jacket carry our retro patchwork pattern: a dense mix of speakers, tapes and geometric shapes in bold party colors. It is drawn from scratch by us, and each piece is printed, cut and sewn when you order.',
    ],
    faq: [
      ['Should I size up?', 'For an oversized 90s fit, yes. Go one size up in hoodies and crewnecks. The all-over print pieces run closer to a standard fit.'],
      ['Is the patchwork pattern a copy of a famous sweater brand?', 'No. The pattern is our own original artwork, printed flat on recycled polyester. It is inspired by the colorful party knits of the era in spirit only.'],
      ['How do I wash a printed sweatshirt?', 'Machine wash cold, inside out, with similar colors. Tumble dry low or hang dry. Do not iron directly on the print.'],
    ],
  },
  {
    slug: 'hip-hop-hats-beanies',
    title: 'Hip Hop Hats & Beanies',
    short: 'Hats & beanies',
    garments: ['dad-hat', 'beanie'],
    metaTitle: 'Old School Hip Hop Hats & Beanies – Embroidered',
    metaDescription:
      'Embroidered dad hats and cuffed beanies with old school hip hop lettering. Low-profile cotton caps and warm knit beanies, made to order.',
    intro: [
      'Quiet pieces with a loud history. Our hats keep it to clean embroidered lettering on the front panel, the kind of detail that gets a nod from the people who know.',
      'The dad hats are unstructured cotton twill with an adjustable strap. The beanies are a snug cuffed knit, embroidered on the fold.',
    ],
    faq: [
      ['Are the hats adjustable?', 'Yes. The dad hats have an adjustable strap with an antique metal buckle and fit most adult heads.'],
      ['Is the design printed or embroidered?', 'Embroidered. Every hat and beanie is stitched to order with flat embroidery.'],
    ],
  },
  {
    slug: 'hip-hop-baby-kids-clothes',
    title: 'Hip Hop Baby & Kids Clothes',
    short: 'Baby & kids',
    garments: ['onesie', 'kids-tee'],
    metaTitle: 'Hip Hop Baby Clothes & Kids Tees – Onesies for Little Rap Fans',
    metaDescription:
      'Hip hop baby onesies and kids t-shirts with original old school designs. Soft cotton, baby-safe inks, a perfect baby shower or first birthday gift.',
    intro: [
      'For the youngest heads in the family. These baby onesies and kids tees carry gentle, playful takes on the culture: drum pads, mixtapes and future breakers, all drawn in-house.',
      'They are soft ringspun cotton printed with water-based inks, and they make the go-to gift for a hip hop themed baby shower or first birthday party.',
    ],
    faq: [
      ['Are the inks safe for babies?', 'Yes. Everything is printed with water-based inks on 100% cotton blanks, which are gentle on sensitive skin.'],
      ['What sizes are available?', 'Onesies come in 6, 12, 18 and 24 months. Kids tees come in youth S (6–8) to XL (14–16).'],
      ['Can I order matching outfits for parents?', 'Yes. Most baby designs have an adult tee in the same style. Check the related products on each page.'],
    ],
  },
];

// Extra tag-based collection (not tied to garments).
export const GIFT_COLLECTION = {
  slug: 'hip-hop-gifts',
  title: 'Hip Hop Gifts',
  short: 'Gifts',
  metaTitle: 'Hip Hop Gifts for Him, Her, Dads & Rap Fans',
  metaDescription:
    'Gift ideas for old school hip hop fans: cassette, boombox and crate digger tees, embroidered dad hats and baby onesies. Original designs, printed on demand.',
  intro: [
    'Shopping for someone who still talks about the tape that changed their life? This is the short list: our best-loved designs for parents, producers, DJs, dancers and anyone raised on the golden era.',
    'Every piece is printed to order and ships worldwide. For birthdays and holidays, order at least two weeks ahead to allow for printing and delivery.',
  ],
  faq: [
    ['What is a good gift for a hip hop dad?', 'The Pause Tape Producer tee, the Crate Digger hoodie and the embroidered Boom Bap dad hat are our most-gifted pieces for dads.'],
    ['Do you offer gift wrapping?', 'Orders ship directly from the print facility in plain packaging without prices, so you can send them straight to the recipient.'],
  ],
};

// Original designs.
// kind: 'print' (DTG front print), 'embroidery' (hats), 'aop' (all-over pattern)
export const DESIGNS = [
  {
    slug: 'press-play',
    name: 'Press Play',
    noun: 'Cassette Tape',
    kind: 'print',
    gift: true,
    keywords: ['cassette tape shirt', 'mixtape t-shirt', '90s hip hop shirt', 'retro cassette tee'],
    story: [
      'Before playlists, there was the tape: ninety minutes of chrome, a label written in ballpoint, and the click of the play button that meant the night had started. Press Play is our tribute to the cassette as the original sharing format of hip hop, the thing you dubbed, passed on and wore out.',
      'The illustration is a straight-on cassette drawn in bold flat color, with a striped label, two reels and the side marker everyone remembers. It reads from across the room and still rewards a closer look.',
    ],
    products: [
      { garment: 'tee', colors: ['Black', 'Navy', 'White'] },
      { garment: 'sweatshirt', colors: ['Black', 'Navy'] },
    ],
  },
  {
    slug: 'pause-tape-producer',
    name: 'Pause Tape Producer',
    noun: 'Beatmaker',
    kind: 'print',
    gift: true,
    keywords: ['producer shirt', 'beatmaker t-shirt', 'hip hop producer gift', 'old school beat maker tee'],
    story: [
      'Every producer of a certain age started the same way: two tape decks, one break, and a finger hovering over the pause button to loop it by hand. It was clumsy, it was slow, and it taught a generation how to hear a beat inside someone else’s record.',
      'This design stacks the words in tall condensed type over a row of transport buttons. It is a badge for anyone who learned to make music with whatever was in the house.',
    ],
    products: [
      { garment: 'tee', colors: ['Black', 'White', 'Athletic Heather'] },
      { garment: 'hoodie', colors: ['Black'] },
    ],
  },
  {
    slug: 'crate-digger',
    name: 'Crate Digger',
    noun: 'Vinyl Record',
    kind: 'print',
    gift: true,
    keywords: ['crate digger shirt', 'vinyl record hoodie', 'record collector gift', 'dj shirt'],
    story: [
      'Crate digging is patience turned into a sport: Saturday mornings in basements and thrift stores, flipping past a hundred records to find the one with four clean bars of drums. The best DJs and producers built their sound this way, one dusty sleeve at a time.',
      'Our Crate Digger graphic shows a milk crate packed with sleeves, with a hand-lettered line underneath about the gold hiding in the grooves. Made for collectors, DJs and anyone who still smells a record before buying it.',
    ],
    products: [
      { garment: 'tee', colors: ['Black', 'Navy'] },
      { garment: 'hoodie', colors: ['Black', 'Sport Grey'] },
    ],
  },
  {
    slug: 'block-party-1973',
    name: 'Block Party 1973',
    noun: 'Flyer',
    kind: 'print',
    gift: false,
    keywords: ['hip hop birthday shirt', 'block party shirt', '1973 hip hop tee', '50 years of hip hop shirt'],
    story: [
      'Hip hop started as a party: a summer night in 1973, a rec room in the Bronx, a DJ stretching the breaks so the dancers could go longer. The flyers for those early jams were drawn by hand and photocopied until the letters bled, and they are some of the best graphic design of the century.',
      'This shirt is drawn as one of those flyers, with a halftone sun, chunky lettering and the instruction every good party needs: bring your own speakers. It is an original tribute to the culture’s birthday, not a reproduction of any real flyer.',
    ],
    products: [
      { garment: 'tee', colors: ['White', 'Athletic Heather', 'Black'] },
      { garment: 'sweatshirt', colors: ['Sport Grey', 'White'] },
    ],
  },
  {
    slug: 'fluent-in-boom-bap',
    name: 'Fluent in Boom Bap',
    noun: 'Boom Bap',
    kind: 'print',
    gift: true,
    keywords: ['boom bap shirt', 'boom bap t-shirt', '90s rap tee', 'hip hop head shirt'],
    story: [
      'Boom bap is the sound of the kick and the snare: a hard, sample-driven drum pattern that defined East Coast rap in the late 80s and 90s. If you can name the drum break inside four bars, you speak the language.',
      'Big wide letters, a waveform underneath and nothing else. It is a simple shirt for people who never stopped nodding their head to that tempo.',
    ],
    products: [
      { garment: 'tee', colors: ['Black', 'White', 'Navy'] },
      { garment: 'sweatshirt', colors: ['Black'] },
    ],
  },
  {
    slug: 'turn-it-up',
    name: 'Turn It Up',
    noun: 'Boombox',
    kind: 'print',
    gift: true,
    keywords: ['boombox shirt', 'boombox hoodie', '80s hip hop shirt', 'retro boombox tee'],
    story: [
      'The boombox put hip hop on the street. Two speakers, a tape deck and a handle meant the music could follow the crew to the park, the train platform and the corner where the dancers set up their cardboard.',
      'Our boombox is drawn from geometric shapes in our cobalt, yellow and red palette, with the two big speaker cones front and center. The type underneath says exactly what you were told not to do.',
    ],
    products: [
      { garment: 'tee', colors: ['White', 'Black'] },
      { garment: 'hoodie', colors: ['Navy', 'Black'] },
    ],
  },
  {
    slug: 'spray-can-society',
    name: 'Spray Can Society',
    noun: 'Graffiti',
    kind: 'print',
    gift: false,
    keywords: ['graffiti shirt', 'spray can t-shirt', 'graffiti hoodie', 'street art shirt'],
    story: [
      'Graffiti is the visual branch of hip hop, and the spray can is its instrument. Writers spent years learning can control, caps and color to turn train cars and walls into moving galleries.',
      'This design shows a single can with a few honest drips and bold lettering, drawn to feel like a sticker slapped on a sketchbook cover. It is a nod to every writer who carried a blackbook.',
    ],
    products: [
      { garment: 'tee', colors: ['Black', 'White'] },
      { garment: 'hoodie', colors: ['Black'] },
    ],
  },
  {
    slug: 'mic-check',
    name: 'Mic Check',
    noun: 'Microphone',
    kind: 'print',
    gift: false,
    keywords: ['microphone shirt', 'mc t-shirt', 'rapper shirt', 'open mic tee'],
    story: [
      'Two words before every verse, every open mic and every soundcheck. The MC is the voice of the culture, and the mic check is the moment before the room goes quiet.',
      'A vintage studio microphone in bold flat color, with the classic call stacked underneath. Good for MCs, poets, hosts and anyone who has ever stepped up to a mic and tapped it twice.',
    ],
    products: [{ garment: 'tee', colors: ['Black', 'White'] }],
  },
  {
    slug: 'golden-era-certified',
    name: 'Golden Era Certified',
    noun: 'Golden Era',
    kind: 'print',
    gift: true,
    keywords: ['golden age hip hop shirt', 'golden era rap tee', '80s 90s hip hop shirt', 'old school rap fan gift'],
    story: [
      'Most fans place the golden age of hip hop somewhere between the mid 80s and mid 90s, when sampling was wide open, every crew sounded different and a single summer could produce a dozen classic albums.',
      'Golden Era Certified is drawn as a seal of approval: a round badge with a star and the years around the edge. Wear it if you were there, or if you have done the homework.',
    ],
    products: [
      { garment: 'tee', colors: ['Black', 'Navy'] },
      { garment: 'sweatshirt', colors: ['Black'] },
    ],
  },
  {
    slug: 'enter-the-cypher',
    name: 'Enter the Cypher',
    noun: 'Cypher',
    kind: 'print',
    gift: false,
    keywords: ['breakdance shirt', 'b-boy t-shirt', 'cypher shirt', 'freestyle tee'],
    story: [
      'A cypher is a circle: dancers taking turns in the middle, or MCs passing a freestyle around the ring. Nobody owns the center for long, and everybody pushes everybody to go harder.',
      'The design is a ring of footprints around bold central type, drawn as if you were looking straight down on the circle. It works for breakers, freestylers and anyone who has felt the energy of a good circle.',
    ],
    products: [{ garment: 'tee', colors: ['Black', 'White'] }],
  },
  {
    slug: 'rewind-that',
    name: 'Rewind That',
    noun: 'Rewind',
    kind: 'print',
    gift: false,
    keywords: ['rewind shirt', 'dj rewind tee', 'sound system shirt', 'retro tape deck shirt'],
    story: [
      'When a verse or a drop hits hard enough, the crowd demands it again, and the DJ pulls it back to the top. The rewind is the highest compliment a room can give.',
      'Rewind That puts the words on a pixel display above two big rewind arrows, like the readout on a tape deck. A small graphic for a big moment.',
    ],
    products: [{ garment: 'tee', colors: ['Black', 'Navy'] }],
  },
  {
    slug: 'tiny-beatmaker',
    name: 'Tiny Beatmaker',
    noun: 'Drum Machine',
    kind: 'print',
    gift: true,
    kids: true,
    keywords: ['hip hop baby onesie', 'baby producer onesie', 'hip hop baby clothes', 'beat maker baby gift'],
    story: [
      'Some kids bang on pots and pans. Yours is building a drum pattern. Tiny Beatmaker is a grid of colorful drum-machine pads, the kind every producer taps out their first beat on.',
      'Playful, bright and easy to read, it makes a favorite baby shower gift for parents who make music, DJ or just keep the speakers on all day.',
    ],
    products: [
      { garment: 'onesie', colors: ['White', 'Black'] },
      { garment: 'kids-tee', colors: ['White', 'Black'] },
    ],
  },
  {
    slug: 'mixtape-baby',
    name: 'Mixtape Baby',
    noun: 'Mixtape',
    shortName: 'Mixtape',
    kind: 'print',
    gift: true,
    kids: true,
    keywords: ['mixtape baby onesie', 'cassette baby onesie', 'hip hop first birthday outfit', 'retro baby clothes'],
    story: [
      'Volume one of a long series. Mixtape Baby pairs a small cassette with a handwritten label, for the new arrival in a house where the music never stops.',
      'It is a gentle, sweet design that photographs well, which makes it a go-to for hip hop themed first birthday parties and newborn photos.',
    ],
    products: [
      { garment: 'onesie', colors: ['White', 'Black'] },
      { garment: 'kids-tee', colors: ['White'] },
    ],
  },
  {
    slug: 'future-breaker',
    name: 'Future Breaker',
    noun: 'Breakdance',
    kind: 'print',
    gift: true,
    kids: true,
    keywords: ['breakdance kids shirt', 'b-girl kids tee', 'b-boy baby onesie', 'kids hip hop dance shirt'],
    story: [
      'A breaker is a breakdancer, and the word fits every kid who spins on the living room floor. Future Breaker is bold lettering with a scatter of stars, sized for small bodies and big moves.',
      'It is a favorite for kids in dance classes, little siblings at battles and anyone raising the next generation of the culture.',
    ],
    products: [
      { garment: 'onesie', colors: ['White', 'Black'] },
      { garment: 'kids-tee', colors: ['Black', 'White'] },
    ],
  },
  {
    slug: 'boom-bap-embroidered',
    name: 'Boom Bap',
    noun: 'Embroidered',
    kind: 'embroidery',
    gift: true,
    keywords: ['boom bap hat', 'hip hop dad hat', 'embroidered rap hat', 'boom bap beanie'],
    story: [
      'Two words, stitched clean. Our Boom Bap embroidery keeps it minimal: wide, heavy lettering across the front, the way a good drum break keeps it simple and hits hard.',
      'It is the easiest piece in the shop to wear every day, and a solid gift for the hip hop head who already has every band tee they need.',
    ],
    products: [
      { garment: 'dad-hat', colors: ['Black', 'Navy', 'Khaki'] },
      { garment: 'beanie', colors: ['Black', 'Navy'] },
    ],
  },
  {
    slug: 'golden-era-embroidered',
    name: 'Golden Era',
    noun: 'Embroidered',
    kind: 'embroidery',
    gift: true,
    keywords: ['golden era hat', 'old school hip hop cap', '90s hip hop dad hat'],
    story: [
      'A quieter way to say where your taste was formed. Golden Era is stitched in tall condensed letters on a low-profile cotton cap.',
      'It looks right with a vintage windbreaker, a plain white tee or a hoodie from the same era.',
    ],
    products: [{ garment: 'dad-hat', colors: ['Black', 'Stone'] }],
  },
  {
    slug: 'retro-patchwork',
    name: 'Retro Patchwork',
    noun: '90s Party',
    kind: 'aop',
    gift: false,
    keywords: ['90s hip hop sweater', 'colorful retro sweatshirt', '90s party outfit', '90s hip hop costume', 'colorful bomber jacket', '80s rapper outfit'],
    story: [
      'Every 90s party had one: the loud, colorful sweater that announced you had arrived. Retro Patchwork is our own all-over pattern in that spirit, a dense quilt of speaker cones, tiny tapes, zigzags and triangles in teal, magenta, mustard, cobalt and orange.',
      'It is drawn from scratch by us and printed edge to edge, so no two seams line up quite the same. Made for 90s themed parties, festivals, a hip hop Halloween costume built from your own closet, and anyone who never wanted to blend in.',
    ],
    products: [
      { garment: 'aop-sweatshirt', colors: ['Print'] },
      { garment: 'aop-bomber', colors: ['Print'] },
    ],
  },
];

// Flattened products: one per design x garment.
export const PRODUCTS = DESIGNS.flatMap((d) =>
  d.products.map((p) => {
    const g = GARMENTS[p.garment];
    const slug = `${d.slug}-${p.garment}`;
    const addNoun =
      d.kind !== 'embroidery' && !d.name.toLowerCase().includes(d.noun.toLowerCase());
    // Avoid "Mixtape Baby Baby Onesie": use shortName when the label repeats the last word.
    const lastWord = d.name.split(' ').pop().toLowerCase();
    const name =
      d.shortName && g.label.toLowerCase().startsWith(lastWord) ? d.shortName : d.name;
    const title =
      d.kind === 'embroidery'
        ? `${name} Embroidered ${g.label}`
        : `${name}${addNoun ? ` ${d.noun}` : ''} ${g.label}`;
    return {
      slug,
      design: d.slug,
      garment: p.garment,
      title: title.replace(/\s+/g, ' ').trim(),
      price: g.price,
      colors: p.colors,
      sizes: g.sizes,
      kids: !!d.kids,
      gift: !!d.gift,
      image: (color) => `/mockups/${slug}--${colorSlug(color)}.webp`,
    };
  })
);

export function colorSlug(c) {
  return c.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export function getDesign(slug) {
  return DESIGNS.find((d) => d.slug === slug);
}

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsForCollection(slug) {
  if (slug === GIFT_COLLECTION.slug) return PRODUCTS.filter((p) => p.gift);
  const c = COLLECTIONS.find((c) => c.slug === slug);
  if (!c) return [];
  return PRODUCTS.filter((p) => c.garments.includes(p.garment));
}

export function collectionForProduct(p) {
  return COLLECTIONS.find((c) => c.garments.includes(p.garment));
}

// Print file URL for fulfillment. Embroidery and AOP use their own files.
export function printFile(designSlug, variant /* 'light' | 'dark' */) {
  return `/print/${designSlug}--${variant}.png`;
}
