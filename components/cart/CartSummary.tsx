'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, ArrowRight, Tag, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartSummary() {
  const { totalPrice, totalItems } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const subtotal = totalPrice;
  const freeShippingThreshold = 50;
  const standardShippingCost = 9.99;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingCost = isFreeShipping ? 0 : standardShippingCost;
  
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const estimatedTax = taxableAmount * 0.08;
  const finalTotal = taxableAmount + (subtotal > 0 ? shippingCost : 0) + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const code = promoCode.trim().toUpperCase();
    if (!code) {
      setPromoError('Please enter a coupon code.');
      return;
    }

    if (code === 'LUXE10' || code === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoSuccess('10% discount applied!');
    } else if (code === 'SAVE20' || code === 'LUXE20') {
      setDiscountPercent(20);
      setPromoSuccess('20% discount applied!');
    } else {
      setPromoError('Invalid promo code. Try "LUXE10" for 10% off.');
    }
  };

  const progressToFreeShipping = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="sticky top-24 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 transition-all">
      <h2 className="text-xl font-bold text-slate-900 mb-5">Order Summary</h2>

      {/* Free Shipping Progress Indicator */}
      {subtotal > 0 && subtotal < freeShippingThreshold && (
        <div className="mb-6 bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900 mb-1.5">
            <Truck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span>
              Add <span className="text-indigo-600 font-bold">${amountNeededForFreeShipping.toFixed(2)}</span> more to qualify for <span className="underline decoration-indigo-300">FREE Shipping</span>!
            </span>
          </div>
          <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>
      )}

      {subtotal >= freeShippingThreshold && subtotal > 0 && (
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl p-3">
          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Congratulations! You qualify for Free Standard Shipping.</span>
        </div>
      )}

      {/* Pricing Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
          <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
        </div>

        {discountPercent > 0 && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Discount ({discountPercent}%)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600">
          <span className="flex items-center gap-1.5">
            Shipping
            <span className="text-xs text-slate-400 font-normal">
              {isFreeShipping ? '(Free standard)' : '($50 threshold)'}
            </span>
          </span>
          <span className="font-semibold text-slate-900">
            {shippingCost === 0 ? (
              <span className="text-emerald-600 font-semibold">FREE</span>
            ) : (
              `$${shippingCost.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span className="flex items-center gap-1.5">
            Estimated Tax
            <span className="text-xs text-slate-400 font-normal">(8%)</span>
          </span>
          <span className="font-semibold text-slate-900">${estimatedTax.toFixed(2)}</span>
        </div>

        <div className="border-t border-slate-100 my-4" />

        <div className="flex justify-between items-baseline text-slate-900">
          <span className="text-base font-bold">Estimated Total</span>
          <div className="text-right">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              ${finalTotal.toFixed(2)}
            </span>
            <p className="text-[11px] text-slate-400">USD, taxes & shipping included</p>
          </div>
        </div>
      </div>

      {/* Promo Code Form */}
      <div className="mt-6 pt-6 border-t border-slate-100">
        <form onSubmit={handleApplyPromo} className="space-y-2">
          <label htmlFor="promo" className="block text-xs font-semibold text-slate-700">
            Have a promo code?
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="promo"
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="e.g. LUXE10"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent uppercase font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Apply
            </button>
          </div>
          {promoError && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{promoError}</p>
          )}
          {promoSuccess && (
            <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> {promoSuccess}
            </p>
          )}
        </form>
      </div>

      {/* Checkout Action Button */}
      <div className="mt-6 space-y-3">
        <Link
          href="/checkout"
          className={`btn-primary w-full group py-3.5 ${
            totalItems === 0 ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/shop"
          className="inline-flex items-center justify-center w-full py-2.5 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      {/* Trust Badges */}
      <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Secure Checkout</p>
            <p className="text-slate-400">256-bit SSL encrypted payment</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-600">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Free Fast Shipping</p>
            <p className="text-slate-400">Free delivery on orders over $50</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-600">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">30-Day Easy Returns</p>
            <p className="text-slate-400">Hassle-free return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
