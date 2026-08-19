'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { products, getFeaturedProducts } from '@/data/products';

export default function FeaturedProducts() {
  // Get first 8 products for display
  const featuredList = products.slice(0, 8);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Editor's Choice</span>
            </div>
            <h2 className="section-title text-slate-900">Featured Products</h2>
            <p className="section-subtitle">
              Handpicked items just for you, crafted with excellence and style
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 hover:gap-3 transition-all duration-300 mt-4 md:mt-0"
          >
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-12 text-center">
          <Link href="/shop" className="btn-primary gap-2 shadow-indigo-500/25">
            <span>Explore All Products</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
