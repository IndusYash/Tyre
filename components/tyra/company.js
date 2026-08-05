export const COMPANY = {
  name: 'Tyra Décor',
  tagline: 'Recycled. Refined. Remarkable.',
  phone: '+91 63079 94944',
  email: 'tyra.decor@gmail.com',
  instagram: 'tyra.decor',
  whatsapp: '916307994944',
  address: '128/18, Y-Block, Kidwai Nagar, Kanpur, U.P. – 208011, India',
  parent: 'A Brand by R.B. Tubes Pvt. Ltd.',
};

export const CATEGORY_META = {
  chairs: {
    slug: 'chairs',
    name: 'Chairs',
    displayName: 'The Chairs Collection',
    tagline: 'Sculptural Seating',
    heroTitle: 'Sit. Sink. Stay a while.',
    heroSub: 'Handwoven silhouettes engineered for a lifetime of use — our chairs anchor terraces, verandas and lounges with sculptural grace.',
    story: 'Every chair in the Tyra collection begins as a discarded tyre and ends as a sculpture. Our artisans hand-weave each seat and lattice frame in Kanpur, creating pieces that are as durable as they are beautiful — built for daily use, indoor or out.',
    heroImage: '/products/halo-armchair.jpg',
    accent: 'Handwoven Comfort',
  },
  tables: {
    slug: 'tables',
    name: 'Tables',
    displayName: 'The Tables Collection',
    tagline: 'Statement Centrepieces',
    heroTitle: 'The table sets the tone.',
    heroSub: 'From intimate side tables to expansive dining anchors — sculptural, weighted forms that hold their own in any interior.',
    story: 'Our tables are heat-resistant, weather-proof and finished to a high gloss. Each top is hand-woven and each base is weighted for the kind of stability that outlasts trends and seasons.',
    heroImage: '/products/hub-table.jpg',
    accent: 'Enduring Craft',
  },
  planters: {
    slug: 'planters',
    name: 'Planters',
    displayName: 'The Planters Collection',
    tagline: 'Anchoring Greenery',
    heroTitle: 'Grow beautifully.',
    heroSub: 'A range that scales from windowsill blooms to landscape trees — each planter reinforced, drainage-ready and built to last decades in the outdoors.',
    story: 'From the towering Estate to the palm-sized Bloom Pot, our planters give greenery a home that matches its ambition. Weather-proof, root-friendly and unmistakably industrial-luxe.',
    heroImage: '/products/estate-planter.jpg',
    accent: 'For Living Décor',
  },
  suites: {
    slug: 'suites',
    name: 'Suites',
    displayName: 'The Suites Collection',
    tagline: 'Complete Ensembles',
    heroTitle: 'Curated, out of the box.',
    heroSub: 'Signature configurations that pair our most-loved tables with chairs, stools and lounge seats — designed to work together.',
    story: 'Every suite is designed as a set: proportions, silhouettes and finishes calibrated so nothing needs to be second-guessed. Order once, live with it forever.',
    heroImage: '/products/suite-sovereign.jpg',
    accent: 'Complete Ensembles',
  },
  sculptures: {
    slug: 'sculptures',
    name: 'Sculptures',
    displayName: 'The Sculpture Atelier',
    tagline: 'Made on Demand',
    heroTitle: 'Monumental art, reborn.',
    heroSub: 'Life-size and larger-than-life sculptures — each one hand-woven from thousands of recycled tyre pieces by our master artisans. Statement art for landscapes, resorts, estates and hospitality spaces.',
    story: 'Every sculpture in this collection is a commission. From the first sketch to the final coat of paint, our artisans spend months layer-by-layer building forms that carry the presence of monumental art. Because they are made after your order, each piece is uniquely yours — with a lead time that reflects the craft it demands.',
    heroImage: '/products/sculptures/bumble-bee.jpg',
    accent: 'Commissioned Craft',
  },
};

export const whatsappLink = (p) => {
  const msg = p
    ? `Hi Tyra Décor, I'd like to know more about the ${p.name} (SKU: ${p.sku}). Please share more details.`
    : `Hi Tyra Décor, I'd like to know more about your catalogue.`;
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`;
};

export const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
