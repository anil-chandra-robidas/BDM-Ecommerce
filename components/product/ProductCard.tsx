'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, Eye, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const getBadgeStyle = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'sale':
        return 'bg-rose-500 text-white';
      case 'new':
        return 'bg-emerald-500 text-white';
      case 'best seller':
        return 'bg-indigo-600 text-white';
      case 'hot':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-indigo-600 text-white';
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    
    addToCart(
      product,
      1,
      product.colors && product.colors.length > 0 ? product.colors[0] : undefined,
      product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="card group flex flex-col h-full bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="aspect-[3/4] relative overflow-hidden rounded-t-2xl bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover product-image-hover"
        />

        {/* Top-Left Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`rounded-lg px-3 py-1 text-xs font-semibold shadow-md ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Top-Right Discount Badge */}
        {discountPercent && (
          <div className="absolute top-3 right-3 z-10">
            <span className="rounded-lg px-2.5 py-1 text-xs font-bold bg-rose-500 text-white shadow-md">
              -{discountPercent}%
            </span>
          </div>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 p-4 z-10">
          {/* Quick View Button */}
          <Link
            href={`/product/${product.id}`}
            className="rounded-full bg-white shadow-lg p-2.5 text-slate-700 hover:bg-indigo-600 hover:text-white transition-all transform -translate-y-2 group-hover:translate-y-0 duration-300 hover:scale-110"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </Link>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`rounded-full shadow-lg p-2.5 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 hover:scale-110 ${
              !product.inStock
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-700 hover:bg-indigo-600 hover:text-white'
            }`}
            title={
              !product.inStock
                ? 'Out of Stock'
                : isAdded
                ? 'Added to Cart!'
                : 'Add to Cart'
            }
          >
            {isAdded ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`rounded-full shadow-lg p-2.5 transition-all transform -translate-y-2 group-hover:translate-y-0 duration-300 hover:scale-110 ${
              isWishlisted
                ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
                : 'bg-white text-slate-700 hover:bg-rose-500 hover:text-white'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart
              className={`w-5 h-5 ${
                isWishlisted ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category */}
          <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wider block">
            {product.category}
          </span>

          {/* Product Name */}
          <Link href={`/product/${product.id}`} className="block mt-1.5">
            <h3 className="font-semibold text-slate-900 text-base leading-snug line-clamp-2 hover:text-indigo-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : i < product.rating
                      ? 'fill-amber-400/50 text-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-800">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Price & Stock */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="line-through text-slate-400 text-sm font-medium">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {!product.inStock && (
            <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded">
              Out of stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
