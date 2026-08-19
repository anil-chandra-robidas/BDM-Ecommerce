import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
import PageLoader from '@/components/ui/PageLoader';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'BDM-Ecommerce — Premium Online Shopping',
  description:
    'Discover premium fashion, electronics, home goods and more on BDM-Ecommerce. Shop the latest trends with free shipping on orders over $50.',
  keywords: ['ecommerce', 'fashion', 'electronics', 'online shopping', 'bdm-ecommerce'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} flex flex-col min-h-screen relative`}>
        <CartProvider>
          <WishlistProvider>
            <PageLoader />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
