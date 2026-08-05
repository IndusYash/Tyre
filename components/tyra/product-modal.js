'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, MessageCircle, Phone, Ruler, Palette, Package, Info, Check } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { COMPANY, inr, whatsappLink } from './company';
import { ZoomImage } from './zoom-image';

export function ProductModal({ product, onClose }) {
  useEffect(() => {
    if (product) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [product]);

  const discount =
    product && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-charcoal/85 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl max-h-[92vh] bg-cream-light rounded-[2rem] overflow-hidden shadow-2xl border border-champagne/30"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-charcoal flex items-center justify-center shadow-lg border border-black/5"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="grid md:grid-cols-5 max-h-[92vh] overflow-hidden">
              {/* Left — image with zoom lens */}
              <div className="md:col-span-3 bg-cream-light relative border-b md:border-b-0 md:border-r border-black/5">
                <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                  {product.featured && (
                    <span className="text-[10px] uppercase tracking-widest bg-gold text-white px-3 py-1 rounded-full font-semibold shadow-sm">
                      ✦ Featured
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="text-[10px] uppercase tracking-widest bg-charcoal text-white px-3 py-1 rounded-full">
                      −{discount}% Launch Offer
                    </span>
                  )}
                </div>
                <div className="h-[45vh] md:h-full min-h-[300px]">
                  <ZoomImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full"
                    padding={48}
                    lensSize={200}
                    zoomLevel={2.8}
                  />
                </div>
                <div className="hidden md:block absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.3em] text-muted-warm bg-white/80 backdrop-blur px-3 py-1.5 rounded-full">
                  Hover to zoom
                </div>
              </div>

              {/* Right — details */}
              <div className="md:col-span-2 p-6 md:p-8 lg:p-10 overflow-y-auto">
                <div className="text-[10px] uppercase tracking-[0.4em] text-gold font-semibold mb-3">
                  {product.category} · {product.sku}
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal leading-[1.1] font-medium mb-2">
                  {product.name}
                </h2>
                {product.tagline && (
                  <p className="font-serif text-lg text-muted-warm italic mb-6">
                    {product.tagline}
                  </p>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-black/10 flex-wrap">
                  {product.priceOnRequest ? (
                    <>
                      <div className="font-serif text-3xl md:text-4xl text-charcoal font-medium italic">
                        Price on Request
                      </div>
                      {product.leadTime && (
                        <div className="text-xs uppercase tracking-widest text-gold font-semibold w-full mt-1">
                          Lead time: {product.leadTime}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="font-serif text-4xl text-charcoal font-medium">
                        {inr(product.price)}
                      </div>
                      {product.originalPrice > product.price && (
                        <div className="text-base text-muted-warm line-through">
                          {inr(product.originalPrice)}
                        </div>
                      )}
                      <div className="text-[10px] uppercase tracking-widest text-muted-warm">
                        + GST
                      </div>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-charcoal/80 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Specs */}
                <div className="space-y-3 mb-6">
                  <SpecRow icon={Ruler} label="Dimensions" value={product.dimensions} />
                  <SpecRow icon={Package} label="Material" value={product.material} />
                  <SpecRow
                    icon={Palette}
                    label="Colours"
                    value={(product.colors || []).join(', ')}
                  />
                  <SpecRow
                    icon={Check}
                    label="Availability"
                    value={product.availability}
                    valueClass={
                      product.availability === 'In Stock'
                        ? 'text-green-800'
                        : 'text-amber-800'
                    }
                  />
                  {product.note && (
                    <SpecRow icon={Info} label="Note" value={product.note} />
                  )}
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-2 pt-4 border-t border-black/10">
                  <a href={whatsappLink(product)} target="_blank" rel="noreferrer">
                    <Button className="w-full bg-[#25D366] hover:bg-[#1ebe5c] text-white rounded-full h-12 uppercase text-[11px] tracking-[0.3em] font-semibold shadow-md">
                      <MessageCircle size={16} className="mr-2" />
                      Enquire via WhatsApp
                    </Button>
                  </a>
                  <a href={`tel:${COMPANY.phone}`}>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent border-charcoal/20 hover:bg-charcoal hover:text-white rounded-full h-12 uppercase text-[11px] tracking-[0.3em] font-semibold"
                    >
                      <Phone size={14} className="mr-2" />
                      Call {COMPANY.phone}
                    </Button>
                  </a>
                </div>

                <p className="text-[11px] text-muted-warm text-center mt-4">
                  All prices exclusive of GST · Handcrafted in Kanpur, India
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SpecRow({ icon: Icon, label, value, valueClass = '' }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
        <Icon size={13} />
      </div>
      <div className="flex-1">
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-warm font-semibold">
          {label}
        </div>
        <div className={`text-sm text-charcoal ${valueClass}`}>{value || '—'}</div>
      </div>
    </div>
  );
}
