'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CreditCard,
  Truck,
  Package,
  Check,
  ChevronRight,
  Lock,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  ShoppingBag,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface CheckoutFormData {
  // Shipping
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  shippingMethod: 'standard' | 'express' | 'overnight';

  // Payment
  paymentMethod: 'credit-card' | 'paypal' | 'apple-pay';
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  sameAsShipping: boolean;
  savePaymentInfo: boolean;
  orderNotes: string;
}

const initialFormData: CheckoutFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  apartment: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'United States',
  shippingMethod: 'standard',
  paymentMethod: 'credit-card',
  cardNumber: '',
  cardName: '',
  cardExpiry: '',
  cardCvv: '',
  sameAsShipping: true,
  savePaymentInfo: false,
  orderNotes: '',
};

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, isLoaded } = useCart();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Calculations
  const subtotal = totalPrice;
  const shippingCosts = {
    standard: subtotal >= 50 || subtotal === 0 ? 0 : 9.99,
    express: 15.0,
    overnight: 29.0,
  };
  const shippingCost = shippingCosts[formData.shippingMethod];
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shippingCost + tax;

  const steps = [
    { id: 0, title: 'Shipping', icon: Truck },
    { id: 1, title: 'Payment', icon: CreditCard },
    { id: 2, title: 'Review', icon: Package },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepIndex === 0) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Valid email is required';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.address.trim()) newErrors.address = 'Street address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State / Province is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP / Postal code is required';
    }

    if (stepIndex === 1) {
      if (formData.paymentMethod === 'credit-card') {
        if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
        if (!formData.cardNumber.trim()) {
          newErrors.cardNumber = 'Card number is required';
        } else if (formData.cardNumber.replace(/\s/g, '').length < 13) {
          newErrors.cardNumber = 'Invalid card number';
        }
        if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'MM/YY required';
        if (!formData.cardCvv.trim()) newErrors.cardCvv = 'CVV required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => Math.min(prev + 1, 2));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = () => {
    if (!validateStep(0) || !validateStep(1)) {
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement delay
    setTimeout(() => {
      const generatedOrderNum = `LX-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNum);
      setIsSubmitting(false);
      setIsOrderPlaced(true);
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  // If cart is empty and order wasn't just placed
  if (items.length === 0 && !isOrderPlaced) {
    return (
      <div className="min-h-[70vh] bg-slate-50/50 py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm p-8 text-center">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Cart is Empty</h2>
          <p className="text-slate-500 text-sm mb-6">
            You need to add items to your cart before proceeding to checkout.
          </p>
          <Link href="/shop" className="btn-primary w-full inline-flex items-center justify-center gap-2">
            <span>Browse Products</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Order Confirmed Success Screen
  if (isOrderPlaced) {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + (formData.shippingMethod === 'overnight' ? 1 : formData.shippingMethod === 'express' ? 3 : 5));

    return (
      <div className="bg-slate-50/60 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-fade-in">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 sm:p-12 text-center text-white relative">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-white/10 shadow-lg">
              <Check className="w-10 h-10 text-white stroke-[3]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">Order Confirmed!</h1>
            <p className="text-indigo-100 text-sm sm:text-base max-w-md mx-auto">
              Thank you for choosing BDM-Ecommerce. We&apos;ve received your order and are preparing it for shipment.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider">
              <span>ORDER NUMBER:</span>
              <span className="font-mono text-yellow-300">{orderNumber}</span>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            {/* Delivery estimate */}
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 sm:p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Estimated Delivery</h3>
                <p className="text-sm text-indigo-700 font-medium">
                  {deliveryDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Summary Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Shipping Address
                </h4>
                <p className="text-sm font-semibold text-slate-900">
                  {formData.firstName} {formData.lastName}
                </p>
                <p className="text-sm text-slate-600">{formData.address}</p>
                {formData.apartment && <p className="text-sm text-slate-600">{formData.apartment}</p>}
                <p className="text-sm text-slate-600">
                  {formData.city}, {formData.state} {formData.zipCode}
                </p>
                <p className="text-sm text-slate-600">{formData.country}</p>
                <p className="text-xs text-slate-500 mt-2">{formData.email}</p>
                <p className="text-xs text-slate-500">{formData.phone}</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Payment & Delivery Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Method:</span>
                    <span className="font-semibold text-slate-900 capitalize">
                      {formData.paymentMethod.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Shipping Service:</span>
                    <span className="font-semibold text-slate-900 capitalize">
                      {formData.shippingMethod} Delivery
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Paid:</span>
                    <span className="font-bold text-indigo-600">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Confirmation Sent To:</span>
                    <span className="font-medium text-slate-900 truncate max-w-[160px]">
                      {formData.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
              <Link
                href="/shop"
                className="btn-primary flex-1 py-3.5 text-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
              <Link
                href="/"
                className="btn-secondary flex-1 py-3.5 text-center justify-center"
              >
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Security Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <Link href="/" className="hover:text-indigo-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href="/cart" className="hover:text-indigo-600 transition-colors">
                Cart
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-800">Checkout</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Checkout</h1>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-3.5 py-2 rounded-xl">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted & Guaranteed Secure</span>
          </div>
        </div>

        {/* Step Navigation Indicator */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-8">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = activeStep > idx;
              const isCurrent = activeStep === idx;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    if (isCompleted) setActiveStep(idx);
                  }}
                  disabled={!isCompleted && !isCurrent}
                  className={`flex items-center justify-center gap-2 sm:gap-3 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                      : isCompleted
                      ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 cursor-pointer'
                      : 'bg-slate-50 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCurrent
                        ? 'bg-white text-indigo-600'
                        : isCompleted
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                  </span>
                  <span className="hidden sm:inline">{step.title}</span>
                  <Icon className="w-4 h-4 sm:hidden" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Form (Left) & Order Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Steps Forms */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* STEP 0: SHIPPING INFORMATION */}
            {activeStep === 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 animate-fade-in">
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Shipping Details</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Where should we deliver your order?</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        First Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="e.g. Eleanor"
                        className={`input-field ${errors.firstName ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                      />
                      {errors.firstName && (
                        <p className="text-xs text-rose-500 mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Last Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="e.g. Vance"
                        className={`input-field ${errors.lastName ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                      />
                      {errors.lastName && (
                        <p className="text-xs text-rose-500 mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="eleanor@example.com"
                        className={`input-field ${errors.email ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className={`input-field ${errors.phone ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Street Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Luxury Lane"
                      className={`input-field ${errors.address ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                    />
                    {errors.address && (
                      <p className="text-xs text-rose-500 mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* Apartment / Suite */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Apartment, suite, unit (optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      placeholder="Apt 4B"
                      className="input-field"
                    />
                  </div>

                  {/* City, State, Zip, Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        City <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                        className={`input-field ${errors.city ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                      />
                      {errors.city && (
                        <p className="text-xs text-rose-500 mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        State / Province <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="NY"
                        className={`input-field ${errors.state ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                      />
                      {errors.state && (
                        <p className="text-xs text-rose-500 mt-1">{errors.state}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        ZIP / Postal Code <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="10001"
                        className={`input-field ${errors.zipCode ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                      />
                      {errors.zipCode && (
                        <p className="text-xs text-rose-500 mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="input-field cursor-pointer"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                    </select>
                  </div>

                  {/* Shipping Method Options */}
                  <div className="pt-4 border-t border-slate-100">
                    <label className="block text-xs font-semibold text-slate-700 mb-3">
                      Select Shipping Method
                    </label>
                    <div className="space-y-3">
                      <label
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.shippingMethod === 'standard'
                            ? 'border-indigo-600 bg-indigo-50/40'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="standard"
                            checked={formData.shippingMethod === 'standard'}
                            onChange={handleInputChange}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Standard Delivery</p>
                            <p className="text-xs text-slate-500">4-6 Business Days</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          {subtotal >= 50 ? (
                            <span className="text-emerald-600 font-bold">FREE</span>
                          ) : (
                            '$9.99'
                          )}
                        </span>
                      </label>

                      <label
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.shippingMethod === 'express'
                            ? 'border-indigo-600 bg-indigo-50/40'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="express"
                            checked={formData.shippingMethod === 'express'}
                            onChange={handleInputChange}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Express Delivery</p>
                            <p className="text-xs text-slate-500">2-3 Business Days</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-slate-900">$15.00</span>
                      </label>

                      <label
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.shippingMethod === 'overnight'
                            ? 'border-indigo-600 bg-indigo-50/40'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="overnight"
                            checked={formData.shippingMethod === 'overnight'}
                            onChange={handleInputChange}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Next-Day Priority</p>
                            <p className="text-xs text-slate-500">1 Business Day (Order by 2PM EST)</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-slate-900">$29.00</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Step 0 Navigation */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/cart"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Cart</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary py-3 px-8"
                  >
                    <span>Continue to Payment</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1: PAYMENT INFORMATION */}
            {activeStep === 1 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 animate-fade-in">
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Payment Details</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Select and enter your payment method</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                </div>

                {/* Payment Methods Selection */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'credit-card' }))}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      formData.paymentMethod === 'credit-card'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
                    <span className="text-xs block">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'paypal' }))}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      formData.paymentMethod === 'paypal'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-base font-black text-blue-700 italic block mb-1">PayPal</span>
                    <span className="text-xs block">PayPal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'apple-pay' }))}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      formData.paymentMethod === 'apple-pay'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-base font-bold text-slate-900 block mb-1"> Pay</span>
                    <span className="text-xs block">Apple Pay</span>
                  </button>
                </div>

                {formData.paymentMethod === 'credit-card' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Name on Card <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="Eleanor Vance"
                        className={`input-field ${errors.cardName ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                      />
                      {errors.cardName && (
                        <p className="text-xs text-rose-500 mt-1">{errors.cardName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Card Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          maxLength={19}
                          value={formData.cardNumber}
                          onChange={(e) => {
                            // Format with spaces
                            const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                            setFormData((prev) => ({ ...prev, cardNumber: val }));
                          }}
                          placeholder="4532 0123 4567 8901"
                          className={`input-field font-mono ${errors.cardNumber ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                        />
                        <CreditCard className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
                      </div>
                      {errors.cardNumber && (
                        <p className="text-xs text-rose-500 mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Expiration (MM/YY) <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          maxLength={5}
                          value={formData.cardExpiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '');
                            if (val.length >= 2) {
                              val = val.substring(0, 2) + '/' + val.substring(2, 4);
                            }
                            setFormData((prev) => ({ ...prev, cardExpiry: val }));
                          }}
                          placeholder="12/28"
                          className={`input-field font-mono text-center ${errors.cardExpiry ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                        />
                        {errors.cardExpiry && (
                          <p className="text-xs text-rose-500 mt-1">{errors.cardExpiry}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          CVV / CVC <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            name="cardCvv"
                            maxLength={4}
                            value={formData.cardCvv}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              setFormData((prev) => ({ ...prev, cardCvv: val }));
                            }}
                            placeholder="•••"
                            className={`input-field font-mono text-center tracking-widest ${errors.cardCvv ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                          />
                          <Lock className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                        {errors.cardCvv && (
                          <p className="text-xs text-rose-500 mt-1">{errors.cardCvv}</p>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                        <input
                          type="checkbox"
                          name="sameAsShipping"
                          checked={formData.sameAsShipping}
                          onChange={handleInputChange}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Billing address is the same as shipping address</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                        <input
                          type="checkbox"
                          name="savePaymentInfo"
                          checked={formData.savePaymentInfo}
                          onChange={handleInputChange}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Securely save payment info for future purchases</span>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
                    <p className="text-sm text-slate-700 mb-2 font-medium">
                      You will be prompted to authenticate securely with{' '}
                      {formData.paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'} upon review.
                    </p>
                    <p className="text-xs text-slate-400">
                      No credentials will be stored on our servers.
                    </p>
                  </div>
                )}

                {/* Step 1 Navigation */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Shipping</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary py-3 px-8"
                  >
                    <span>Review Order</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: REVIEW & CONFIRM */}
            {activeStep === 2 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 animate-fade-in space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Review & Confirm</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Please review your order details before placing it</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                </div>

                {/* Review Shipping & Payment Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70 relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold uppercase text-slate-400">Ship To</span>
                      <button
                        type="button"
                        onClick={() => setActiveStep(0)}
                        className="text-xs text-indigo-600 hover:underline font-semibold"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">{formData.address}</p>
                    {formData.apartment && <p className="text-xs text-slate-600">{formData.apartment}</p>}
                    <p className="text-xs text-slate-600">
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{formData.phone}</p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70 relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold uppercase text-slate-400">Payment</span>
                      <button
                        type="button"
                        onClick={() => setActiveStep(1)}
                        className="text-xs text-indigo-600 hover:underline font-semibold"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 capitalize">
                      {formData.paymentMethod.replace('-', ' ')}
                    </p>
                    {formData.paymentMethod === 'credit-card' && (
                      <>
                        <p className="text-xs text-slate-600 font-mono mt-1">
                          •••• •••• •••• {formData.cardNumber.slice(-4) || '••••'}
                        </p>
                        <p className="text-xs text-slate-500">Expires {formData.cardExpiry || '••/••'}</p>
                      </>
                    )}
                    <p className="text-xs text-indigo-600 mt-2 font-medium capitalize">
                      Method: {formData.shippingMethod} Delivery
                    </p>
                  </div>
                </div>

                {/* Items in order list */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3">Items in your package</h3>
                  <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`}
                        className="p-3 sm:p-4 flex items-center gap-4 bg-white"
                      >
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-slate-900 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-slate-500">
                            Qty: {item.quantity}
                            {item.selectedColor && ` • ${item.selectedColor}`}
                            {item.selectedSize && ` • Size ${item.selectedSize}`}
                          </p>
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optional Order Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Order Delivery Instructions (Optional)
                  </label>
                  <textarea
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="e.g. Leave package by the side door, gate code #1234..."
                    className="input-field text-sm"
                  />
                </div>

                {/* Step 2 Navigation */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Payment</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="btn-primary py-3.5 px-8 text-base shadow-xl"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Place Order (${finalTotal.toFixed(2)})
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sticky Order Summary with Cart Items */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full">
                  {items.reduce((s, i) => s + i.quantity, 0)} items
                </span>
              </h3>

              {/* Items preview list */}
              <div className="max-h-64 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                {items.map((item) => (
                  <div
                    key={`summary-${item.product.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 bg-slate-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-slate-400">
                        {item.selectedColor || item.selectedSize ? `${item.selectedColor || ''} ${item.selectedSize || ''}` : item.product.category}
                      </p>
                    </div>
                    <span className="font-semibold text-slate-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculation list */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Shipping ({formData.shippingMethod})</span>
                  <span className="font-semibold text-slate-900">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 font-semibold">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="text-base font-bold text-slate-900">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                      ${finalTotal.toFixed(2)}
                    </span>
                    <p className="text-[11px] text-slate-400">USD, all taxes included</p>
                  </div>
                </div>
              </div>

              {/* Security info */}
              <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500 space-y-1.5 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Buyer Protection Guaranteed</span>
                </div>
                <p className="pl-6 text-[11px]">
                  Full refund if the item is not as described or not received.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
