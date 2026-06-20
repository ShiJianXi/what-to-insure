import { Inter, Outfit } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  title: {
    default: 'WhatToInsure — Free Insurance Advice for Singaporeans',
    template: '%s | WhatToInsure',
  },
  description:
    'Get free, unbiased, personalized insurance recommendations tailored to your life situation. No sales pitch. No hidden agenda. Built for Singapore.',
  keywords: [
    'insurance advice singapore',
    'insurance calculator',
    'medishield life',
    'critical illness coverage',
    'term life insurance singapore',
    'financial planning singapore',
  ],
  openGraph: {
    title: 'WhatToInsure — Free Insurance Advice for Singaporeans',
    description:
      'Get free, unbiased, personalized insurance recommendations. No sales pitch.',
    type: 'website',
    locale: 'en_SG',
    siteName: 'WhatToInsure',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <Navbar />
        <main style={{ minHeight: `calc(100vh - var(--navbar-height))` }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
