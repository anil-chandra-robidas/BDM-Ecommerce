'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  User,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAnnouncement, setShowAnnouncement] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { totalItems, isLoaded: cartLoaded } = useCart();
  const { items: wishlistItems, isLoaded: wishlistLoaded } = useWishlist();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll position for sticky styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus search input when search bar opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Handle Search Submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Safe mega menu hover handlers with slight delay to prevent abrupt closing
  const handleMouseEnterProducts = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
    setMegaMenuOpen(true);
  };

  const handleMouseLeaveProducts = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      {showAnnouncement && (
        <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-inner flex items-center justify-between gap-2 animate-fade-in">
          <div className="flex-1 flex items-center justify-center gap-2 pl-6 sm:pl-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 hidden sm:inline-block animate-pulse-slow" />
            <span>
              Free shipping on orders over $50 | Use code{' '}
              <strong className="underline decoration-amber-300 font-bold">LUXE20</strong> for 20% off
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowAnnouncement(false)}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors shrink-0"
            aria-label="Close promotion banner"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Header Bar */}
      <div
        className={`w-full bg-white transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100'
            : 'bg-white shadow-sm py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left Section: Mobile Menu Toggle & Brand Logo */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Mobile Hamburger Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Brand Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient">
                  LUXE
                </span>
                <span className="hidden sm:inline-block text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  Store
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/'
                    ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                    : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>

              {/* Products link with Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterProducts}
                onMouseLeave={handleMouseLeaveProducts}
              >
                <button
                  type="button"
                  onClick={() => setMegaMenuOpen((prev) => !prev)}
                  className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    megaMenuOpen || pathname.startsWith('/shop')
                      ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                      : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                  aria-expanded={megaMenuOpen}
                  aria-haspopup="true"
                >
                  <span>Products</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      megaMenuOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400'
                    }`}
                  />
                </button>
              </div>

              <Link
                href="/shop"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/shop'
                    ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                    : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                Shop
              </Link>

              <Link
                href="/about"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/about'
                    ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                    : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                About
              </Link>

              <Link
                href="/contact"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/contact'
                    ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                    : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action Icons: Search, Wishlist, Cart, Account */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Expandable Search Button / Toggle */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSearchOpen((prev) => !prev)}
                  className={`p-2 sm:p-2.5 rounded-xl transition-all duration-200 ${
                    searchOpen
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
                  }`}
                  aria-label="Toggle search bar"
                >
                  {searchOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Account Link */}
              <Link
                href="/account"
                className="hidden sm:inline-flex p-2 sm:p-2.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                aria-label="My Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Wishlist Button with Counter Badge */}
              <Link
                href="/wishlist"
                className="relative p-2 sm:p-2.5 rounded-xl text-slate-600 hover:text-rose-500 hover:bg-rose-50/50 transition-colors"
                aria-label={`Wishlist (${mounted && wishlistLoaded ? wishlistItems.length : 0} items)`}
              >
                <Heart className="w-5 h-5" />
                {mounted && wishlistLoaded && wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 bg-rose-500 text-white text-[10px] sm:text-xs font-bold rounded-full h-4 sm:h-5 min-w-[16px] sm:min-w-[20px] px-1 flex items-center justify-center shadow-md animate-scale-in">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart Button with Counter Badge */}
              <Link
                href="/cart"
                className="relative p-2 sm:p-2.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors"
                aria-label={`Shopping Cart (${mounted && cartLoaded ? totalItems : 0} items)`}
              >
                <ShoppingBag className="w-5 h-5" />
                {mounted && cartLoaded && totalItems > 0 && (
                  <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 bg-rose-500 text-white text-[10px] sm:text-xs font-bold rounded-full h-4 sm:h-5 min-w-[16px] sm:min-w-[20px] px-1 flex items-center justify-center shadow-md animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Expandable Search Bar Overlay */}
        {searchOpen && (
          <div className="border-t border-slate-100 bg-slate-50/80 backdrop-blur-md py-4 px-4 sm:px-6 lg:px-8 animate-slide-down">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, brands, categories (e.g. Leather Jacket, Watch, Audio)..."
                  className="w-full pl-11 pr-24 py-3 bg-white rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm shadow-sm transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-semibold rounded-lg shadow hover:opacity-95 transition-opacity"
                >
                  Search
                </button>
              </form>
              <div className="flex items-center gap-2 mt-2.5 px-1 text-xs text-slate-500">
                <span className="font-semibold text-slate-600">Popular:</span>
                {['Leather Jacket', 'Smart Watch', 'Running Shoes', 'Earbuds'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchQuery(term);
                      router.push(`/shop?search=${encodeURIComponent(term)}`);
                      setSearchOpen(false);
                    }}
                    className="hover:text-indigo-600 underline underline-offset-2 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MegaMenu Dropdown */}
        <div
          onMouseEnter={handleMouseEnterProducts}
          onMouseLeave={handleMouseLeaveProducts}
        >
          <MegaMenu
            isOpen={megaMenuOpen}
            onClose={() => setMegaMenuOpen(false)}
          />
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
