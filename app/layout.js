import './globals.css';
import { Providers } from './providers';
import { Playfair_Display, Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Tyra Décor — Recycled. Refined. Remarkable.',
  description:
    'Premium handwoven furniture and planters, crafted from recycled tyres in Kanpur, India. Chairs, tables, planters and suites for luxury interiors, outdoors and commercial spaces.',
  keywords: [
    'Tyra Decor',
    'recycled tyre furniture',
    'handwoven planters',
    'luxury home decor',
    'sustainable furniture India',
    'Kanpur furniture',
  ],
  openGraph: {
    title: 'Tyra Décor — Recycled. Refined. Remarkable.',
    description:
      'Premium handwoven furniture and planters, crafted from recycled tyres.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);',
          }}
        />
        {/* Hide any 3rd-party watermarks */}
        <style>{`
          #emergent-badge, .emergent-badge, a[href*="emergent.sh"], a[href*="emergent.dev"], a[href*="emergent.agent"] { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }
        `}</style>
      </head>
      <body className="font-sans antialiased bg-[#FAF7F2] text-[#1A1A1A]">
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
