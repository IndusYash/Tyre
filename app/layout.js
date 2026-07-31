import './globals.css';
import { Providers } from './providers';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Tyra Décor — Recycled. Refined. Remarkable.',
  description:
    'Premium handwoven furniture and planters, crafted from recycled tyres in Kanpur, India. Chairs, tables, planters and suites for luxury interiors and outdoors.',
  keywords: [
    'Tyra Decor',
    'recycled tyre furniture',
    'handwoven planters',
    'luxury home decor',
    'sustainable furniture India',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);',
          }}
        />
        <style>{`
          #emergent-badge, .emergent-badge, a[href*="emergent.sh"], a[href*="emergent.dev"], a[href*="emergent.agent"], iframe[src*="emergent"] { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }
        `}</style>
      </head>
      <body className="font-sans antialiased bg-[#F6F1E7] text-[#1A1A1A]">
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
