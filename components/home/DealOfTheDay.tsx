'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, ArrowRight, Clock, Star, ShieldCheck } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function DealOfTheDay() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 14,
    minutes: 36,
    seconds: 45,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set target to 24 hours from initial mount for a dynamic live countdown
    const targetDate = new Date().getTime() + 24 * 60 * 60 * 1000 + 14 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white shadow-2xl p-8 sm:p-12 lg:p-16">
          {/* Background Ambient Glows */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-violet-400/20 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
            {/* Left Column: Product Image */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-white/10 backdrop-blur-sm group">
                <Image
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=700&fit=crop&auto=format"
                  alt="Wireless Bluetooth Headphones - Deal of the Day"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  <span>Save $50 (25% OFF)</span>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>4.7 (856 reviews)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Deal Information & Countdown */}
            <div className="flex flex-col space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider w-max">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>Deal of the Day</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Wireless Bluetooth Headphones Pro
              </h2>

              {/* Description */}
              <p className="text-indigo-100 text-base sm:text-lg leading-relaxed">
                Experience high-fidelity audio with active noise cancellation, 40-hour battery life, and ultra-comfortable memory foam earcups.
              </p>

              {/* Price Row */}
              <div className="flex items-baseline gap-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-white">
                  $149.99
                </span>
                <span className="text-xl sm:text-2xl text-indigo-200 line-through font-medium">
                  $199.99
                </span>
                <span className="bg-rose-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  LIMITED TIME
                </span>
              </div>

              {/* Countdown Timer */}
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-indigo-200 mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Offer ends in:</span>
                </p>
                <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md">
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 sm:p-4 text-center border border-white/20 shadow-inner">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white">
                      {mounted ? formatNumber(timeLeft.days) : '00'}
                    </div>
                    <div className="text-[10px] sm:text-xs uppercase font-semibold text-indigo-200 mt-1">
                      Days
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 sm:p-4 text-center border border-white/20 shadow-inner">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white">
                      {mounted ? formatNumber(timeLeft.hours) : '14'}
                    </div>
                    <div className="text-[10px] sm:text-xs uppercase font-semibold text-indigo-200 mt-1">
                      Hours
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 sm:p-4 text-center border border-white/20 shadow-inner">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white">
                      {mounted ? formatNumber(timeLeft.minutes) : '36'}
                    </div>
                    <div className="text-[10px] sm:text-xs uppercase font-semibold text-indigo-200 mt-1">
                      Mins
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 sm:p-4 text-center border border-white/20 shadow-inner">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white">
                      {mounted ? formatNumber(timeLeft.seconds) : '45'}
                    </div>
                    <div className="text-[10px] sm:text-xs uppercase font-semibold text-indigo-200 mt-1">
                      Secs
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/product/7"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-xl hover:bg-indigo-50 hover:-translate-y-0.5 transition-all duration-300 gap-2 text-base"
                >
                  <span>Shop This Deal</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>Free Express Delivery & Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
