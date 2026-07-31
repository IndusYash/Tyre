'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Award,
  Truck,
  Sparkles,
  Users,
  ShieldCheck,
  IndianRupee,
  Wrench,
  Star,
  ArrowUpRight,
  ArrowRight,
  Filter,
  ArrowUpDown,
  Sofa,
  Table as TableIcon,
  Flower2,
  LayoutGrid,
  Phone,
  MessageCircle,
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
import { COMPANY, inr, whatsappLink } from '@/components/tyra/company';
import { Navbar, Footer, FloatingWhatsApp } from '@/components/tyra/chrome';
import { ProductCard } from '@/components/tyra/product-card';
import { ProductModal } from '@/components/tyra/product-modal';

// ---------- Shared UI ----------
function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container-tyra">{children}</div>
    </section>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <div className="h-px w-16 bg-gold/40" />
      <div className="text-gold text-lg">✦</div>
      <div className="h-px w-16 bg-gold/40" />
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="text-[11px] tracking-[0.5em] uppercase mb-5 font-semibold text-gold">
      {children}
    </p>
  );
}

function SectionHeading({ eyebrow, title, subtitle, center = true, useDisplay = false }) {
  return (
    <div className={`${center ? 'text-center max-w-3xl mx-auto' : ''} mb-14`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={`${useDisplay ? 'font-display' : 'font-serif'} text-4xl md:text-6xl leading-[1.05] text-charcoal font-medium tracking-tight`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 text-muted-warm text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ---------- Marquee ----------
function Marquee() {
  const items = [
    'Handwoven in Kanpur',
    '100% Recycled Tyres',
    'Weather-proof',
    'All-Season Craft',
    'Made in India',
    'Zero Maintenance',
    'Trusted by Designers',
    'Bulk Orders Welcome',
  ];
  return (
    <div className="bg-charcoal text-white/85 py-4 border-y border-white/10 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] px-6"
          >
            <span>{t}</span>
            <span className="text-champagne">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------- Hero ----------
function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] bg-cream flex items-center overflow-hidden texture-paper"
    >
      <div className="absolute left-6 top-24 md:left-12 md:top-32 h-24 md:h-32 w-px bg-gold/50" />
      <div className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl" />

      <div className="container-tyra pt-28 md:pt-36 pb-16 grid md:grid-cols-2 gap-8 md:gap-14 items-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-xl relative z-10"
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-10 bg-gold" />
            <p className="text-[11px] tracking-[0.5em] uppercase text-gold font-semibold">
              Est. 2025 · Kanpur, India
            </p>
          </div>
          <h1 className="font-display text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5rem] leading-[0.98] text-charcoal font-medium mb-6 md:mb-8 tracking-tight">
            Elevating spaces
            <br />
            with <span className="italic text-gold font-normal">timeless</span>
            <br />
            décor.
          </h1>
          <p className="text-muted-warm text-base md:text-lg max-w-lg leading-relaxed mb-8 md:mb-10">
            Premium furniture and planters, handwoven from recycled tyres by skilled
            artisans — designed to transform homes, hotels, offices and commercial
            interiors for a lifetime.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#categories">
              <Button className="bg-charcoal hover:bg-black text-white rounded-full px-9 h-12 uppercase text-[11px] tracking-[0.3em] font-semibold shadow-lg">
                Browse Collections
                <ArrowRight size={14} className="ml-2" />
              </Button>
            </a>
            <a href="#story">
              <Button
                variant="outline"
                className="bg-transparent border-charcoal/30 hover:bg-charcoal hover:text-white text-charcoal rounded-full px-9 h-12 uppercase text-[11px] tracking-[0.3em] font-semibold"
              >
                Our Story
              </Button>
            </a>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-widest text-muted-warm">
            <span>Handcrafted in India</span>
            <span className="text-gold">✦</span>
            <span>Weather-proof</span>
            <span className="text-gold">✦</span>
            <span>100% Recycled</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
          className="relative"
        >
          <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-[2rem] overflow-hidden bg-cream-dark shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)] border border-champagne/20">
            <img
              src="/products/halo-armchair.jpg"
              alt="Tyra Decor Halo Armchair"
              className="w-full h-full object-contain p-8"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-charcoal text-white px-6 py-4 md:px-8 md:py-5 rounded-2xl shadow-xl border border-champagne/20">
            <div className="text-[10px] uppercase tracking-[0.35em] text-champagne mb-1 font-semibold">
              ✦ Signature Piece
            </div>
            <div className="font-serif text-lg md:text-xl">The Halo Armchair</div>
          </div>
          <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-cream-light backdrop-blur px-5 py-3 rounded-full shadow-lg border border-champagne/30">
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
              Bestseller
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-warm hidden md:block">
        Scroll to explore
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
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-charcoal mb-6 font-medium tracking-tight">
            Where craft meets
            <br />
            <span className="italic text-gold">conscious</span> design.
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
            {[
              { n: '100%', l: 'Recycled Rubber' },
              { n: 'All Weather', l: 'Indoor & Outdoor' },
              { n: 'Kanpur', l: 'Made in India' },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif text-3xl md:text-4xl text-charcoal font-medium">
                  {s.n}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-warm mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] overflow-hidden bg-cream rounded-[2rem] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)] border border-champagne/20"
        >
          <img
            src="/products/cottage-chair.jpg"
            alt="Handwoven Tyra Decor detail"
            className="w-full h-full object-contain p-6"
          />
          <div className="absolute bottom-6 inset-x-6 bg-charcoal/95 text-white px-6 py-5 rounded-2xl border border-champagne/20">
            <div className="text-[10px] uppercase tracking-[0.35em] text-champagne mb-1 font-semibold">
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

// ---------- Categories ----------
const CAT_CARDS = [
  { slug: 'all', name: 'All Pieces', tagline: 'The complete collection', image: '/products/halo-armchair.jpg', icon: LayoutGrid, accent: 'The Full Range' },
  { slug: 'chairs', name: 'Chairs', tagline: 'Sculptural seating', image: '/products/halo-armchair.jpg', icon: Sofa, accent: 'Handwoven Comfort' },
  { slug: 'tables', name: 'Tables', tagline: 'Statement centrepieces', image: '/products/hub-table.jpg', icon: TableIcon, accent: 'Enduring Craft' },
  { slug: 'planters', name: 'Planters', tagline: 'Anchoring greenery', image: '/products/estate-planter.jpg', icon: Flower2, accent: 'For Living Décor' },
  { slug: 'suites', name: 'Suites', tagline: 'Curated sets', image: '/products/suite-sovereign.jpg', icon: LayoutGrid, accent: 'Complete Ensembles' },
];

function Categories({ counts }) {
  return (
    <Section id="categories" className="bg-cream texture-paper">
      <Ornament />
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Eyebrow>Shop by Category</Eyebrow>
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-charcoal font-medium tracking-tight">
          Discover our <span className="italic text-gold">signature</span>
          <br />
          collections.
        </h2>
        <p className="mt-6 text-muted-warm text-base md:text-lg leading-relaxed">
          Select a category to explore each handwoven piece — from sculptural chairs to
          statement planters, every collection carries the soul of our craft.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Big "All" card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="col-span-12 lg:col-span-6 lg:row-span-2"
        >
          <Link
            href="/category/all"
            className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1C1A17] to-[#2b2620] text-white text-left border border-champagne/30 flex flex-col h-full min-h-[400px] lg:min-h-[640px]"
          >
            <div className="absolute inset-0">
              <img
                src={CAT_CARDS[0].image}
                alt=""
                className="w-full h-full object-contain p-12 opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/95 via-charcoal/70 to-transparent" />
            </div>
            <div className="absolute top-6 right-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-champagne">
              <span>Est. 2025</span>
              <span>✦</span>
            </div>
            <div className="relative p-8 md:p-12 lg:p-16 mt-auto">
              <div className="w-14 h-14 rounded-full border border-champagne/50 flex items-center justify-center text-champagne mb-6 group-hover:bg-champagne group-hover:text-charcoal transition-colors">
                <LayoutGrid size={22} />
              </div>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-champagne font-semibold mb-3">
                The Full Range
              </p>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.02] mb-4">
                Explore <span className="italic">all pieces</span>
              </h3>
              <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed mb-8 max-w-md">
                Browse the entire Tyra Décor catalogue — every chair, table, planter and
                suite in one place.
              </p>
              <div className="inline-flex items-center gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-semibold text-champagne group-hover:text-white transition-colors">
                <span className="inline-flex items-center gap-1.5">
                  View Full Collection
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {CAT_CARDS.slice(1).map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i + 1) * 0.08 }}
            className="col-span-6 lg:col-span-3"
          >
            <Link
              href={`/category/${c.slug}`}
              className="group relative overflow-hidden rounded-[1.75rem] bg-cream-light border border-black/5 hover:border-gold/40 text-left transition-all hover-lift flex flex-col h-full"
            >
              <div className="relative aspect-square bg-cream-light overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gold shadow-sm border border-gold/20 group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all">
                  <c.icon size={17} />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream-light to-transparent pointer-events-none" />
              </div>
              <div className="p-5 md:p-6 bg-white flex items-center justify-between border-t border-black/5">
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-gold font-semibold mb-1">
                    {c.accent}
                  </p>
                  <div className="font-serif text-2xl text-charcoal font-medium truncate">
                    {c.name}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-warm mt-0.5 truncate italic">
                    {c.tagline}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center flex-shrink-0 ml-3 group-hover:bg-charcoal group-hover:border-charcoal group-hover:text-white transition-all">
                  <ArrowUpRight size={15} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-14 flex items-center justify-center gap-4">
        <div className="h-px w-12 bg-black/10" />
        <p className="text-[10px] uppercase tracking-[0.4em] text-muted-warm font-semibold">
          Handwoven · Weather-proof · Made in Kanpur
        </p>
        <div className="h-px w-12 bg-black/10" />
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
  { icon: Star, title: 'Trusted by Customers', desc: 'Loved by homes and businesses.' },
  { icon: Users, title: 'Bulk Order Support', desc: 'Volume pricing for B2B & projects.' },
  { icon: Wrench, title: 'Zero Maintenance', desc: 'Wipe clean. Built to endure.' },
];

function WhyChoose() {
  return (
    <Section id="why" className="bg-cream-light">
      <SectionHeading
        eyebrow="Why Tyra Décor"
        title={<>Built with intention.<br />Made to <span className="italic text-gold">last</span>.</>}
        subtitle="Every Tyra piece is engineered for endurance and finished for interiors that don't compromise — here's why designers, hoteliers and homeowners choose us."
        useDisplay
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {WHY_ITEMS.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="bg-white rounded-2xl p-6 md:p-7 border border-black/5 hover:border-gold/40 transition-all hover-lift group"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gold/10 text-gold mb-5 group-hover:bg-gold group-hover:text-white transition-colors">
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

// ---------- Featured (small) Catalogue ----------
function FeaturedCatalogue({ products, onOpen }) {
  const items = useMemo(() => {
    const f = products.filter((p) => p.featured);
    return (f.length ? f : products).slice(0, 8);
  }, [products]);

  return (
    <Section id="featured">
      <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
        <div className="max-w-2xl">
          <Eyebrow>Featured Pieces</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-charcoal font-medium tracking-tight">
            A taste of the <span className="italic text-gold">collection</span>.
          </h2>
        </div>
        <Link
          href="/category/all"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-semibold text-charcoal hover:text-gold"
        >
          View All Pieces
          <ArrowUpRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((p) => (
          <ProductCard key={p.id || p.sku} product={p} onOpen={onOpen} />
        ))}
      </div>
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
        title={<>Curated suites for <span className="italic text-gold">every</span> space.</>}
        subtitle="Signature configurations pairing our most-loved tables with chairs, stools and lounge seats — designed to work together, out of the box."
        useDisplay
      />
      <div className="grid md:grid-cols-3 gap-6">
        {pool.map((s, i) => (
          <motion.div
            key={s.sku}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Link
              href="/category/suites"
              className="relative group overflow-hidden aspect-[3/4] bg-cream-light rounded-3xl block border border-black/5 hover-lift"
            >
              <img
                src={s.image}
                alt={s.name}
                className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 text-white bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <p className="text-[10px] uppercase tracking-[0.35em] text-champagne mb-2 font-semibold">
                  Suite Collection
                </p>
                <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-2 font-medium">
                  {s.name}
                </h3>
                <p className="text-white/80 text-sm mb-3 italic">{s.tagline}</p>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/90 group-hover:text-white font-semibold">
                  View Collection
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </div>
              </div>
            </Link>
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
    text: "The Halo Armchair completely transformed my client's terrace. The craftsmanship is exceptional and the sustainability story is a huge draw.",
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
    <Section id="reviews" className="bg-charcoal-warm text-white">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-champagne/40" />
          <div className="text-champagne text-lg">✦</div>
          <div className="h-px w-16 bg-champagne/40" />
        </div>
        <p className="text-[11px] tracking-[0.4em] uppercase text-champagne mb-5 font-semibold">
          Testimonials
        </p>
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] font-medium tracking-tight">
          Loved by homes and
          <br />
          <span className="italic text-champagne">businesses</span> alike.
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
            className="border border-white/10 p-8 bg-white/[0.03] hover:bg-white/[0.06] rounded-3xl transition-colors"
          >
            <div className="flex gap-1 mb-4 text-champagne">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-white/90 leading-relaxed mb-6 font-serif text-xl italic">
              &ldquo;{t.text}&rdquo;
            </p>
            <footer>
              <div className="font-medium text-white">{t.name}</div>
              <div className="text-xs uppercase tracking-widest text-white/60 mt-1">
                {t.role}
              </div>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </Section>
  );
}

// ---------- CTA ----------
function CTABanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-tyra py-16 md:py-20">
        <div className="relative bg-gradient-to-br from-[#1C1A17] to-[#2b2620] rounded-[2.5rem] px-8 md:px-16 py-14 md:py-20 text-white overflow-hidden border border-champagne/20">
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-champagne/20 blur-3xl" />
          <div className="grid md:grid-cols-2 gap-8 items-center relative">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-champagne mb-5 font-semibold">
                Bulk Orders · Interior Projects
              </p>
              <h3 className="font-display text-3xl md:text-5xl leading-[1.05] font-medium tracking-tight">
                Furnishing a home,
                <br /> hotel or <span className="italic text-champagne">workspace</span>?
              </h3>
              <p className="mt-5 text-white/70 leading-relaxed max-w-lg">
                We work directly with designers, hoteliers and architects to deliver
                bespoke, weather-ready furniture at scale. Reach out for priority quotes.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <a href={whatsappLink(null)} target="_blank" rel="noreferrer">
                <Button className="bg-champagne hover:bg-[#c39e5f] text-charcoal rounded-full px-8 h-12 uppercase text-[11px] tracking-[0.3em] font-semibold shadow-lg">
                  <MessageCircle size={16} className="mr-2" />
                  Chat on WhatsApp
                </Button>
              </a>
              <a href={`tel:${COMPANY.phone1}`}>
                <Button
                  variant="outline"
                  className="bg-transparent border-white/30 hover:bg-white hover:text-charcoal text-white rounded-full px-8 h-12 uppercase text-[11px] tracking-[0.3em] font-semibold"
                >
                  <Phone size={14} className="mr-2" />
                  Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Main ----------
export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const counts = useMemo(() => {
    const c = { all: products.length };
    for (const p of products) c[p.category] = (c[p.category] || 0) + 1;
    return c;
  }, [products]);

  return (
    <main className="bg-cream text-charcoal">
      <Navbar />
      <Hero />
      <Marquee />
      <Story />
      <Categories counts={counts} />
      <WhyChoose />
      {loading ? (
        <div className="py-32 text-center text-muted-warm uppercase tracking-widest text-sm">
          Loading catalogue…
        </div>
      ) : (
        <>
          <FeaturedCatalogue products={products} onOpen={setSelectedProduct} />
          <Collections suites={suites} />
        </>
      )}
      <Testimonials />
      <CTABanner />
      <Footer />
      <FloatingWhatsApp />
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
