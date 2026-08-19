'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

function StatCounter({ target, suffix = '', duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);

      // Ease-out cubic curve
      const easeOut = 1 - Math.pow(1 - progressRatio, 3);
      const current = Math.floor(easeOut * target);

      setCount(current);

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    // Small initial delay so user sees the count-up after preloader finishes
    const timer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(updateCount);
    }, 600);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[85vh] flex items-center py-12 lg:py-20">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-violet-200/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Text */}
          <div className="flex flex-col items-start text-left space-y-6 max-w-2xl animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-700 text-sm font-semibold shadow-sm">
              <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span>New Collection 2024</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Discover Your{' '}
              <span className="text-gradient">Perfect Style</span> & Modern Living
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
              Explore our curated collection of luxury fashion, cutting-edge electronics, and lifestyle essentials. Designed for those who appreciate premium quality and timeless elegance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Link href="/shop" className="btn-primary gap-2 shadow-indigo-500/25">
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/shop?category=mens-fashion" className="btn-secondary gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
                <span>Explore Catalog</span>
              </Link>
            </div>

            {/* Value Props Pills */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-2">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-indigo-600" />
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-indigo-600" />
                <span>30-Day Returns</span>
              </div>
            </div>

            {/* Animated Stats Counter Row */}
            <div className="w-full pt-8 mt-4 border-t border-slate-200/80">
              <div className="grid grid-cols-3 gap-4 sm:gap-8">
                <div>
                  <div className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                    <StatCounter target={10} suffix="K+" duration={1600} />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Curated Products</div>
                </div>
                <div className="border-l border-slate-200 pl-4 sm:pl-8">
                  <div className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                    <StatCounter target={50} suffix="K+" duration={1800} />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Happy Customers</div>
                </div>
                <div className="border-l border-slate-200 pl-4 sm:pl-8">
                  <div className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                    <StatCounter target={100} suffix="+" duration={1700} />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Premium Brands</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Image */}
          <div className="relative flex items-center justify-center lg:justify-end animate-slide-up">
            {/* Decorative colored glow orbs */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-violet-400/20 rounded-full blur-2xl pointer-events-none" />

            {/* Main Showcase Image Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group w-full max-w-md lg:max-w-lg aspect-[6/7]">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=700&fit=crop&auto=format"
                alt="LUXE Store Collection Showcase"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

              {/* Floating Badge 1: Top Right Special Offer */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-white/50 flex items-center gap-2 animate-scale-in">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
                <span className="text-xs font-bold text-slate-800">Special 30% OFF</span>
              </div>

              {/* Floating Badge 2: Bottom Left Quality rating */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Top Rated</p>
                    <p className="text-sm font-bold text-slate-900">Luxury Lifestyle 2024</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    <span className="text-amber-500 font-bold text-xs">★</span>
                    <span className="text-xs font-bold text-slate-800">4.9 / 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
