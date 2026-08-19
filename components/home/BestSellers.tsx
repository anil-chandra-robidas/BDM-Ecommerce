'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Flame, ArrowRight, TrendingUp, Trophy } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/data/products';

const filterTabs = [
  { label: 'All Best Sellers', key: 'all' },
  { label: 'Top Rated (4.7+)', key: 'top-rated' },
  { label: 'On Sale', key: 'sale' },
];

export default function BestSellers() {
  const [activeFilter, setActiveFilter] = useState('all');

  const bestSellerList = useMemo(() => {
    if (activeFilter === 'top-rated') {
      return products.filter((p) => p.rating >= 4.7).slice(0, 8);
    }
    if (activeFilter === 'sale') {
      return products.filter((p) => p.originalPrice !== undefined).slice(0, 8);
    }
    // All bestsellers
    return products
      .filter(
        (p) =>
          p.badge === 'Best Seller' ||
          p.badge === 'Hot' ||
          p.rating >= 4.6 ||
          p.reviews > 200
      )
      .slice(0, 8);
  }, [activeFilter]);

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Best Sellers
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Our community&apos;s most-loved essentials with top ratings and rave reviews
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-rose-500 to-indigo-600 text-white shadow-md shadow-rose-500/20 scale-105'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {bestSellerList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <span>View All Best Selling Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
