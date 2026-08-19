import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-100/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-100/50 rounded-full blur-2xl pointer-events-none" />

        {/* 404 Icon */}
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner animate-pulse-slow">
          <ShoppingBag className="w-10 h-10" />
        </div>

        {/* 404 Number Badge */}
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest rounded-full mb-3">
          Error 404
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
          Page Not Found
        </h1>

        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="btn-primary text-xs !py-3 flex-1 inline-flex items-center justify-center gap-2 shadow-indigo-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/shop"
            className="btn-secondary text-xs !py-3 flex-1 inline-flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Explore Shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
