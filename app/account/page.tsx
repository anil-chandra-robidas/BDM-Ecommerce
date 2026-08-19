'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  Shield,
  Bell,
  Eye,
  ArrowRight,
  ExternalLink,
  Edit3,
  Plus,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'addresses' | 'payment' | 'settings'>('dashboard');
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  // Mock user details
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&auto=format',
    joined: 'January 2024',
    tier: 'Gold Member',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Mock order history
  const orders = [
    {
      id: 'ORD-98234',
      date: 'Aug 14, 2024',
      total: 279.98,
      status: 'Delivered',
      itemsCount: 2,
      items: [
        {
          name: 'Classic Leather Jacket',
          price: 199.99,
          image: products[0].image,
          color: 'Black',
          size: 'L',
        },
        {
          name: 'Slim Fit Denim Jeans',
          price: 79.99,
          image: products[1].image,
          color: 'Dark Blue',
          size: '32',
        },
      ],
    },
    {
      id: 'ORD-97412',
      date: 'Jul 28, 2024',
      total: 149.99,
      status: 'In Transit',
      itemsCount: 1,
      items: [
        {
          name: 'Wireless Bluetooth Headphones',
          price: 149.99,
          image: products[6].image,
          color: 'Matte Black',
          size: 'One Size',
        },
      ],
    },
    {
      id: 'ORD-96105',
      date: 'Jun 19, 2024',
      total: 89.99,
      status: 'Delivered',
      itemsCount: 1,
      items: [
        {
          name: 'Floral Summer Dress',
          price: 89.99,
          image: products[3].image,
          color: 'Floral Blue',
          size: 'M',
        },
      ],
    },
  ];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-medium">My Account</span>
        </nav>

        {/* Top Profile Summary Header Card */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-100/60 via-violet-50/40 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            {/* Avatar */}
            <div className="relative group shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-indigo-50 shadow-md relative">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              </div>
              <button
                className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-colors"
                title="Change Avatar"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {profile.name}
                </h1>
                <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full shadow-sm">
                  {profile.tier}
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-4">
                {profile.email} • {profile.phone}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-medium text-slate-600">
                <span className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  Member since {profile.joined}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Customer
                </span>
              </div>
            </div>

            {/* Quick Actions / Balance */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-2">
              <div className="text-left sm:text-right">
                <p className="text-xs text-slate-400">Reward Points</p>
                <p className="text-2xl font-extrabold text-indigo-600">1,450 pts</p>
              </div>
              <Link
                href="/shop"
                className="btn-primary text-xs !py-2 !px-4 shrink-0"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Main Grid: Sidebar Tabs + Active Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm sticky top-28 space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'orders'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4" />
                  <span>My Orders</span>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === 'orders'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {orders.length}
                </span>
              </button>

              <Link
                href="/wishlist"
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-rose-600 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>My Wishlist</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-50 text-rose-600">
                  {wishlistItems.length}
                </span>
              </Link>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'addresses'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Addresses</span>
              </button>

              <button
                onClick={() => setActiveTab('payment')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'payment'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Payment Methods</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'settings'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </button>

              <div className="pt-4 mt-2 border-t border-slate-100">
                <Link
                  href="/"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* 1. DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-fade-in">
                {/* Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                      <Package className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-slate-500">Total Orders</p>
                    <p className="text-xl font-bold text-slate-900 mt-0.5">{orders.length}</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                      <Heart className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-slate-500">Wishlist Items</p>
                    <p className="text-xl font-bold text-slate-900 mt-0.5">{wishlistItems.length}</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-slate-500">Cart Items</p>
                    <p className="text-xl font-bold text-slate-900 mt-0.5">{cartItems.length}</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-slate-500">Saved Addresses</p>
                    <p className="text-xl font-bold text-slate-900 mt-0.5">2</p>
                  </div>
                </div>

                {/* Recent Orders Section */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
                      <p className="text-xs text-slate-500">View and track your previous purchases</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
                    >
                      View All
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {orders.slice(0, 2).map((order) => (
                      <div key={order.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex -space-x-3 overflow-hidden">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="relative w-12 h-12 rounded-xl overflow-hidden ring-2 ring-white shadow-sm shrink-0">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                              </div>
                            ))}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">{order.id}</span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  order.status === 'Delivered'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                    : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Placed on {order.date} • {order.itemsCount} {order.itemsCount === 1 ? 'item' : 'items'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <span className="text-sm font-bold text-slate-900">
                            ${order.total.toFixed(2)}
                          </span>
                          <button
                            onClick={() => setActiveTab('orders')}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended For You */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Recommended For You</h2>
                      <p className="text-xs text-slate-500">Handpicked based on your preferences</p>
                    </div>
                    <Link
                      href="/shop"
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
                    >
                      Browse Store
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {products.slice(0, 3).map((item) => (
                      <Link
                        key={item.id}
                        href={`/product/${item.id}`}
                        className="group flex flex-col bg-slate-50 rounded-xl p-3 hover:bg-indigo-50/50 transition-colors"
                      >
                        <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-xs font-semibold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs font-bold text-slate-900 mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Order History</h2>
                      <p className="text-xs text-slate-500">Track and manage all your past orders</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                      {orders.length} total orders
                    </span>
                  </div>

                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-slate-200/80 rounded-2xl overflow-hidden hover:border-indigo-200 transition-colors"
                      >
                        {/* Order Header */}
                        <div className="bg-slate-50 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/60">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-xs text-slate-400 font-medium">Order ID</p>
                              <p className="text-sm font-bold text-slate-900">{order.id}</p>
                            </div>
                            <div className="hidden sm:block">
                              <p className="text-xs text-slate-400 font-medium">Date Placed</p>
                              <p className="text-sm font-semibold text-slate-700">{order.date}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                                order.status === 'Delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-indigo-100 text-indigo-800'
                              }`}
                            >
                              {order.status === 'Delivered' ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Truck className="w-3.5 h-3.5 text-indigo-600" />
                              )}
                              {order.status}
                            </span>
                            <span className="text-base font-extrabold text-slate-900">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-4 sm:p-5 divide-y divide-slate-100">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                                  <p className="text-xs text-slate-500 mt-0.5">
                                    Color: {item.color} • Size: {item.size}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-slate-900">${item.price.toFixed(2)}</p>
                                <span className="text-xs text-slate-400">Qty: 1</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer Actions */}
                        <div className="bg-slate-50/50 p-4 px-5 flex items-center justify-between gap-4 border-t border-slate-100">
                          <span className="text-xs text-slate-500">Standard Shipping</span>
                          <div className="flex items-center gap-2">
                            <Link
                              href="/shop"
                              className="text-xs font-semibold px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                            >
                              Buy Again
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Saved Addresses</h2>
                      <p className="text-xs text-slate-500">Manage your shipping and billing destinations</p>
                    </div>
                    <button className="btn-primary text-xs !py-2 !px-4 inline-flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" />
                      Add New Address
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Default Shipping */}
                    <div className="border-2 border-indigo-600/30 bg-indigo-50/20 rounded-2xl p-5 relative">
                      <span className="inline-block px-2.5 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full mb-3">
                        Default Shipping
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">Alex Johnson</h4>
                      <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                        742 Evergreen Terrace, Apt 4B<br />
                        Springfield, OR 97477<br />
                        United States
                      </p>
                      <p className="text-xs text-slate-500 mt-2 font-medium">
                        Phone: +1 (555) 234-5678
                      </p>
                      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-indigo-100">
                        <button className="text-xs font-semibold text-indigo-600 hover:underline">
                          Edit
                        </button>
                      </div>
                    </div>

                    {/* Secondary Address */}
                    <div className="border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors">
                      <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-full mb-3">
                        Office / Work
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">Alex Johnson</h4>
                      <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                        100 Silicon Way, Suite 300<br />
                        San Francisco, CA 94107<br />
                        United States
                      </p>
                      <p className="text-xs text-slate-500 mt-2 font-medium">
                        Phone: +1 (555) 987-6543
                      </p>
                      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-100">
                        <button className="text-xs font-semibold text-indigo-600 hover:underline">
                          Edit
                        </button>
                        <span className="text-slate-300">•</span>
                        <button className="text-xs font-semibold text-slate-500 hover:text-indigo-600">
                          Set as Default
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. PAYMENT METHODS TAB */}
            {activeTab === 'payment' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Payment Methods</h2>
                      <p className="text-xs text-slate-500">Securely saved credit cards & digital payment options</p>
                    </div>
                    <button className="btn-primary text-xs !py-2 !px-4 inline-flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" />
                      Add Card
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Card 1 */}
                    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
                      <div className="flex justify-between items-start mb-8">
                        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
                          Primary Card
                        </span>
                        <span className="text-lg font-bold italic tracking-wider">VISA</span>
                      </div>
                      <p className="text-lg tracking-widest font-mono mb-4">•••• •••• •••• 4242</p>
                      <div className="flex justify-between items-end text-xs text-slate-300">
                        <div>
                          <p className="text-[10px] uppercase text-slate-400">Card Holder</p>
                          <p className="font-semibold">{profile.name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-slate-400">Expires</p>
                          <p className="font-semibold">08/27</p>
                        </div>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gradient-to-br from-indigo-700 via-violet-800 to-purple-900 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
                      <div className="flex justify-between items-start mb-8">
                        <span className="text-xs font-semibold uppercase tracking-widest text-purple-200">
                          Secondary
                        </span>
                        <span className="text-lg font-bold italic tracking-wider">Mastercard</span>
                      </div>
                      <p className="text-lg tracking-widest font-mono mb-4">•••• •••• •••• 8819</p>
                      <div className="flex justify-between items-end text-xs text-slate-200">
                        <div>
                          <p className="text-[10px] uppercase text-slate-400">Card Holder</p>
                          <p className="font-semibold">{profile.name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-slate-400">Expires</p>
                          <p className="font-semibold">11/26</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                  <div className="mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                    <p className="text-xs text-slate-500">Update your account profile and contact details</p>
                  </div>

                  {savedSuccess && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-xl flex items-center gap-2 animate-fade-in">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      Changes saved successfully!
                    </div>
                  )}

                  <form onSubmit={handleProfileUpdate} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="input-field"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="input-field"
                      />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary text-xs !py-2.5 !px-6">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
