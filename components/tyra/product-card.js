'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { inr } from './company';

export function ProductCard({ product, onOpen }) {
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
      onClick={() => onOpen?.(product)}
      className="group bg-white rounded-3xl hover-lift flex flex-col border border-black/5 overflow-hidden cursor-pointer relative"
    >
      <div className="relative aspect-square overflow-hidden bg-cream-light">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {product.featured && (
          <Badge className="absolute top-4 left-4 bg-gold text-white hover:bg-gold rounded-full text-[10px] tracking-widest uppercase font-semibold px-3 py-1 shadow-sm">
            ✦ Featured
          </Badge>
        )}
        {discount > 0 && (
          <Badge className="absolute top-4 right-4 bg-charcoal text-white rounded-full text-[10px] tracking-widest uppercase px-3 py-1">
            −{discount}%
          </Badge>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cream-light to-transparent pointer-events-none" />
        {/* Hover "View Details" affordance */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-11 h-11 rounded-full bg-charcoal text-white flex items-center justify-center shadow-xl">
            <ArrowUpRight size={17} />
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-1.5 font-semibold">
          {product.category}
        </div>
        <h3 className="font-serif text-xl text-charcoal leading-snug font-medium">
          {product.name}
        </h3>
        <p className="text-sm text-muted-warm mt-1 mb-4 line-clamp-2 italic">
          {product.tagline || product.description}
        </p>
        <ul className="text-xs text-muted-warm space-y-1 mb-4">
          <li className="flex gap-2">
            <span className="text-charcoal/50 min-w-[80px]">Dimensions</span>
            <span className="text-charcoal/80">{product.dimensions}</span>
          </li>
          <li className="flex gap-2">
            <span className="text-charcoal/50 min-w-[80px]">Material</span>
            <span className="text-charcoal/80">{product.material}</span>
          </li>
          <li className="flex gap-2">
            <span className="text-charcoal/50 min-w-[80px]">SKU</span>
            <span className="text-charcoal/80">{product.sku}</span>
          </li>
        </ul>
        <div className="mt-auto pt-4 border-t border-black/5 flex items-end justify-between">
          <div>
            {product.priceOnRequest ? (
              <>
                <div className="font-serif text-lg text-charcoal font-medium italic">
                  Price on Request
                </div>
                {product.leadTime && (
                  <div className="text-[10px] uppercase tracking-widest text-muted-warm mt-1">
                    Lead time: {product.leadTime}
                  </div>
                )}
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
          <span
            className={`text-[10px] uppercase tracking-widest inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
              product.availability === 'In Stock'
                ? 'text-green-800 bg-green-50 border border-green-200'
                : 'text-amber-800 bg-amber-50 border border-amber-200'
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
