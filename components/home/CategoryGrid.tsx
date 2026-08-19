import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, LayoutGrid } from 'lucide-react';
import { categories } from '@/data/products';

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-slate-50" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Collections</span>
          </div>
          <h2 className="section-title text-slate-900">Shop by Category</h2>
          <p className="section-subtitle">
            Browse our wide selection of handpicked products across top categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 block"
            >
              {/* Category Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-115"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Content at Bottom */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="font-bold text-base sm:text-lg leading-snug group-hover:text-indigo-200 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    {category.count} Products
                  </p>
                </div>

                {/* Arrow Icon on Hover */}
                <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-indigo-300 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
