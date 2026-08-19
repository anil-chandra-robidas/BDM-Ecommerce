'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Trash2, ChevronRight, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

export default function CartPage() {
  const { items, clearCart, totalItems, isLoaded } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Avoid hydration mismatch when reading localStorage
  if (!isLoaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  const isEmpty = items.length === 0;

  return (
    <div className="bg-slate-50/50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-800">Shopping Cart</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Shopping Cart
            </h1>
            {!isEmpty && (
              <p className="text-sm text-slate-500 mt-1">
                You have <span className="font-semibold text-indigo-600">{totalItems}</span> {totalItems === 1 ? 'item' : 'items'} in your cart
              </p>
            )}
          </div>

          {!isEmpty && (
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          )}
        </div>

        {/* Empty State */}
        {isEmpty ? (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center max-w-2xl mx-auto my-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-tr from-indigo-50 to-violet-100 flex items-center justify-center text-indigo-600 shadow-inner">
              <ShoppingBag className="w-12 h-12" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-slate-500 max-w-md mx-auto mb-8 text-sm leading-relaxed">
              Looks like you haven&apos;t added any items to your shopping bag yet. Explore our latest arrivals and luxury collections.
            </p>
            <Link href="/shop" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 shadow-indigo-500/25">
              <Sparkles className="w-4 h-4" />
              <span>Explore Products</span>
            </Link>
          </div>
        ) : (
          /* Cart Content Layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Items List (2/3 width) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
              {/* Header inside cart box */}
              <div className="hidden sm:grid grid-cols-12 text-xs font-semibold uppercase tracking-wider text-slate-400 pb-4 border-b border-slate-100 px-4">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-slate-100">
                {items.map((item) => (
                  <CartItem
                    key={`${item.product.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`}
                    item={item}
                  />
                ))}
              </div>

              {/* Bottom Actions Bar */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Link>

                {showClearConfirm ? (
                  <div className="flex items-center gap-2 bg-rose-50 p-2 rounded-xl border border-rose-100 animate-fade-in">
                    <span className="text-xs text-rose-700 font-medium px-2">Clear all items?</span>
                    <button
                      type="button"
                      onClick={() => {
                        clearCart();
                        setShowClearConfirm(false);
                      }}
                      className="px-3 py-1 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-700 transition-colors"
                    >
                      Yes, Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowClearConfirm(false)}
                      className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(true)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-4 py-2 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear Cart</span>
                  </button>
                )}
              </div>
            </div>

            {/* Order Summary (1/3 width) */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
