'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  ChevronDown,
  ShoppingBag,
  Heart,
  Home,
  Store,
  Info,
  Mail,
  User,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { megaMenuData } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const { totalItems, isLoaded: cartLoaded } = useCart();
  const { items: wishlistItems, isLoaded: wishlistLoaded } = useWishlist();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleCategory = (category: string) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Shop All', href: '/shop', icon: Store },
    { name: 'About Us', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail },
    { name: 'Admin Portal', href: '/admin', icon: Sparkles },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-in Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl font-black tracking-tight text-gradient">
              LUXE
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200">
              STORE
            </span>
          </Link>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-hide">
          {/* Main Navigation Links */}
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Menu
            </p>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                >
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Collapsible Categories Section */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Shop Categories
            </p>

            <div className="space-y-1.5">
              {Object.entries(megaMenuData).map(([categoryName, groups]) => {
                const isExpanded = expandedCategory === categoryName;
                const categorySlug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

                return (
                  <div
                    key={categoryName}
                    className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/40"
                  >
                    <button
                      onClick={() => toggleCategory(categoryName)}
                      className="w-full flex items-center justify-between px-3.5 py-3 text-sm font-semibold text-slate-800 hover:text-indigo-600 hover:bg-slate-100/60 transition-colors text-left"
                    >
                      <span>{categoryName}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-indigo-600' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-3.5 pb-4 pt-1 space-y-4 bg-white border-t border-slate-100 animate-slide-down">
                        <Link
                          href={`/shop?category=${encodeURIComponent(categorySlug)}`}
                          onClick={onClose}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 py-1"
                        >
                          <span>Explore all {categoryName}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        {groups.map((group) => (
                          <div key={group.title} className="space-y-1.5 pl-2 border-l-2 border-slate-100">
                            <span className="text-xs font-medium text-slate-400">
                              {group.title}
                            </span>
                            <div className="flex flex-col space-y-1 pl-1">
                              {group.items.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  onClick={onClose}
                                  className="text-xs text-slate-600 hover:text-indigo-600 py-1 transition-colors"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Promo Callout */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100/70">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Special Offer</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use code <strong className="text-indigo-700 font-bold">LUXE20</strong> at checkout for 20% off your entire order!
            </p>
          </div>
        </div>

        {/* Drawer Footer with Cart & Wishlist */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-sm font-medium transition-all shadow-sm"
            >
              <div className="relative">
                <Heart className="w-4 h-4 text-rose-500" />
                {mounted && wishlistLoaded && wishlistItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </div>
              <span>Wishlist</span>
            </Link>

            {/* Cart Link */}
            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {mounted && cartLoaded && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </Link>
          </div>

          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-900 transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            <span>My Account / Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
