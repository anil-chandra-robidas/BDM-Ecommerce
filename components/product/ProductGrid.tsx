'use client';

import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: number;
}

export default function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl border border-slate-100 shadow-sm my-4">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4 animate-pulse-slow">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No products found</h3>
        <p className="text-slate-500 max-w-md mb-6 text-sm">
          We couldn&apos;t find any items matching your criteria. Try adjusting your search keywords, clearing filters, or browsing other categories.
        </p>
      </div>
    );
  }

  const getGridColumnClass = (cols: number) => {
    switch (cols) {
      case 2:
        return 'grid grid-cols-1 sm:grid-cols-2 gap-6';
      case 3:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
      case 4:
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
    }
  };

  return (
    <div className={getGridColumnClass(columns)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
