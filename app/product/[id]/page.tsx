'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  ChevronRight,
  Check,
  Share2,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Award,
  Package,
} from 'lucide-react';
import { getProductById, getProductsByCategory, getFeaturedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/product/ProductCard';

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const productId = Number(params?.id);
  const product = getProductById(productId);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors && product.colors.length > 0 ? product.colors[0] : ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  // If product is not found
  if (!product) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
          <p className="text-slate-500 text-sm mb-6">
            The product you are looking for doesn&apos;t exist or might have been removed from our catalog.
          </p>
          <Link
            href="/shop"
            className="btn-primary w-full inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // Related products
  const categoryProducts = getProductsByCategory(product.category).filter((p) => p.id !== product.id);
  const relatedProducts =
    categoryProducts.length >= 4
      ? categoryProducts.slice(0, 4)
      : [...categoryProducts, ...getFeaturedProducts().filter((p) => p.id !== product.id && !categoryProducts.some(cp => cp.id === p.id))].slice(0, 4);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(
      product,
      quantity,
      selectedColor || (product.colors?.[0] ?? undefined),
      selectedSize || (product.sizes?.[0] ?? undefined)
    );
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  const getColorHex = (colorName: string) => {
    const c = colorName.toLowerCase();
    if (c.includes('black')) return '#18181b';
    if (c.includes('white')) return '#ffffff';
    if (c.includes('brown')) return '#78350f';
    if (c.includes('tan')) return '#d97706';
    if (c.includes('dark blue') || c.includes('navy')) return '#0f172a';
    if (c.includes('light blue')) return '#38bdf8';
    if (c.includes('blue')) return '#2563eb';
    if (c.includes('pink')) return '#ec4899';
    if (c.includes('yellow')) return '#eab308';
    if (c.includes('gray') || c.includes('grey')) return '#64748b';
    if (c.includes('olive') || c.includes('green')) return '#4d7c0f';
    if (c.includes('red')) return '#dc2626';
    if (c.includes('purple')) return '#9333ea';
    if (c.includes('gold')) return '#d4af37';
    if (c.includes('silver')) return '#c0c0c0';
    return '#6366f1';
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center flex-wrap gap-2 text-sm text-slate-500 mb-8 animate-fade-in">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <Link href="/shop" className="hover:text-indigo-600 transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-indigo-600 transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="text-slate-900 font-medium truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* Product Main Section: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            {/* Main Featured Image */}
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 group shadow-inner">
              <Image
                src={images[selectedImageIndex] || product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Badges */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-bold shadow-lg ${
                      product.badge.toLowerCase() === 'sale'
                        ? 'bg-rose-500 text-white'
                        : product.badge.toLowerCase() === 'new'
                        ? 'bg-emerald-500 text-white'
                        : product.badge.toLowerCase() === 'best seller'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
              )}

              {discountPercent && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="rounded-xl px-3 py-1.5 text-xs font-extrabold bg-rose-500 text-white shadow-lg">
                    -{discountPercent}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-indigo-600 ring-2 ring-indigo-600/30 scale-95 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details & Purchase Form */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Tags */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <button
                  onClick={handleShare}
                  className="text-slate-400 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-slate-50 relative"
                  title="Share product"
                >
                  <Share2 className="w-4 h-4" />
                  {showShareToast && (
                    <span className="absolute -top-8 right-0 bg-slate-900 text-white text-[10px] py-1 px-2 rounded shadow whitespace-nowrap">
                      Link copied!
                    </span>
                  )}
                </button>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Rating, Reviews & Stock Status */}
              <div className="flex items-center flex-wrap gap-4 mt-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : i < product.rating
                            ? 'fill-amber-400/50 text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-800 ml-1">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({product.reviews} customer reviews)
                  </span>
                </div>

                <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>

                {/* Stock Indicator */}
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      product.inStock ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                    }`}
                  ></span>
                  <span
                    className={`text-xs font-semibold ${
                      product.inStock ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {product.inStock ? 'In Stock & Ready to Ship' : 'Currently Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 my-5">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-slate-400 line-through font-medium">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {discountPercent && (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
                    Save ${(product.originalPrice! - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description summary */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Color: <span className="font-semibold text-indigo-600">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => {
                      const isSelected = selectedColor === color;
                      const hex = getColorHex(color);
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`group relative w-9 h-9 rounded-full transition-all flex items-center justify-center ${
                            isSelected
                              ? 'ring-2 ring-offset-2 ring-indigo-600 scale-110'
                              : 'hover:scale-105 border border-slate-300'
                          }`}
                          style={{ backgroundColor: hex }}
                          title={color}
                        >
                          {isSelected && (
                            <Check
                              className={`w-4 h-4 ${
                                color.toLowerCase().includes('white') || color.toLowerCase().includes('yellow')
                                  ? 'text-slate-900'
                                  : 'text-white'
                              }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Size: <span className="font-semibold text-indigo-600">{selectedSize}</span>
                    </label>
                    <span className="text-xs text-indigo-600 hover:underline cursor-pointer">
                      Size Guide
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {/* Quantity */}
                  <div className="flex items-center justify-between border border-slate-200 rounded-xl bg-slate-50 p-1 w-full sm:w-36">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1 || !product.inStock}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-slate-900 text-base">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      disabled={!product.inStock}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white transition-colors disabled:opacity-40"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`btn-primary flex-1 py-3.5 flex items-center justify-center gap-2.5 text-base shadow-indigo-500/25 ${
                      isAddedToCart ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : ''
                    }`}
                  >
                    {isAddedToCart ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3.5 rounded-xl border flex items-center justify-center transition-all ${
                      isWishlisted
                        ? 'border-rose-200 bg-rose-50 text-rose-500 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200'
                    }`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-100">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Free Shipping</h4>
                    <p className="text-[11px] text-slate-500">Orders over $50</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">2-Year Warranty</h4>
                    <p className="text-[11px] text-slate-500">100% Guaranteed</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">30-Day Returns</h4>
                    <p className="text-[11px] text-slate-500">Hassle-free exchange</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs Section */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-10">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 gap-8 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-base font-bold transition-all relative whitespace-nowrap ${
                activeTab === 'description'
                  ? 'text-indigo-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Description
              {activeTab === 'description' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('specifications')}
              className={`pb-4 text-base font-bold transition-all relative whitespace-nowrap ${
                activeTab === 'specifications'
                  ? 'text-indigo-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Specifications
              {activeTab === 'specifications' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-base font-bold transition-all relative whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'text-indigo-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Reviews ({product.reviews})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"></span>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="pt-8">
            {activeTab === 'description' && (
              <div className="space-y-6 text-slate-600 leading-relaxed animate-fade-in max-w-4xl">
                <h3 className="text-xl font-bold text-slate-900">Craftsmanship & Design</h3>
                <p>{product.description}</p>
                <p>
                  Every aspect of this piece has been carefully designed and engineered with premium quality materials, rigorous testing, and meticulous attention to detail. Designed to elevate your daily routine while offering unparalleled durability and timeless style.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Premium Materials</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Sourced responsibly using highest grade components ensuring comfort, resilience and longevity.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <Award className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Quality Guaranteed</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Backed by our satisfaction guarantee and rigorous multi-stage quality assurance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="animate-fade-in max-w-3xl">
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-3 p-4 bg-slate-50 text-sm">
                    <span className="font-bold text-slate-700">Category</span>
                    <span className="col-span-2 text-slate-600">{product.category}</span>
                  </div>
                  <div className="grid grid-cols-3 p-4 bg-white text-sm">
                    <span className="font-bold text-slate-700">Subcategory</span>
                    <span className="col-span-2 text-slate-600">{product.subcategory}</span>
                  </div>
                  <div className="grid grid-cols-3 p-4 bg-slate-50 text-sm">
                    <span className="font-bold text-slate-700">SKU</span>
                    <span className="col-span-2 text-slate-600 font-mono">LX-{product.id.toString().padStart(6, '0')}</span>
                  </div>
                  <div className="grid grid-cols-3 p-4 bg-white text-sm">
                    <span className="font-bold text-slate-700">Availability</span>
                    <span className="col-span-2 text-slate-600">
                      {product.inStock ? 'In Stock (Ships within 24h)' : 'Out of Stock'}
                    </span>
                  </div>
                  {product.colors && (
                    <div className="grid grid-cols-3 p-4 bg-slate-50 text-sm">
                      <span className="font-bold text-slate-700">Available Colors</span>
                      <span className="col-span-2 text-slate-600">{product.colors.join(', ')}</span>
                    </div>
                  )}
                  {product.sizes && (
                    <div className="grid grid-cols-3 p-4 bg-white text-sm">
                      <span className="font-bold text-slate-700">Available Sizes</span>
                      <span className="col-span-2 text-slate-600">{product.sizes.join(', ')}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-3 p-4 bg-slate-50 text-sm">
                    <span className="font-bold text-slate-700">Tags</span>
                    <span className="col-span-2 text-slate-600">
                      {product.tags.map((t) => `#${t}`).join(' ')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="animate-fade-in space-y-8 max-w-4xl">
                {/* Rating Overview */}
                <div className="flex flex-col sm:flex-row items-center gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="text-center sm:text-left sm:pr-8 sm:border-r border-slate-200">
                    <div className="text-5xl font-black text-slate-900">{product.rating.toFixed(1)}</div>
                    <div className="flex items-center justify-center sm:justify-start text-amber-400 my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-amber-400/50 text-amber-400'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-slate-500">Based on {product.reviews} ratings</div>
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const percentage =
                        stars === 5 ? 75 : stars === 4 ? 18 : stars === 3 ? 5 : stars === 2 ? 2 : 0;
                      return (
                        <div key={stars} className="flex items-center gap-3 text-xs">
                          <span className="w-12 font-medium text-slate-600">{stars} stars</span>
                          <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="w-8 text-right text-slate-400">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sample Customer Reviews */}
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 text-base">Customer Feedback</h4>

                  <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
                          EL
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">Emma L.</div>
                          <div className="text-[11px] text-slate-400">Verified Buyer • 2 weeks ago</div>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Exceptional quality and fast shipping! The fit is true to size, and the fabric feels amazingly soft and durable. Will definitely buy again.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                          MD
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">Marcus D.</div>
                          <div className="text-[11px] text-slate-400">Verified Buyer • 1 month ago</div>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < 4 ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Really impressed with the packaging and the attention to detail. Matches the product photos perfectly.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Related Products
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Discover more items from {product.category} that match your taste.
                </p>
              </div>
              <Link
                href={`/shop?category=${encodeURIComponent(product.category)}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
