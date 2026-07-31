'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Instagram,
  MessageCircle,
  Leaf,
  Award,
  Truck,
  Sparkles,
  Users,
  ShieldCheck,
  IndianRupee,
  Wrench,
  Star,
  ArrowRight,
  ArrowUpRight,
  Filter,
  ArrowUpDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

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

// ---------- Section wrapper ----------
function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container-tyra">{children}</div>
    </section>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="text-[11px] tracking-[0.35em] uppercase text-gold mb-4 font-medium">
      {children}
    </p>
  );
}

function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`${center ? 'text-center max-w-3xl mx-auto' : ''} mb-14`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-serif text-3xl md:text-5xl leading-tight text-charcoal">
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
function Navbar({ onEnquireOpen }) {
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
    { href: '#prices', label: 'Prices' },
    { href: '#collections', label: 'Collections' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FAF7F2]/90 backdrop-blur-md border-b border-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container-tyra flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-serif text-xl md:text-2xl tracking-wide text-charcoal">
            Tyra <span className="text-gold">Décor</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-charcoal/80 hover:text-charcoal transition-colors tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button
            onClick={() => onEnquireOpen()}
            className="bg-charcoal hover:bg-black text-white rounded-none px-6 h-10 tracking-wider text-xs uppercase"
          >
            Enquire
          </Button>
        </div>
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
            className="md:hidden overflow-hidden bg-[#FAF7F2] border-b border-black/5"
          >
            <div className="container-tyra py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-charcoal/90 py-1"
                >
                  {l.label}
                </a>
              ))}
              <Button
                onClick={() => {
                  setOpen(false);
                  onEnquireOpen();
                }}
                className="bg-charcoal hover:bg-black text-white rounded-none uppercase tracking-wider text-xs"
              >
                Enquire
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ---------- Hero ----------
function Hero({ onEnquireOpen }) {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400"
          alt="Tyra Decor luxury handwoven interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>
      <div className="container-tyra pt-24 pb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-3xl text-white"
        >
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#E7C692] mb-6">
            Recycled &nbsp;•&nbsp; Refined &nbsp;•&nbsp; Remarkable
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-6">
            Elevating Spaces with
            <br />
            <span className="italic text-[#E7C692]">Timeless Décor</span>
          </h1>
          <p className="text-white/85 text-base md:text-xl max-w-2xl leading-relaxed mb-10">
            Premium décor crafted from recycled tyres by skilled artisans in Kanpur —
            handwoven furniture and planters designed to transform homes, hotels, offices
            and commercial interiors.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#catalogue">
              <Button className="bg-[#E7C692] hover:bg-[#d5b47f] text-charcoal rounded-none px-8 h-12 uppercase text-xs tracking-[0.25em]">
                Browse Catalogue
              </Button>
            </a>
            <Button
              onClick={() => onEnquireOpen()}
              variant="outline"
              className="bg-transparent border-white/60 hover:bg-white hover:text-charcoal text-white rounded-none px-8 h-12 uppercase text-xs tracking-[0.25em]"
            >
              Contact Us
            </Button>
          </div>
          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4 text-white/80 text-xs tracking-wide">
            <div>Handcrafted in Kanpur, India</div>
            <div className="hidden sm:block">•</div>
            <div>Zero-maintenance, weather-proof</div>
            <div className="hidden sm:block">•</div>
            <div>Made from 100% recycled tyres</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- Story ----------
function Story() {
  return (
    <Section id="story" className="bg-[#F3EEE5]">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Eyebrow>Our Story</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight text-charcoal mb-6">
            Where craft meets
            <br />
            conscious design.
          </h2>
          <p className="text-muted-warm leading-relaxed mb-5">
            Tyra Décor is born in the industrial heart of Kanpur — where discarded tyres,
            once destined for landfills, are reimagined into sculptural furniture and
            planters that anchor the most refined interiors and outdoor spaces.
          </p>
          <p className="text-muted-warm leading-relaxed mb-8">
            Every piece is cut, refined and hand-woven by skilled artisans who see
            possibility in what others discard. The result is a range that carries the
            strength of industry and the soul of craft — pieces built to endure a lifetime
            of weather, use and wonder.
          </p>
          <div className="grid grid-cols-3 gap-6 border-t border-black/10 pt-8">
            <div>
              <div className="font-serif text-3xl text-charcoal">100%</div>
              <div className="text-xs uppercase tracking-widest text-muted-warm mt-1">
                Recycled Rubber
              </div>
            </div>
            <div>
              <div className="font-serif text-3xl text-charcoal">All-Weather</div>
              <div className="text-xs uppercase tracking-widest text-muted-warm mt-1">
                Indoor & Outdoor
              </div>
            </div>
            <div>
              <div className="font-serif text-3xl text-charcoal">Kanpur</div>
              <div className="text-xs uppercase tracking-widest text-muted-warm mt-1">
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
          className="relative aspect-[4/5] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1657740037571-e0347224483f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
            alt="Handwoven Tyra Decor detail"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-[#FAF7F2] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">
              Our Craft
            </p>
            <p className="font-serif text-lg text-charcoal leading-snug">
              “Not everything that reaches the end of its journey is meant to be
              discarded.”
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
        subtitle="Every Tyra piece is engineered for endurance and finished for interiors that don’t compromise. Here’s why designers, hoteliers and homeowners choose us."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 border border-black/10">
        {WHY_ITEMS.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="bg-[#FAF7F2] p-6 md:p-8 group hover:bg-white transition-colors"
          >
            <div className="w-11 h-11 flex items-center justify-center border border-gold/60 text-gold mb-5 group-hover:bg-gold group-hover:text-white transition-colors">
              <it.icon size={20} />
            </div>
            <h3 className="font-serif text-lg text-charcoal">{it.title}</h3>
            <p className="text-sm text-muted-warm mt-2 leading-relaxed">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ---------- Product Card ----------
function ProductCard({ product, onEnquire }) {
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="group bg-white hover-lift flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F3EEE5]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {product.featured && (
          <Badge className="absolute top-3 left-3 bg-gold text-charcoal hover:bg-gold rounded-none text-[10px] tracking-widest uppercase font-medium">
            Featured
          </Badge>
        )}
        {discount > 0 && (
          <Badge className="absolute top-3 right-3 bg-charcoal text-white rounded-none text-[10px] tracking-widest uppercase">
            −{discount}%
          </Badge>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-[10px] uppercase tracking-widest text-gold mb-1">
          {product.category}
        </div>
        <h3 className="font-serif text-lg text-charcoal leading-snug">{product.name}</h3>
        <p className="text-xs text-muted-warm mt-1 mb-3 line-clamp-2">
          {product.tagline || product.description}
        </p>
        <ul className="text-[11px] text-muted-warm space-y-1 mb-4">
          <li><span className="text-charcoal/70">Dimensions:</span> {product.dimensions}</li>
          <li><span className="text-charcoal/70">Material:</span> {product.material}</li>
          <li><span className="text-charcoal/70">SKU:</span> {product.sku}</li>
        </ul>
        <div className="mt-auto flex items-end justify-between pt-3 border-t border-black/5">
          <div>
            <div className="font-serif text-2xl text-charcoal">{inr(product.price)}</div>
            {product.originalPrice > product.price && (
              <div className="text-xs text-muted-warm line-through">
                {inr(product.originalPrice)}
              </div>
            )}
            <div className="text-[10px] uppercase tracking-widest text-muted-warm mt-1">
              + GST
            </div>
          </div>
          <Button
            onClick={() => onEnquire(product)}
            className="bg-charcoal hover:bg-black text-white rounded-none uppercase text-[10px] tracking-[0.2em] h-10 px-4"
          >
            Enquire Now
            <ArrowRight size={14} className="ml-2" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

// ---------- Catalogue ----------
function Catalogue({ products, onEnquire }) {
  const [category, setCategory] = useState('all');
  const [material, setMaterial] = useState('all');
  const [color, setColor] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 30000]);
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
    items = items.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
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

      {/* Category tabs */}
      <div className="flex flex-wrap items-center justify-center gap-1 mb-8">
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCategory(c.slug)}
            className={`px-5 py-2 text-xs uppercase tracking-[0.2em] transition-colors border ${
              category === c.slug
                ? 'bg-charcoal text-white border-charcoal'
                : 'bg-transparent text-charcoal border-black/20 hover:border-charcoal'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Search + sort + filter toggle */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-warm" />
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
          className="h-11 rounded-none border-black/20 hover:border-charcoal hover:bg-charcoal hover:text-white uppercase text-xs tracking-widest"
        >
          <Filter size={14} className="mr-2" />
          Filters
        </Button>
      </div>

      {/* Filter panel */}
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
                <Label className="text-xs uppercase tracking-widest text-muted-warm">Material</Label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger className="mt-2 h-10 rounded-none border-black/15">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Materials</SelectItem>
                    {materials.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs uppercase tracking-widest text-muted-warm">Colour</Label>
                <Select value={color} onValueChange={setColor}>
                  <SelectTrigger className="mt-2 h-10 rounded-none border-black/15">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Colours</SelectItem>
                    {colors.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-widest text-muted-warm">Price Range</Label>
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

      <div className="text-xs text-muted-warm mb-6">
        Showing <span className="text-charcoal font-medium">{filtered.length}</span> of {products.length} products
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-muted-warm">
          No products match your filters. Try adjusting your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onEnquire={onEnquire} />
          ))}
        </div>
      )}
    </Section>
  );
}

// ---------- Price Catalogue ----------
function PriceCatalogue({ products }) {
  const [sortKey, setSortKey] = useState('name');
  const [dir, setDir] = useState('asc');
  const [category, setCategory] = useState('all');

  const rows = useMemo(() => {
    let items = [...products];
    if (category !== 'all') items = items.filter((p) => p.category === category);
    items.sort((a, b) => {
      let av = a[sortKey], bv = b[sortKey];
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      if (av < bv) return dir === 'asc' ? -1 : 1;
      if (av > bv) return dir === 'asc' ? 1 : -1;
      return 0;
    });
    return items;
  }, [products, sortKey, dir, category]);

  const setSort = (k) => {
    if (sortKey === k) setDir(dir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(k); setDir('asc'); }
  };

  return (
    <Section id="prices" className="bg-[#F3EEE5]">
      <SectionHeading
        eyebrow="Price Catalogue"
        title="Transparent, honest pricing."
        subtitle="All prices are exclusive of GST. Launch offers are for a limited time. Contact us for bulk quotes and dealer pricing."
      />
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'chairs', 'tables', 'planters', 'suites'].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 text-[11px] uppercase tracking-widest border ${
              category === c
                ? 'bg-charcoal text-white border-charcoal'
                : 'bg-transparent text-charcoal border-black/20 hover:border-charcoal'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="bg-white border border-black/10 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-charcoal hover:bg-charcoal">
                {[
                  { k: 'name', l: 'Product Name' },
                  { k: 'sku', l: 'Code' },
                  { k: 'dimensions', l: 'Size' },
                  { k: 'material', l: 'Material' },
                  { k: 'price', l: 'Price (₹)' },
                  { k: 'availability', l: 'Availability' },
                ].map((c) => (
                  <TableHead
                    key={c.k}
                    onClick={() => setSort(c.k)}
                    className="text-white/90 hover:text-white text-[11px] uppercase tracking-[0.2em] cursor-pointer select-none"
                  >
                    <span className="inline-flex items-center gap-1">
                      {c.l}
                      {sortKey === c.k && (
                        <span className="text-gold">{dir === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((p) => (
                <TableRow key={p.id} className="hover:bg-[#FAF7F2]">
                  <TableCell className="font-serif text-base text-charcoal">
                    {p.name}
                  </TableCell>
                  <TableCell className="text-xs text-muted-warm">{p.sku}</TableCell>
                  <TableCell className="text-xs text-muted-warm">{p.dimensions}</TableCell>
                  <TableCell className="text-xs text-muted-warm">{p.material}</TableCell>
                  <TableCell className="font-medium text-charcoal">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-lg">{inr(p.price)}</span>
                      {p.originalPrice > p.price && (
                        <span className="text-[11px] line-through text-muted-warm">
                          {inr(p.originalPrice)}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-2 text-xs">
                      <span className={`w-2 h-2 rounded-full ${p.availability === 'In Stock' ? 'bg-green-600' : 'bg-amber-500'}`} />
                      {p.availability}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <p className="text-xs text-muted-warm mt-4">
        * All prices exclusive of GST. Prices reflect our exclusive launch offers for a limited time.
      </p>
    </Section>
  );
}

// ---------- Collections ----------
function Collections({ suites, onEnquire }) {
  const highlight = suites.filter((s) => s.featured).slice(0, 3);
  const pool = highlight.length ? highlight : suites.slice(0, 3);

  return (
    <Section id="collections">
      <SectionHeading
        eyebrow="Featured Collections"
        title="Curated suites for every space."
        subtitle="Signature configurations pairing our most-loved tables with chairs, stools and lounge seats — designed to work together, out of the box."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {pool.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative group overflow-hidden aspect-[3/4] bg-charcoal"
          >
            <img
              src={s.image}
              alt={s.name}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-8 text-white">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#E7C692] mb-2">
                Suite Collection
              </p>
              <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-2">
                {s.name}
              </h3>
              <p className="text-white/80 text-sm mb-5">{s.tagline}</p>
              <button
                onClick={() => onEnquire(s)}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/90 hover:text-white group/link"
              >
                View Collection
                <ArrowUpRight size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
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
    text: 'The Halo Armchair completely transformed my client’s terrace. The craftsmanship is exceptional and the sustainability story is a huge draw.',
    rating: 5,
  },
  {
    name: 'The Ashwin Boutique Hotel',
    role: 'Hospitality, Goa',
    text: 'We ordered a bulk suite for our poolside lounge. Six months of monsoon later — they still look brand new. Truly weather-proof.',
    rating: 5,
  },
  {
    name: 'Rohan Mehta',
    role: 'Homeowner, Bengaluru',
    text: 'A conversation-starter every single time. Beautifully made and clearly built to last. Zero regrets.',
    rating: 5,
  },
];

function Testimonials() {
  return (
    <Section id="reviews" className="bg-charcoal text-white">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <p className="text-[11px] tracking-[0.35em] uppercase text-[#E7C692] mb-4">
          Testimonials
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight">
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
            <div className="flex gap-1 mb-4 text-[#E7C692]">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-white/90 leading-relaxed mb-6 font-serif text-lg">
              “{t.text}”
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

// ---------- Contact ----------
function Contact({ onEnquireOpen }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      toast.success('Enquiry sent — we’ll be in touch shortly.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact" className="bg-[#F3EEE5]">
      <SectionHeading
        eyebrow="Get in Touch"
        title="Talk to Tyra Décor."
        subtitle="Bulk orders, retail enquiries or interior projects — we’d love to help. Fill in the form or reach us directly."
      />
      <div className="grid md:grid-cols-2 gap-10">
        <form onSubmit={submit} className="bg-white p-8 border border-black/10">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-warm">Name</Label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 h-11 rounded-none border-black/15"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-warm">Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-2 h-11 rounded-none border-black/15"
              />
            </div>
          </div>
          <div className="mb-4">
            <Label className="text-xs uppercase tracking-widest text-muted-warm">Email</Label>
            <Input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 h-11 rounded-none border-black/15"
            />
          </div>
          <div className="mb-6">
            <Label className="text-xs uppercase tracking-widest text-muted-warm">Message</Label>
            <Textarea
              rows={5}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 rounded-none border-black/15"
              placeholder="Tell us about your project or the products you're interested in…"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-charcoal hover:bg-black text-white rounded-none uppercase tracking-[0.25em] text-xs h-12"
          >
            {loading ? 'Sending…' : 'Send Enquiry'}
          </Button>
        </form>
        <div className="space-y-6">
          <div className="bg-white p-6 border border-black/10 flex items-start gap-4">
            <Phone className="text-gold mt-1" size={20} />
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-warm">Phone / WhatsApp</div>
              <a href={`tel:${COMPANY.phone1}`} className="block mt-1 text-charcoal hover:text-gold">
                {COMPANY.phone1}
              </a>
              <a href={`tel:${COMPANY.phone2}`} className="block text-charcoal hover:text-gold">
                {COMPANY.phone2}
              </a>
            </div>
          </div>
          <div className="bg-white p-6 border border-black/10 flex items-start gap-4">
            <Mail className="text-gold mt-1" size={20} />
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-warm">Email</div>
              <a href={`mailto:${COMPANY.email}`} className="text-charcoal hover:text-gold">
                {COMPANY.email}
              </a>
            </div>
          </div>
          <div className="bg-white p-6 border border-black/10 flex items-start gap-4">
            <MapPin className="text-gold mt-1" size={20} />
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-warm">Registered Office</div>
              <div className="text-charcoal mt-1">{COMPANY.address}</div>
            </div>
          </div>
          <div className="bg-charcoal text-white p-6">
            <div className="text-xs uppercase tracking-widest text-[#E7C692]">WhatsApp Us</div>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-3 text-white hover:text-[#E7C692]"
            >
              <MessageCircle size={20} />
              Chat with us on WhatsApp
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="bg-white border border-black/10 h-56 overflow-hidden relative">
            <iframe
              src="https://www.google.com/maps?q=Kidwai%20Nagar%2C%20Kanpur%2C%20UP&z=14&output=embed"
              title="Tyra Decor location"
              className="w-full h-full grayscale"
              loading="lazy"
            />
          </div>
        </div>
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
          <div className="font-serif text-2xl text-white mb-3">
            Tyra <span className="text-[#E7C692]">Décor</span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            Recycled. Refined. Remarkable. Premium handwoven furniture &amp; planters,
            crafted from recycled tyres in Kanpur, India.
          </p>
          <p className="text-xs text-white/40 mt-4">{COMPANY.parent}</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-[#E7C692] mb-4">Quick Links</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#story" className="hover:text-white">Our Story</a></li>
            <li><a href="#why" className="hover:text-white">Why Tyra</a></li>
            <li><a href="#collections" className="hover:text-white">Collections</a></li>
            <li><a href="#reviews" className="hover:text-white">Testimonials</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-[#E7C692] mb-4">Catalogue</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#catalogue" className="hover:text-white">Chairs</a></li>
            <li><a href="#catalogue" className="hover:text-white">Tables</a></li>
            <li><a href="#catalogue" className="hover:text-white">Planters</a></li>
            <li><a href="#catalogue" className="hover:text-white">Suites</a></li>
            <li><a href="#prices" className="hover:text-white">Price List</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-[#E7C692] mb-4">Contact</div>
          <ul className="space-y-2 text-sm">
            <li><a href={`tel:${COMPANY.phone1}`} className="hover:text-white">{COMPANY.phone1}</a></li>
            <li><a href={`mailto:${COMPANY.email}`} className="hover:text-white">{COMPANY.email}</a></li>
            <li className="text-white/60">{COMPANY.address}</li>
          </ul>
          <div className="flex items-center gap-3 mt-5">
            <a
              href={`https://instagram.com/${COMPANY.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center border border-white/20 hover:bg-[#E7C692] hover:border-[#E7C692] hover:text-charcoal transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center border border-white/20 hover:bg-[#E7C692] hover:border-[#E7C692] hover:text-charcoal transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="w-9 h-9 flex items-center justify-center border border-white/20 hover:bg-[#E7C692] hover:border-[#E7C692] hover:text-charcoal transition-colors"
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
          <a href="/admin" className="hover:text-white">Admin</a>
          <span>Made with care in Kanpur, India</span>
        </div>
      </div>
    </footer>
  );
}

// ---------- Enquiry Modal ----------
function EnquiryDialog({ open, onOpenChange, product }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm((f) => ({
        ...f,
        message: `Hi Tyra Décor team, I'm interested in the ${product.name} (SKU: ${product.sku}). Please share more details.`,
      }));
    }
  }, [product]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          productSku: product?.sku,
          productName: product?.name,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      toast.success('Enquiry sent — we’ll be in touch shortly.');
      onOpenChange(false);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-none border-black/10">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {product ? `Enquire: ${product.name}` : 'Enquire Now'}
          </DialogTitle>
          <DialogDescription>
            Share your details and we’ll respond within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs uppercase tracking-widest">Name</Label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 rounded-none"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest">Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-2 rounded-none"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-widest">Email</Label>
            <Input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 rounded-none"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-widest">Message</Label>
            <Textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 rounded-none"
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-charcoal hover:bg-black text-white rounded-none uppercase tracking-widest text-xs h-11"
            >
              {loading ? 'Sending…' : 'Send Enquiry'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ---------- Floating WhatsApp ----------
function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${COMPANY.whatsapp}?text=Hi%20Tyra%20D%C3%A9cor%2C%20I%27d%20like%20to%20know%20more%20about%20your%20catalogue.`}
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
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [enquireProduct, setEnquireProduct] = useState(null);
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

  const openEnquire = (product = null) => {
    setEnquireProduct(product);
    setEnquireOpen(true);
  };

  const suites = useMemo(
    () => products.filter((p) => p.category === 'suites'),
    [products]
  );

  return (
    <main className="bg-cream text-charcoal">
      <Navbar onEnquireOpen={() => openEnquire()} />
      <Hero onEnquireOpen={() => openEnquire()} />
      <Story />
      <WhyChoose />

      {loading ? (
        <div className="py-32 text-center text-muted-warm">Loading catalogue…</div>
      ) : (
        <>
          <Catalogue products={products} onEnquire={openEnquire} />
          <PriceCatalogue products={products} />
          <Collections suites={suites} onEnquire={openEnquire} />
        </>
      )}

      <Testimonials />
      <Contact onEnquireOpen={() => openEnquire()} />
      <Footer />
      <FloatingWhatsApp />
      <EnquiryDialog
        open={enquireOpen}
        onOpenChange={setEnquireOpen}
        product={enquireProduct}
      />
    </main>
  );
}
