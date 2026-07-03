import { Playfair_Display, Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: {
    default: 'Grace Academy | Excellence in Education — Spintex, Tema-Accra',
    template: '%s | Grace Academy',
  },
  description:
    'Grace Academy is a premier K-12 school in Spintex, Tema-Accra, Ghana. From Crèche to SHS, we nurture academic excellence, character, and leadership in every child.',
  keywords: [
    'Grace Academy', 'school Ghana', 'Spintex school', 'Tema-Accra school',
    'private school Ghana', 'SHS', 'JHS', 'crèche Ghana', 'best school Accra',
    'boarding school Ghana', 'international school Ghana', 'GES curriculum Ghana',
  ],
  metadataBase: new URL('https://www.graceacademysch.com'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    siteName: 'Grace Academy',
    title: 'Grace Academy — Excellence in Education',
    description: 'A premier K-12 school in Spintex, Tema-Accra, Ghana. Where every child finds their greatness.',
    images: [{ url: '/images/bg.png', width: 1200, height: 630, alt: 'Grace Academy Campus' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grace Academy — Excellence in Education',
    description: 'A premier K-12 school in Spintex, Tema-Accra, Ghana.',
    images: ['/images/bg.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
