'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowUpDown,
  Filter,
  ArrowLeft,
  ArrowUpRight,
  Sofa,
  Table as TableIcon,
  Flower2,
  LayoutGrid,
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
import { CATEGORY_META, COMPANY, inr } from '@/components/tyra/company';
import { Navbar, Footer, FloatingWhatsApp } from '@/components/tyra/chrome';
import { ProductCard } from '@/components/tyra/product-card';
import { ProductModal } from '@/components/tyra/product-modal';

const ALL_META = {
  slug: 'all',
  name: 'All Pieces',
  displayName: 'The Complete Catalogue',
  tagline: 'Every Handwoven Creation',
  heroTitle: 'Every piece, in one place.',
  heroSub: 'Browse the entire Tyra Décor collection — from sculptural chairs and statement planters to complete curated suites, each handwoven from recycled tyres.',
  story: 'From our smallest bloom pot to our flagship dining suites, every Tyra piece tells the same story: discarded material reborn as timeless décor. Take your time — there’s something in this range for every corner of your home.',
  heroImage: '/products/halo-armchair.jpg',
  accent: 'The Full Range',
};

const OTHER_CATS = [
  { slug: 'chairs', name: 'Chairs', icon: Sofa, image: '/products/halo-armchair.jpg' },
  { slug: 'tables', name: 'Tables', icon: TableIcon, image: '/products/hub-table.jpg' },
  { slug: 'planters', name: 'Planters', icon: Flower2, image: '/products/estate-planter.jpg' },
  { slug: 'suites', name: 'Suites', icon: LayoutGrid, image: '/products/suite-sovereign.jpg' },
  { slug: 'sculptures', name: 'Sculptures', icon: LayoutGrid, image: '/products/sculptures/bumble-bee.jpg' },
];

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug;

  const meta = slug === 'all' ? ALL_META : CATEGORY_META[slug];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [material, setMaterial] = useState('all');
  const [color, setColor] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 40000]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (!meta) return;
    (async () => {
      try {
        const url = slug === 'all' ? '/api/products' : `/api/products?category=${slug}`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, meta]);

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
  }, [products, material, color, priceRange, search, sort]);

  if (!meta) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="text-center">
            <h1 className="font-serif text-4xl text-charcoal mb-3">Not Found</h1>
            <p className="text-muted-warm mb-6">This category doesn&rsquo;t exist.</p>
            <Link href="/">
              <Button className="bg-charcoal text-white rounded-full uppercase tracking-widest text-xs">
                Back Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const otherCats = OTHER_CATS.filter((c) => c.slug !== slug);

  return (
    <main className="bg-cream text-charcoal min-h-screen">
      <Navbar activeSlug={slug} />

      {/* ============ HERO ============ */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 bg-cream texture-paper overflow-hidden">
        <div className="pointer-events-none absolute top-20 -right-20 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl" />
        <div className="container-tyra relative">
          {/* Breadcrumb */}
          <div className="mb-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-warm font-semibold">
            <Link href="/" className="hover:text-gold inline-flex items-center gap-2">
              <ArrowLeft size={12} /> Back
            </Link>
            <span className="text-gold">✦</span>
            <span>Collections</span>
            <span className="text-gold">✦</span>
            <span className="text-charcoal">{meta.name}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-gold" />
                <p className="text-[11px] tracking-[0.5em] uppercase text-gold font-semibold">
                  {meta.accent}
                </p>
              </div>
              <p className="text-[11px] tracking-[0.5em] uppercase text-muted-warm mb-2">
                {meta.displayName}
              </p>
              <h1 className="font-display text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5rem] leading-[0.98] text-charcoal font-medium tracking-tight mb-6">
                {meta.heroTitle.split(' ').map((w, i) => (
                  <span key={i}>
                    {i === 1 ? (
                      <span className="italic text-gold font-normal">{w}</span>
                    ) : (
                      w
                    )}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-muted-warm text-base md:text-lg leading-relaxed max-w-xl mb-8">
                {meta.heroSub}
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-muted-warm font-semibold">
                <span>Handwoven</span>
                <span className="text-gold">✦</span>
                <span>Weather-proof</span>
                <span className="text-gold">✦</span>
                <span>Made in Kanpur</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-cream-dark shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)] border border-champagne/20">
                <img
                  src={meta.heroImage}
                  alt={meta.name}
                  className="w-full h-full object-contain p-8"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-charcoal text-white px-6 py-4 rounded-2xl shadow-xl border border-champagne/20">
                <div className="text-[10px] uppercase tracking-[0.35em] text-champagne mb-1 font-semibold">
                  {meta.tagline}
                </div>
                <div className="font-serif text-lg">{meta.name}</div>
              </div>
            </motion.div>
          </div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 md:mt-20 max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gold/40" />
              <div className="text-gold text-lg">✦</div>
              <div className="h-px w-16 bg-gold/40" />
            </div>
            <p className="font-serif text-xl md:text-2xl italic text-charcoal leading-relaxed">
              {meta.story}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ FILTERS + PRODUCT GRID ============ */}
      <section className="py-16 md:py-20 bg-cream-light">
        <div className="container-tyra">
          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-warm"
              />
              <Input
                placeholder={`Search ${meta.name.toLowerCase()}…`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-12 rounded-full border-black/10 bg-white"
              />
            </div>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="md:w-56 h-12 rounded-full border-black/10 bg-white px-5">
                <div className="flex items-center gap-2">
                  <ArrowUpDown size={14} />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="default">Sort: Featured</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A → Z</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => setFiltersOpen((v) => !v)}
              variant="outline"
              className="h-12 px-6 rounded-full border-black/10 bg-white hover:border-charcoal hover:bg-charcoal hover:text-white uppercase text-xs tracking-widest font-semibold"
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
                <div className="bg-white border border-black/10 p-6 rounded-2xl grid md:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-xs uppercase tracking-widest text-muted-warm">
                      Material
                    </Label>
                    <Select value={material} onValueChange={setMaterial}>
                      <SelectTrigger className="mt-2 h-10 rounded-full border-black/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="all">All Materials</SelectItem>
                        {materials.map((m) => (
                          <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-widest text-muted-warm">
                      Colour
                    </Label>
                    <Select value={color} onValueChange={setColor}>
                      <SelectTrigger className="mt-2 h-10 rounded-full border-black/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="all">All Colours</SelectItem>
                        {colors.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
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

          <div className="text-xs text-muted-warm mb-8 uppercase tracking-widest">
            Showing{' '}
            <span className="text-charcoal font-semibold">{filtered.length}</span> of{' '}
            {products.length} pieces
          </div>

          {loading ? (
            <div className="py-32 text-center text-muted-warm uppercase tracking-widest text-sm">
              Loading collection…
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center text-muted-warm">
              No pieces match your filters. Try adjusting your search.
            </div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${slug === 'sculptures' ? 'lg:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto' : 'lg:grid-cols-3 xl:grid-cols-4 gap-6'}`}>
              {filtered.map((p) => (
                <ProductCard
                  key={p.id || p.sku}
                  product={p}
                  onOpen={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ EXPLORE OTHER CATEGORIES ============ */}
      <section className="py-20 bg-cream-dark">
        <div className="container-tyra">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gold/40" />
              <div className="text-gold text-lg">✦</div>
              <div className="h-px w-16 bg-gold/40" />
            </div>
            <p className="text-[11px] tracking-[0.5em] uppercase text-gold font-semibold mb-4">
              Continue Exploring
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-charcoal font-medium tracking-tight">
              Other <span className="italic text-gold">collections</span>.
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {otherCats.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="group relative overflow-hidden rounded-3xl bg-cream-light border border-black/5 hover:border-gold/40 transition-all hover-lift block"
              >
                <div className="relative aspect-square bg-cream-light overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold group-hover:text-white transition-all">
                    <c.icon size={15} />
                  </div>
                </div>
                <div className="p-5 bg-white flex items-center justify-between border-t border-black/5">
                  <div className="font-serif text-xl text-charcoal font-medium">
                    {c.name}
                  </div>
                  <div className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-charcoal group-hover:border-charcoal group-hover:text-white transition-all">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
