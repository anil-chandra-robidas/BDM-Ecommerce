'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, selectedColor, selectedSize } = item;

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const lineTotal = product.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-slate-100 transition-colors duration-200 hover:bg-slate-50/50 rounded-xl px-2 sm:px-4">
      {/* Product Image & Info */}
      <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
        <Link
          href={`/product/${product.id}`}
          className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 group"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 80px, 96px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <Link
            href={`/product/${product.id}`}
            className="text-base font-semibold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-1"
          >
            {product.name}
          </Link>
          
          <p className="text-xs text-slate-400 mt-0.5">{product.category}</p>

          {/* Color & Size info */}
          {(selectedColor || selectedSize) && (
            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-600">
              {selectedColor && (
                <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                  <span className="text-slate-400">Color:</span> {selectedColor}
                </span>
              )}
              {selectedSize && (
                <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                  <span className="text-slate-400">Size:</span> {selectedSize}
                </span>
              )}
            </div>
          )}

          <div className="mt-2 sm:hidden flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-900">
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

      {/* Desktop Unit Price */}
      <div className="hidden sm:block text-right min-w-[80px]">
        <div className="text-sm font-semibold text-slate-900">
          ${product.price.toFixed(2)}
        </div>
        {product.originalPrice && (
          <div className="text-xs text-slate-400 line-through">
            ${product.originalPrice.toFixed(2)}
          </div>
        )}
      </div>

      {/* Quantity Controls & Line Total & Remove Button */}
      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-slate-100 sm:border-t-0">
        {/* Quantity Selector */}
        <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={handleDecrement}
            className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 sm:w-10 text-center text-sm font-semibold text-slate-800 select-none">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Line Total */}
        <div className="text-right min-w-[90px]">
          <div className="text-xs text-slate-400 sm:hidden">Total</div>
          <div className="text-base font-bold text-slate-900">
            ${lineTotal.toFixed(2)}
          </div>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={handleRemove}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          aria-label={`Remove ${product.name} from cart`}
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
