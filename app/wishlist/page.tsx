'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  ShoppingCart,
  X,
  ArrowLeft,
  Trash2,
  Check,
  Sparkles,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

export default function WishlistPage() {
  const { items, removeFromWishlist, isLoaded } = useWishlist();
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Record<number, boolean>>({});
  const [addedAllSuccess, setAddedAllSuccess] = useState(false);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const handleAddAllToCart = () => {
    const inStockItems = items.filter((p) => p.inStock);
    inStockItems.forEach((product) => {
      addToCart(product, 1);
    });

    setAddedAllSuccess(true);
    setTimeout(() => {
      setAddedAllSuccess(false);
    }, 3000);
  };

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
          <span className="font-semibold text-slate-800">My Wishlist</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
              <span>My Wishlist</span>
              {!isEmpty && (
                <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              )}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Saved items you love. Add them to your bag anytime.
            </p>
          </div>

          {!isEmpty && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAddAllToCart}
                className="btn-primary py-2.5 px-5 text-sm gap-2"
              >
                {addedAllSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>All Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add All to Cart</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {isEmpty ? (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center max-w-2xl mx-auto my-8 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shadow-inner">
              <Heart className="w-12 h-12" strokeWidth={1.5} fill="currentColor" fillOpacity={0.15} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-slate-500 max-w-md mx-auto mb-8 text-sm leading-relaxed">
              You haven&apos;t saved any favorites yet. Browse our collections and click the heart icon on any product to save it here for later.
            </p>
            <Link href="/shop" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 shadow-indigo-500/25">
              <Sparkles className="w-4 h-4" />
              <span>Discover Products</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Desktop Table Layout (hidden on mobile, visible md and up) */}
            <div className="hidden md:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th scope="col" className="py-4 px-6">Product</th>
                    <th scope="col" className="py-4 px-6 text-left">Price</th>
                    <th scope="col" className="py-4 px-6 text-center">Stock Status</th>
                    <th scope="col" className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((product) => {
                    const isAdded = addedItems[product.id];

                    return (
                      <tr
                        key={product.id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        {/* Product info */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <Link
                              href={`/product/${product.id}`}
                              className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 flex-shrink-0 group-hover:opacity-90 transition-opacity"
                            >
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </Link>
                            <div className="min-w-0">
                              <Link
                                href={`/product/${product.id}`}
                                className="text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-1"
                              >
                                {product.name}
                              </Link>
                              <span className="text-xs text-slate-400 block mt-0.5">
                                {product.category} {product.subcategory && `• ${product.subcategory}`}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="py-4 px-6 text-left">
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-bold text-slate-900">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-slate-400 line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Stock Status */}
                        <td className="py-4 px-6 text-center">
                          {product.inStock ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              In Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                              Out of Stock
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="inline-flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleAddToCart(product)}
                              disabled={!product.inStock}
                              className={`btn-primary text-xs py-2 px-4 shadow-sm ${
                                isAdded ? 'bg-emerald-600 from-emerald-600 to-teal-600' : ''
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5 mr-1" />
                                  <span>Added!</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                                  <span>Add to Cart</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => removeFromWishlist(product.id)}
                              className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Remove item"
                              aria-label={`Remove ${product.name} from wishlist`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout (visible on mobile, hidden md and up) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {items.map((product) => {
                const isAdded = addedItems[product.id];

                return (
                  <div
                    key={`mobile-${product.id}`}
                    className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-4"
                  >
                    <div className="flex gap-4">
                      <Link
                        href={`/product/${product.id}`}
                        className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <Link
                            href={`/product/${product.id}`}
                            className="text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2"
                          >
                            {product.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeFromWishlist(product.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                            aria-label="Remove item"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{product.category}</p>

                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-base font-bold text-slate-900">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div>
                        {product.inStock ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            Out of Stock
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className={`btn-primary text-xs py-2 px-4 ${
                          isAdded ? 'bg-emerald-600 from-emerald-600 to-teal-600' : ''
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 mr-1" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Continue Shopping Link */}
            <div className="pt-4 flex justify-between items-center">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
