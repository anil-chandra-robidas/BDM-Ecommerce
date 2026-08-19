'use client';

import Link from 'next/link';
import { megaMenuData } from '@/data/products';
import { ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  const categories = Object.entries(megaMenuData);

  return (
    <div
      role="region"
      aria-label="Mega menu"
      className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 z-40 animate-slide-down"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* 4 Category Columns */}
          {categories.map(([categoryName, groups]) => {
            const categorySlug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            return (
              <div key={categoryName} className="space-y-6">
                <div>
                  <Link
                    href={`/shop?category=${encodeURIComponent(categorySlug)}`}
                    onClick={onClose}
                    className="group inline-flex items-center gap-1.5 text-base font-bold text-indigo-600 hover:text-indigo-700 transition-colors pb-2 border-b-2 border-indigo-100 hover:border-indigo-600 w-full"
                  >
                    <span>{categoryName}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </div>

                <div className="space-y-5">
                  {groups.map((group) => (
                    <div key={group.title} className="space-y-2">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {group.title}
                      </h4>
                      <ul className="space-y-1.5">
                        {group.items.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="mega-menu-item block py-0.5 text-slate-600 hover:text-indigo-600 hover:translate-x-1 transition-all duration-200"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* 5th Column: Featured Promotional Banner */}
          <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
            {/* Background glowing orb decorations */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-400/20 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Special Offer</span>
              </div>

              <div>
                <h3 className="text-xl font-bold leading-tight">
                  Seasonal Clearance
                </h3>
                <p className="text-indigo-100 text-xs mt-1.5 leading-relaxed">
                  Save up to 40% on curated luxury essentials. Limited time only.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-indigo-200 pt-1">
                <Tag className="w-3.5 h-3.5 text-rose-300" />
                <span>Use code: <strong>LUXE20</strong></span>
              </div>
            </div>

            <div className="relative z-10 pt-6">
              <Link
                href="/shop"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-indigo-700 font-semibold text-sm shadow-md hover:bg-indigo-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Shop All Items</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-indigo-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
