'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Zap, Flame } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/data/products';

const filterTabs = [
  { label: 'All Items', key: 'all' },
  { label: "Men's", key: "Men's Fashion" },
  { label: "Women's", key: "Women's Fashion" },
  { label: 'Electronics', key: 'Electronics' },
  { label: 'Home & Living', key: 'Home & Living' },
];

export default function NewArrivals() {
  const [activeTab, setActiveTab] = useState('all');

  const displayedProducts = useMemo(() => {
    // Pick products with "New" badge or recent ones
    const newItems = products.filter(
      (p) => p.badge === 'New' || p.id >= 4
    );

    if (activeTab === 'all') {
      return newItems.slice(0, 8);
    }
    return newItems.filter((p) => p.category === activeTab).slice(0, 8);
  }, [activeTab]);

  return (
    <section className="py-20 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Just Dropped</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              New Arrivals
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Discover the freshest designs, latest tech innovations, and modern essentials
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-105'
                      : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
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
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Bar CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between bg-white rounded-2xl p-6 border border-slate-100 shadow-sm gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Looking for more fresh drops?
              </p>
              <p className="text-xs text-slate-500">
                Over 50+ new items added across all categories every single week.
              </p>
            </div>
          </div>
          <Link
            href="/shop"
            className="btn-primary text-xs sm:text-sm !py-2.5 !px-6 whitespace-nowrap shadow-indigo-500/20 inline-flex items-center gap-2 shrink-0"
          >
            <span>Explore All New Drops</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
