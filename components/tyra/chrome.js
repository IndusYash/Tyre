'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone, Mail, Instagram, MessageCircle } from 'lucide-react';
import { COMPANY, whatsappLink } from './company';

export function Navbar({ activeSlug = null, categoryLinks = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/#story', label: 'Story' },
    { href: '/category/chairs', label: 'Chairs', slug: 'chairs' },
    { href: '/category/tables', label: 'Tables', slug: 'tables' },
    { href: '/category/planters', label: 'Planters', slug: 'planters' },
    { href: '/category/suites', label: 'Suites', slug: 'suites' },
    { href: '/category/sculptures', label: 'Sculptures', slug: 'sculptures' },
    { href: '/#reviews', label: 'Reviews' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md border-b border-black/5 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.15)]'
          : 'bg-transparent'
      }`}
    >
      {/* Top brand strip */}
      <div className={`hidden md:flex items-center justify-center gap-4 py-2 text-[10px] uppercase tracking-[0.45em] transition-all ${scrolled ? 'hidden' : 'text-charcoal/70'}`}>
        <span>Recycled</span>
        <span className="text-gold">✦</span>
        <span>Refined</span>
        <span className="text-gold">✦</span>
        <span>Remarkable</span>
      </div>
      <div className="container-tyra flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl md:text-3xl tracking-wide text-charcoal font-semibold">
            Tyra <span className="text-gold italic">Décor</span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => {
            const active = l.slug && activeSlug === l.slug;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[11px] transition-colors tracking-[0.25em] uppercase font-semibold relative ${
                  active ? 'text-gold' : 'text-charcoal/80 hover:text-charcoal'
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>
        <a
          href={`tel:${COMPANY.phone}`}
          className="hidden md:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-charcoal hover:text-gold font-semibold"
        >
          <Phone size={13} />
          {COMPANY.phone}
        </a>
        <button
          className="lg:hidden p-2"
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
            className="lg:hidden overflow-hidden bg-cream border-b border-black/5"
          >
            <div className="container-tyra py-4 flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-charcoal py-1 uppercase tracking-widest"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={`tel:${COMPANY.phone}`}
                className="text-sm text-gold py-1 uppercase tracking-widest"
              >
                {COMPANY.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal-warm text-white/80 pt-20 pb-8">
      <div className="container-tyra">
        {/* Top signature strip */}
        <div className="flex items-center justify-center gap-4 mb-14 text-[10px] uppercase tracking-[0.4em] text-champagne">
          <div className="h-px flex-1 bg-white/10 max-w-[180px]" />
          <span>Handwoven in Kanpur</span>
          <span>✦</span>
          <span>Est. 2025</span>
          <div className="h-px flex-1 bg-white/10 max-w-[180px]" />
        </div>

        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="font-serif text-3xl text-white mb-3 font-semibold">
              Tyra <span className="text-champagne italic">Décor</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Recycled. Refined. Remarkable. Premium handwoven furniture &amp; planters,
              crafted from recycled tyres in Kanpur, India.
            </p>
            <p className="text-xs text-white/40 mt-4">{COMPANY.parent}</p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-champagne mb-4 font-semibold">
              Explore
            </div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#story" className="hover:text-white">Our Story</Link></li>
              <li><Link href="/#categories" className="hover:text-white">Categories</Link></li>
              <li><Link href="/#collections" className="hover:text-white">Collections</Link></li>
              <li><Link href="/#reviews" className="hover:text-white">Testimonials</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-champagne mb-4 font-semibold">
              Collections
            </div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/chairs" className="hover:text-white">Chairs</Link></li>
              <li><Link href="/category/tables" className="hover:text-white">Tables</Link></li>
              <li><Link href="/category/planters" className="hover:text-white">Planters</Link></li>
              <li><Link href="/category/suites" className="hover:text-white">Suites</Link></li>
              <li><Link href="/category/sculptures" className="hover:text-white">Sculptures</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-champagne mb-4 font-semibold">
              Contact
            </div>
            <ul className="space-y-2 text-sm">
              <li><a href={`tel:${COMPANY.phone}`} className="hover:text-white">{COMPANY.phone}</a></li>
              <li><a href={`mailto:${COMPANY.email}`} className="hover:text-white">{COMPANY.email}</a></li>
              <li className="text-white/60 pt-1">{COMPANY.address}</li>
            </ul>
            <div className="flex items-center gap-3 mt-5">
              <a
                href={`https://instagram.com/${COMPANY.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-champagne hover:border-champagne hover:text-charcoal transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={whatsappLink(null)}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-champagne hover:border-champagne hover:text-charcoal transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-champagne hover:border-champagne hover:text-charcoal transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Tyra Décor. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-white">Admin</Link>
            <span>Made with care in Kanpur, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink(null)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5c] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
      aria-label="WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}
