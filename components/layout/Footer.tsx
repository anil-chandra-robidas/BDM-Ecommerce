'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Github,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  ArrowRight,
  CreditCard,
  Lock,
} from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop All', href: '/shop' },
    { name: 'Featured Products', href: '/shop?badge=Best+Seller' },
    { name: 'New Arrivals', href: '/shop?badge=New' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Admin Dashboard', href: '/admin' },
  ];

  const customerServiceLinks = [
    { name: 'Frequently Asked Questions', href: '/faq' },
    { name: 'Shipping & Delivery', href: '/shipping' },
    { name: 'Returns & Exchanges', href: '/returns' },
    { name: 'Size & Fit Guide', href: '/size-guide' },
    { name: 'Track Your Order', href: '/track-order' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  const valueProps = [
    {
      icon: Truck,
      title: 'Free Worldwide Shipping',
      description: 'On all orders over $50 with live tracking',
    },
    {
      icon: RotateCcw,
      title: '30-Day Free Returns',
      description: 'Hassle-free refunds and easy exchanges',
    },
    {
      icon: ShieldCheck,
      title: '100% Secure Checkout',
      description: '256-bit SSL encrypted transactions',
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      description: 'Always here to assist with any questions',
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Value Proposition Highlights Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {valueProps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-800/60 hover:border-slate-700 transition-colors"
                >
                  <div className="flex-shrink-0 p-3 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand Info & Socials */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-300 to-violet-400">
                BDM
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/50">
                ECOMMERCE
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed">
              Your premier destination for luxury fashion, modern electronics, and refined home essentials. Designed for those who value elegance, craftsmanship, and innovation.
            </p>

            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>540 Madison Ave, New York, NY 10022</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>+1 (800) 555-BDM (236)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>support@bdmecommerce.com</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <div className="flex items-center space-x-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LUXE on Instagram"
                  className="p-2.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-indigo-600 hover:scale-105 transition-all duration-200"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LUXE on Twitter"
                  className="p-2.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-indigo-600 hover:scale-105 transition-all duration-200"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LUXE on Facebook"
                  className="p-2.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-indigo-600 hover:scale-105 transition-all duration-200"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LUXE on YouTube"
                  className="p-2.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-indigo-600 hover:scale-105 transition-all duration-200"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LUXE on GitHub"
                  className="p-2.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-indigo-600 hover:scale-105 transition-all duration-200"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-indigo-300 hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <span>Customer Service</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              {customerServiceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-indigo-300 hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <span>Join the Inner Circle</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Subscribe to get <strong className="text-indigo-300">15% off</strong> your first order, private sale invitations, and curated lifestyle drops.
            </p>

            <form
              action="#"
              method="POST"
              className="space-y-3"
            >
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full text-sm py-3 flex items-center justify-center gap-2"
              >
                <span>Subscribe Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>We respect your privacy. Unsubscribe anytime.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Payment Methods, Legal */}
        <div className="border-t border-slate-800/80 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-slate-400 text-center md:text-left">
            <p>© {currentYear} BDM-Ecommerce, Inc. All rights reserved.</p>
            <p className="text-slate-500 mt-1">
              Designed with precision for elevated shopping experiences.
            </p>
          </div>

          {/* Payment Method Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-medium">
              Visa
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-medium">
              Mastercard
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-medium">
              Amex
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-medium">
              PayPal
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-medium">
              Apple Pay
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-medium">
              Google Pay
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <span>•</span>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
