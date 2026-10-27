// Static info pages. Items in [square brackets] must be filled in by the store owner
// before launch (legal entity details are required for EU consumer law).

export const PAGES = {
  about: {
    title: 'About Rapoteque',
    description: 'Rapoteque makes original old school hip hop apparel, drawn in-house and printed on demand.',
    body: [
      { p: ['Rapoteque is a small, independent apparel label for people raised on the golden era of hip hop. We draw every design ourselves, around the objects and rituals of the culture: cassettes, boomboxes, crate digging, cyphers and block parties.'] },
      { h: 'Original work only', p: ['You will not find artists’ names, faces, album covers or lyrics on anything we sell. The culture belongs to everyone; the artists’ work and names belong to them. Our designs celebrate the shared history without borrowing anyone’s identity.'] },
      { h: 'Made when you order', p: ['Each piece is printed or embroidered on demand by our production partner and shipped directly to you. That means no unsold stock piling up, and a wider range of sizes and colors than a small label could ever keep on a shelf.'] },
    ],
  },
  shipping: {
    title: 'Shipping',
    description: 'Production and shipping times, costs and tracking for Rapoteque orders.',
    body: [
      { h: 'Production time', p: ['Every item is made to order. Printing or embroidery takes 2–5 business days, and all-over print pieces up to 7 business days.'] },
      { h: 'Delivery time', list: ['United States: 3–7 business days after production', 'Europe and UK: 4–10 business days', 'Canada, Australia, rest of world: 5–14 business days'] },
      { h: 'Cost', p: ['Standard shipping is a flat $6.99 per order. Orders of $75 or more ship free.'] },
      { h: 'Tracking', p: ['You will get an email with a tracking link as soon as your order leaves the production facility.'] },
      { h: 'Customs and duties', p: ['Orders are produced at the facility closest to you where possible. For some destinations, customs duties or import taxes may apply and are collected by the carrier.'] },
    ],
  },
  returns: {
    title: 'Returns & Exchanges',
    description: 'How returns, exchanges and refunds work at Rapoteque, including your 14-day right of withdrawal in the EU.',
    body: [
      { h: 'Damaged or wrong item', p: ['If your item arrives damaged, misprinted or is not what you ordered, email us within 30 days of delivery with your order number and a photo. We will send a replacement or a full refund at no cost to you.'] },
      { h: 'Changed your mind (EU and UK customers)', p: ['You have the right to withdraw from your purchase within 14 days of delivery without giving a reason. Email us to let us know, then return the unworn item within 14 days. We refund the price and original standard shipping within 14 days of receiving the return. Return shipping is paid by you.'] },
      { h: 'Exchanges for size', p: ['Because every item is made to order, we cannot swap sizes directly. Return the item under the withdrawal policy above and place a new order, or contact us and we will help.'] },
      { h: 'How to start a return', p: ['Email [hello@rapoteque.com] with your order number. We will reply with the return address.'] },
    ],
  },
  'size-guide': {
    title: 'Size Guide',
    description: 'Measurements for Rapoteque tees, sweatshirts, hoodies, kids tees and baby onesies.',
    body: [
      { p: ['Measurements are body width (armpit to armpit) and length (shoulder to hem) of the garment laid flat, in inches. For an oversized 90s fit, choose one size up.'] },
      {
        h: 'Unisex T-shirt (Bella+Canvas 3001)',
        table: [['Size', 'Width', 'Length'], ['S', '18', '28'], ['M', '20', '29'], ['L', '22', '30'], ['XL', '24', '31'], ['2XL', '26', '32'], ['3XL', '28', '33']],
      },
      {
        h: 'Crewneck sweatshirt (Gildan 18000)',
        table: [['Size', 'Width', 'Length'], ['S', '20', '27'], ['M', '22', '28'], ['L', '24', '29'], ['XL', '26', '30'], ['2XL', '28', '31'], ['3XL', '30', '32']],
      },
      {
        h: 'Hoodie (Gildan 18500)',
        table: [['Size', 'Width', 'Length'], ['S', '20', '27'], ['M', '22', '28'], ['L', '24', '29'], ['XL', '26', '30'], ['2XL', '28', '31'], ['3XL', '30', '32']],
      },
      {
        h: 'Kids T-shirt (Bella+Canvas 3001Y)',
        table: [['Size', 'Age', 'Width', 'Length'], ['S', '6–8', '16', '21'], ['M', '10–12', '17', '23'], ['L', '14', '18', '25'], ['XL', '14–16', '19', '27']],
      },
      {
        h: 'Baby onesie (Rabbit Skins 4400)',
        table: [['Size', 'Weight (lb)', 'Height (in)'], ['6M', '12–16', '24–27'], ['12M', '17–21', '28–30'], ['18M', '22–26', '31–32'], ['24M', '27–30', '33–34']],
      },
      { p: ['Measurements are approximate and can vary by up to an inch. Check the exact chart in the product description before ordering.'] },
    ],
  },
  contact: {
    title: 'Contact',
    description: 'Get in touch with Rapoteque about orders, returns or wholesale.',
    body: [
      { p: ['Questions about an order, sizing or a return? Email [hello@rapoteque.com] and include your order number. We reply within two business days.'] },
      { h: 'Business details', p: ['[Company name]', '[Street address]', '[Postal code, City, Poland]', '[Tax ID / NIP]'] },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How Rapoteque collects, uses and protects your personal data.',
    body: [
      { p: ['This policy explains what personal data we collect when you visit rapoteque.com or place an order, and how we use it. The data controller is [Company name, address, NIP]. Contact: [hello@rapoteque.com].'] },
      { h: 'What we collect', list: ['Order data: name, shipping address, email and phone number, needed to make and deliver your order.', 'Payment data is handled directly by Stripe. We never see or store your full card number.', 'Basic, cookie-free usage analytics to understand which pages are visited.'] },
      { h: 'Who we share it with', list: ['Stripe (payments)', 'Printful (production and shipping)', 'Carriers chosen by Printful (delivery)', 'Vercel (website hosting)'] },
      { h: 'Your cart', p: ['Your cart is stored in your own browser (localStorage) and is not sent to us until you check out.'] },
      { h: 'How long we keep it', p: ['Order records are kept for as long as tax law requires (currently 5 years in Poland). You can ask us to delete any other data at any time.'] },
      { h: 'Your rights', p: ['Under the GDPR you can access, correct, delete or export your data, object to processing, and complain to the Polish data protection authority (UODO).'] },
    ],
  },
  terms: {
    title: 'Terms of Sale',
    description: 'Terms and conditions for purchases from Rapoteque.',
    body: [
      { p: ['These terms apply to all orders placed on rapoteque.com, operated by [Company name, address, NIP].'] },
      { h: 'Orders', p: ['A contract is formed when we confirm your order by email. Because items are made to order, we may cancel an order and refund you in full if a product becomes unavailable.'] },
      { h: 'Prices and payment', p: ['Prices are shown in US dollars and include all charges except shipping, which is shown at checkout. Payment is taken by Stripe when you place your order.'] },
      { h: 'Delivery', p: ['See our Shipping page for production and delivery times.'] },
      { h: 'Withdrawal and returns', p: ['See our Returns page. Nothing in these terms limits your statutory rights as a consumer.'] },
      { h: 'Intellectual property', p: ['All designs, artwork and text on this site are original works owned by Rapoteque and may not be reproduced without permission.'] },
      { h: 'Governing law', p: ['These terms are governed by Polish law. Consumers keep the protection of the mandatory laws of their country of residence.'] },
    ],
  },
};
