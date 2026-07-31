'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  MessageCircle,
  Award,
  Truck,
  Sparkles,
  Users,
  ShieldCheck,
  IndianRupee,
  Wrench,
  Star,
  ArrowUpRight,
  Filter,
  ArrowUpDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const COMPANY = {
  name: 'Tyra Décor',
  tagline: 'Recycled. Refined. Remarkable.',
  phone1: '+91 77040 07055',
  phone2: '+91 63079 94948',
  email: 'tyra.decor@gmail.com',
  instagram: 'tyra.decor',
  whatsapp: '917704007055',
  address: '128/18, Y-Block, Kidwai Nagar, Kanpur, U.P. – 208011, India',
  parent: 'A Brand by R.B. Tubes Pvt. Ltd.',
};

const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

const whatsappLinkForProduct = (p) => {
  const msg = p
    ? `Hi Tyra Décor, I'd like to know more about the ${p.name} (SKU: ${p.sku}). Please share more details.`
    : `Hi Tyra Décor, I'd like to know more about your catalogue.`;
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`;
};

// ---------- Section wrapper ----------
function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container-tyra">{children}</div>
    </section>
  );
}

function Eyebrow({ children, dark = false }) {
  return (
    <p
      className={`text-[11px] tracking-[0.4em] uppercase mb-5 font-semibold ${
        dark ? 'text-[#D6B075]' : 'text-gold'
      }`}
    >
      {children}
    </p>
  );
}

function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`${center ? 'text-center max-w-3xl mx-auto' : ''} mb-14`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] text-charcoal font-medium">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-muted-warm text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ---------- Navbar ----------
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#story', label: 'Story' },
    { href: '#catalogue', label: 'Catalogue' },
    { href: '#collections', label: 'Collections' },
    { href: '#reviews', label: 'Reviews' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md border-b border-black/5 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-tyra flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-serif text-2xl md:text-3xl tracking-wide text-charcoal font-semibold">
            Tyra <span className="text-gold italic">Décor</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-charcoal/80 hover:text-charcoal transition-colors tracking-widest uppercase font-medium"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={whatsappLinkForProduct(null)}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 text-[13px] tracking-widest uppercase text-charcoal hover:text-gold font-medium"
        >
          <Phone size={14} />
          {COMPANY.phone1}
        </a>
        <button
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-cream border-b border-black/5"
          >
            <div className="container-tyra py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-charcoal py-1 uppercase tracking-widest"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={`tel:${COMPANY.phone1}`}
                className="text-sm text-gold py-1 uppercase tracking-widest"
              >
                {COMPANY.phone1}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ---------- Hero ----------
function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] bg-cream flex items-center overflow-hidden"
    >
      {/* Decorative gold line */}
      <div className="absolute left-6 top-24 md:left-10 md:top-32 h-24 md:h-32 w-px bg-gold/40" />
      <div className="container-tyra pt-28 md:pt-32 pb-16 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-xl relative z-10"
        >
          <p className="text-[11px] tracking-[0.45em] uppercase text-gold mb-8 font-semibold">
            Recycled · Refined · Remarkable
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.02] text-charcoal font-medium mb-8">
            Elevating spaces
            <br />
            with <span className="italic text-gold">timeless</span>
            <br />
            décor.
          </h1>
          <p className="text-muted-warm text-base md:text-lg max-w-lg leading-relaxed mb-10">
            Premium furniture and planters, handwoven from recycled tyres by skilled
            artisans in Kanpur — designed to transform homes, hotels, offices and
            commercial interiors.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#catalogue">
              <Button className="bg-charcoal hover:bg-black text-white rounded-none px-9 h-12 uppercase text-[11px] tracking-[0.3em] font-semibold">
                Browse Catalogue
              </Button>
            </a>
            <a href="#story">
              <Button
                variant="outline"
                className="bg-transparent border-charcoal/40 hover:bg-charcoal hover:text-white text-charcoal rounded-none px-9 h-12 uppercase text-[11px] tracking-[0.3em] font-semibold"
              >
                Our Story
              </Button>
            </a>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-widest text-muted-warm">
            <div>Handcrafted in Kanpur</div>
            <div>· Weather-proof</div>
            <div>· 100% Recycled</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
          className="relative"
        >
          <div className="relative aspect-[4/5] md:aspect-[3/4] bg-cream-dark overflow-hidden">
            <img
              src="/products/halo-armchair.jpg"
              alt="Tyra Decor Halo Armchair"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-charcoal text-white px-6 py-4 md:px-8 md:py-5">
            <div className="text-[10px] uppercase tracking-[0.35em] text-[#D6B075] mb-1">
              Featured
            </div>
            <div className="font-serif text-lg md:text-xl">The Halo Armchair</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- Story ----------
function Story() {
  return (
    <Section id="story" className="bg-cream-dark">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Eyebrow>Our Story</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] text-charcoal mb-6 font-medium">
            Where craft meets
            <br />
            conscious design.
          </h2>
          <p className="text-muted-warm leading-relaxed mb-5 text-base md:text-lg">
            Tyra Décor is born in the industrial heart of Kanpur — where discarded tyres,
            once destined for landfills, are reimagined into sculptural furniture and
            planters that anchor the most refined interiors and outdoor spaces.
          </p>
          <p className="text-muted-warm leading-relaxed mb-8">
            Every piece is cut, refined and hand-woven by skilled artisans who see
            possibility in what others discard. The result is a range that carries the
            strength of industry and the soul of craft — built to endure a lifetime of
            weather, use and wonder.
          </p>
          <div className="grid grid-cols-3 gap-6 border-t border-black/10 pt-8">
            <div>
              <div className="font-serif text-3xl md:text-4xl text-charcoal font-medium">
                100%
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-warm mt-1">
                Recycled Rubber
              </div>
            </div>
            <div>
              <div className="font-serif text-3xl md:text-4xl text-charcoal font-medium">
                All Weather
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-warm mt-1">
                Indoor & Outdoor
              </div>
            </div>
            <div>
              <div className="font-serif text-3xl md:text-4xl text-charcoal font-medium">
                Kanpur
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-warm mt-1">
                Handmade in India
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] overflow-hidden bg-cream"
        >
          <img
            src="/products/cottage-chair.jpg"
            alt="Handwoven Tyra Decor detail"
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-0 inset-x-0 bg-charcoal text-white px-6 py-5">
            <div className="text-[10px] uppercase tracking-[0.35em] text-[#D6B075] mb-1">
              Our Craft
            </div>
            <p className="font-serif text-lg md:text-xl leading-snug italic">
              &ldquo;Not everything that reaches the end of its journey is meant to be
              discarded.&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ---------- Why Choose ----------
const WHY_ITEMS = [
  { icon: Award, title: 'Premium Quality', desc: 'Meticulous finishing on every piece.' },
  { icon: Sparkles, title: 'Modern Designs', desc: 'Industrial-luxe forms that lead trends.' },
  { icon: IndianRupee, title: 'Competitive Pricing', desc: 'Direct from workshop to your space.' },
  { icon: ShieldCheck, title: 'Durable Materials', desc: 'Weather-proof, UV & heat resistant.' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Pan-India logistics you can trust.' },
  { icon: Star, title: 'Trusted by Customers', desc: 'Loved by homes and businesses alike.' },
  { icon: Users, title: 'Bulk Order Support', desc: 'Volume pricing for B2B & projects.' },
  { icon: Wrench, title: 'Zero Maintenance', desc: 'Wipe clean. Built to endure.' },
];

function WhyChoose() {
  return (
    <Section id="why">
      <SectionHeading
        eyebrow="Why Tyra Décor"
        title="Built with intention. Made to last."
        subtitle="Every Tyra piece is engineered for endurance and finished for interiors that don't compromise. Here's why designers, hoteliers and homeowners choose us."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 border border-black/10">
        {WHY_ITEMS.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="bg-cream p-6 md:p-8 group hover:bg-cream-light transition-colors"
          >
            <div className="w-11 h-11 flex items-center justify-center border border-gold/60 text-gold mb-5 group-hover:bg-gold group-hover:text-white transition-colors">
              <it.icon size={20} />
            </div>
            <h3 className="font-serif text-xl text-charcoal font-medium">{it.title}</h3>
            <p className="text-sm text-muted-warm mt-2 leading-relaxed">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ---------- Product Card ----------
function ProductCard({ product }) {
  const discount =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="group bg-cream-light hover-lift flex flex-col border border-black/5"
    >
      <div className="relative aspect-square overflow-hidden bg-cream-light">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {product.featured && (
          <Badge className="absolute top-3 left-3 bg-gold text-white hover:bg-gold rounded-none text-[10px] tracking-widest uppercase font-medium">
            Featured
          </Badge>
        )}
        {discount > 0 && (
          <Badge className="absolute top-3 right-3 bg-charcoal text-white rounded-none text-[10px] tracking-widest uppercase">
            −{discount}%
          </Badge>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1 bg-white">
        <div className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1 font-semibold">
          {product.category}
        </div>
        <h3 className="font-serif text-xl text-charcoal leading-snug font-medium">
          {product.name}
        </h3>
        <p className="text-sm text-muted-warm mt-1 mb-3 line-clamp-2">
          {product.tagline || product.description}
        </p>
        <ul className="text-xs text-muted-warm space-y-1 mb-4">
          <li>
            <span className="text-charcoal/70 font-medium">Dimensions:</span>{' '}
            {product.dimensions}
          </li>
          <li>
            <span className="text-charcoal/70 font-medium">Material:</span>{' '}
            {product.material}
          </li>
          <li>
            <span className="text-charcoal/70 font-medium">SKU:</span> {product.sku}
          </li>
        </ul>
        <div className="mt-auto pt-3 border-t border-black/5 flex items-end justify-between">
          <div>
            <div className="font-serif text-2xl text-charcoal font-medium">
              {inr(product.price)}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-xs text-muted-warm line-through">
                {inr(product.originalPrice)}
              </div>
            )}
            <div className="text-[10px] uppercase tracking-widest text-muted-warm mt-1">
              + GST
            </div>
          </div>
          <span
            className={`text-[10px] uppercase tracking-widest inline-flex items-center gap-1.5 ${
              product.availability === 'In Stock' ? 'text-green-700' : 'text-amber-700'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                product.availability === 'In Stock' ? 'bg-green-600' : 'bg-amber-500'
              }`}
            />
            {product.availability}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ---------- Catalogue ----------
function Catalogue({ products }) {
  const [category, setCategory] = useState('all');
  const [material, setMaterial] = useState('all');
  const [color, setColor] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 40000]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const materials = useMemo(
    () => Array.from(new Set(products.map((p) => p.material))),
    [products]
  );
  const colors = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.colors || []))),
    [products]
  );

  const filtered = useMemo(() => {
    let items = [...products];
    if (category !== 'all') items = items.filter((p) => p.category === category);
    if (material !== 'all') items = items.filter((p) => p.material === material);
    if (color !== 'all') items = items.filter((p) => (p.colors || []).includes(color));
    items = items.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (search) {
      const s = search.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          p.sku.toLowerCase().includes(s) ||
          (p.tagline || '').toLowerCase().includes(s)
      );
    }
    if (sort === 'price_asc') items.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') items.sort((a, b) => b.price - a.price);
    else if (sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name));
    return items;
  }, [products, category, material, color, priceRange, search, sort]);

  const categories = [
    { slug: 'all', name: 'All' },
    { slug: 'chairs', name: 'Chairs' },
    { slug: 'tables', name: 'Tables' },
    { slug: 'planters', name: 'Planters' },
    { slug: 'suites', name: 'Suites' },
  ];

  return (
    <Section id="catalogue">
      <SectionHeading
        eyebrow="Product Catalogue"
        title="The Collection"
        subtitle="Explore our full range of chairs, tables, planters and complete suites — each piece handwoven and made to endure."
      />

      <div className="flex flex-wrap items-center justify-center gap-1 mb-8">
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCategory(c.slug)}
            className={`px-6 py-2.5 text-[11px] uppercase tracking-[0.25em] font-semibold transition-colors border ${
              category === c.slug
                ? 'bg-charcoal text-white border-charcoal'
                : 'bg-transparent text-charcoal border-black/20 hover:border-charcoal'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-warm"
          />
          <Input
            placeholder="Search by name, SKU, description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 rounded-none border-black/15 bg-white"
          />
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="md:w-56 h-11 rounded-none border-black/15 bg-white">
            <div className="flex items-center gap-2">
              <ArrowUpDown size={14} />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Sort: Featured</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="name">Name: A → Z</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => setFiltersOpen((v) => !v)}
          variant="outline"
          className="h-11 rounded-none border-black/20 hover:border-charcoal hover:bg-charcoal hover:text-white uppercase text-xs tracking-widest font-semibold"
        >
          <Filter size={14} className="mr-2" />
          Filters
        </Button>
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-white border border-black/10 p-6 grid md:grid-cols-3 gap-6">
              <div>
                <Label className="text-xs uppercase tracking-widest text-muted-warm">
                  Material
                </Label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger className="mt-2 h-10 rounded-none border-black/15">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Materials</SelectItem>
                    {materials.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs uppercase tracking-widest text-muted-warm">
                  Colour
                </Label>
                <Select value={color} onValueChange={setColor}>
                  <SelectTrigger className="mt-2 h-10 rounded-none border-black/15">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Colours</SelectItem>
                    {colors.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-widest text-muted-warm">
                    Price Range
                  </Label>
                  <span className="text-xs text-charcoal">
                    {inr(priceRange[0])} – {inr(priceRange[1])}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={40000}
                  step={500}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-4"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-xs text-muted-warm mb-6 uppercase tracking-widest">
        Showing{' '}
        <span className="text-charcoal font-semibold">{filtered.length}</span> of{' '}
        {products.length} products
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-muted-warm">
          No products match your filters. Try adjusting your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id || p.sku} product={p} />
          ))}
        </div>
      )}
    </Section>
  );
}

// ---------- Collections ----------
function Collections({ suites }) {
  const highlight = suites.filter((s) => s.featured).slice(0, 3);
  const pool = highlight.length ? highlight : suites.slice(0, 3);

  return (
    <Section id="collections" className="bg-cream-dark">
      <SectionHeading
        eyebrow="Featured Collections"
        title="Curated suites for every space."
        subtitle="Signature configurations pairing our most-loved tables with chairs, stools and lounge seats — designed to work together, out of the box."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {pool.map((s, i) => (
          <motion.a
            key={s.sku}
            href="#catalogue"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative group overflow-hidden aspect-[3/4] bg-charcoal block"
          >
            <img
              src={s.image}
              alt={s.name}
              className="absolute inset-0 w-full h-full object-contain p-6 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              style={{ backgroundColor: '#F6F1E7' }}
            />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white bg-gradient-to-t from-black/90 to-transparent">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#D6B075] mb-2 font-semibold">
                Suite Collection
              </p>
              <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-2 font-medium">
                {s.name}
              </h3>
              <p className="text-white/80 text-sm mb-3">{s.tagline}</p>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/90 group-hover:text-white font-semibold">
                View Collection
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

// ---------- Testimonials ----------
const TESTIMONIALS = [
  {
    name: 'Anaya Kapoor',
    role: 'Interior Designer, Mumbai',
    text:
      "The Halo Armchair completely transformed my client's terrace. The craftsmanship is exceptional and the sustainability story is a huge draw.",
    rating: 5,
  },
  {
    name: 'The Ashwin Boutique Hotel',
    role: 'Hospitality, Goa',
    text:
      'We ordered a bulk suite for our poolside lounge. Six months of monsoon later — they still look brand new. Truly weather-proof.',
    rating: 5,
  },
  {
    name: 'Rohan Mehta',
    role: 'Homeowner, Bengaluru',
    text:
      'A conversation-starter every single time. Beautifully made and clearly built to last. Zero regrets.',
    rating: 5,
  },
];

function Testimonials() {
  return (
    <Section id="reviews" className="bg-charcoal text-white">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <p className="text-[11px] tracking-[0.4em] uppercase text-[#D6B075] mb-5 font-semibold">
          Testimonials
        </p>
        <h2 className="font-serif text-4xl md:text-5xl leading-tight font-medium">
          Loved by homes and businesses alike.
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <motion.blockquote
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="border border-white/10 p-8 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
          >
            <div className="flex gap-1 mb-4 text-[#D6B075]">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-white/90 leading-relaxed mb-6 font-serif text-xl italic">
              &ldquo;{t.text}&rdquo;
            </p>
            <footer>
              <div className="font-medium text-white">{t.name}</div>
              <div className="text-xs uppercase tracking-widest text-white/60">
                {t.role}
              </div>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </Section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="bg-charcoal text-white/80 pt-16 pb-8">
      <div className="container-tyra grid md:grid-cols-4 gap-10">
        <div>
          <div className="font-serif text-3xl text-white mb-3 font-semibold">
            Tyra <span className="text-[#D6B075] italic">Décor</span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            Recycled. Refined. Remarkable. Premium handwoven furniture &amp; planters,
            crafted from recycled tyres in Kanpur, India.
          </p>
          <p className="text-xs text-white/40 mt-4">{COMPANY.parent}</p>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#D6B075] mb-4 font-semibold">
            Explore
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#story" className="hover:text-white">
                Our Story
              </a>
            </li>
            <li>
              <a href="#why" className="hover:text-white">
                Why Tyra
              </a>
            </li>
            <li>
              <a href="#catalogue" className="hover:text-white">
                Catalogue
              </a>
            </li>
            <li>
              <a href="#collections" className="hover:text-white">
                Collections
              </a>
            </li>
            <li>
              <a href="#reviews" className="hover:text-white">
                Testimonials
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#D6B075] mb-4 font-semibold">
            Catalogue
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#catalogue" className="hover:text-white">
                Chairs
              </a>
            </li>
            <li>
              <a href="#catalogue" className="hover:text-white">
                Tables
              </a>
            </li>
            <li>
              <a href="#catalogue" className="hover:text-white">
                Planters
              </a>
            </li>
            <li>
              <a href="#catalogue" className="hover:text-white">
                Suites
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#D6B075] mb-4 font-semibold">
            Contact
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`tel:${COMPANY.phone1}`} className="hover:text-white">
                {COMPANY.phone1}
              </a>
            </li>
            <li>
              <a href={`tel:${COMPANY.phone2}`} className="hover:text-white">
                {COMPANY.phone2}
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                {COMPANY.email}
              </a>
            </li>
            <li className="text-white/60 pt-1">{COMPANY.address}</li>
          </ul>
          <div className="flex items-center gap-3 mt-5">
            <a
              href={`https://instagram.com/${COMPANY.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center border border-white/20 hover:bg-[#D6B075] hover:border-[#D6B075] hover:text-charcoal transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center border border-white/20 hover:bg-[#D6B075] hover:border-[#D6B075] hover:text-charcoal transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="w-9 h-9 flex items-center justify-center border border-white/20 hover:bg-[#D6B075] hover:border-[#D6B075] hover:text-charcoal transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
      <div className="container-tyra mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
        <div>© {new Date().getFullYear()} Tyra Décor. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="/admin" className="hover:text-white">
            Admin
          </a>
          <span>Made with care in Kanpur, India</span>
        </div>
      </div>
    </footer>
  );
}

// ---------- Floating WhatsApp ----------
function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLinkForProduct(null)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5c] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-105"
      aria-label="WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}

// ---------- Main ----------
export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const suites = useMemo(
    () => products.filter((p) => p.category === 'suites'),
    [products]
  );

  return (
    <main className="bg-cream text-charcoal">
      <Navbar />
      <Hero />
      <Story />
      <WhyChoose />

      {loading ? (
        <div className="py-32 text-center text-muted-warm uppercase tracking-widest text-sm">
          Loading catalogue…
        </div>
      ) : (
        <>
          <Catalogue products={products} />
          <Collections suites={suites} />
        </>
      )}

      <Testimonials />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
