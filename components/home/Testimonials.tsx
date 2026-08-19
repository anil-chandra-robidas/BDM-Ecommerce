'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  Star,
  Quote,
  CheckCircle2,
  ThumbsUp,
  Sparkles,
  ShieldCheck,
  Award,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  location: string;
  content: string;
  rating: number;
  verified: boolean;
  productName: string;
  productImage: string;
  date: string;
  helpfulCount: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Fashion Blogger',
    location: 'New York, USA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format',
    content:
      'The leather jacket I ordered exceeded every expectation! The tailoring is impeccable, the leather smells authentic and soft, and customer service helped me nail the exact size.',
    rating: 5,
    verified: true,
    productName: 'Classic Leather Jacket',
    productImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop&auto=format',
    date: '3 days ago',
    helpfulCount: 48,
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Tech Creator',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format',
    content:
      'Fast shipping and authentic premium products. The wireless headphones deliver studio-quality acoustic depth and the noise cancellation is easily on par with flagship $400 pairs.',
    rating: 5,
    verified: true,
    productName: 'Wireless Bluetooth Headphones',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&auto=format',
    date: '1 week ago',
    helpfulCount: 36,
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Interior Stylist',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&auto=format',
    content:
      'LUXE has become my number one destination for curated home accents. Everything arrives in luxurious bespoke packaging and the quality feels timeless.',
    rating: 5,
    verified: true,
    productName: 'Luxury Throw Blanket',
    productImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop&auto=format',
    date: '2 weeks ago',
    helpfulCount: 29,
  },
  {
    id: 4,
    name: 'Marcus Vance',
    role: 'Marathon Runner',
    location: 'Austin, TX',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format',
    content:
      'The Running Shoes Ultra give insane energy return on 15k runs. Zero blisters straight out of the box and the grip on wet roads is fantastic.',
    rating: 5,
    verified: true,
    productName: 'Running Shoes Ultra',
    productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&auto=format',
    date: '3 weeks ago',
    helpfulCount: 42,
  },
  {
    id: 5,
    name: 'Chloe Bennett',
    role: 'Creative Director',
    location: 'Toronto, Canada',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&auto=format',
    content:
      'The Mulberry Silk Blouse feels like second skin. It transitions effortlessly from afternoon boardroom pitches to evening cocktails. 10/10.',
    rating: 5,
    verified: true,
    productName: 'Silk Blouse',
    productImage: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=200&h=200&fit=crop&auto=format',
    date: '1 month ago',
    helpfulCount: 51,
  },
  {
    id: 6,
    name: 'Liam Gallagher',
    role: 'Architect',
    location: 'Chicago, IL',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format',
    content:
      'The minimalist desk lamp is an aesthetic masterpiece. The touch dimmer and built-in wireless charging pad cleared all clutter from my workstation.',
    rating: 5,
    verified: true,
    productName: 'Minimalist Desk Lamp',
    productImage: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=200&h=200&fit=crop&auto=format',
    date: '1 month ago',
    helpfulCount: 38,
  },
];

const metrics = [
  { label: 'Overall Rating', value: '4.9 / 5', icon: Star, desc: 'Based on 15,000+ reviews' },
  { label: 'Verified Buyers', value: '99.4%', icon: ShieldCheck, desc: 'Recommend LUXE to friends' },
  { label: 'Fast Delivery', value: '2-3 Days', icon: Award, desc: 'Average shipping time' },
  { label: 'Happy Customers', value: '50k+', icon: HeartHandshake, desc: 'Worldwide shopping family' },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [likes, setLikes] = useState<Record<number, number>>({
    1: 48,
    2: 36,
    3: 29,
    4: 42,
    5: 51,
    6: 38,
  });

  // Calculate items visible per page based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, handleNext]);

  const handleLike = (id: number) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-50 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Carousel Navigation Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/90 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Real Reviews from Verified Shoppers</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              What Our Customers Say
            </h2>

            <p className="text-slate-600 text-base sm:text-lg mt-2 leading-relaxed">
              Discover genuine feedback from style enthusiasts worldwide
            </p>
          </div>

          {/* Carousel Control Buttons (Desktop) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 shadow-sm transition-all"
              title={isAutoPlaying ? 'Pause autoplay' : 'Play autoplay'}
              aria-label={isAutoPlaying ? 'Pause autoplay' : 'Play autoplay'}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={handlePrev}
              className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 shadow-sm hover:shadow-md transition-all active:scale-95 group"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 shadow-sm hover:shadow-md transition-all active:scale-95 group"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Carousel Slider Track Container */}
        <div
          className="overflow-hidden mb-12"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="px-3 shrink-0 flex flex-col"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-indigo-100 flex flex-col justify-between h-full relative group">
                  {/* Top: Star rating & Quote icon */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100/80">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-amber-400 fill-amber-400"
                          />
                        ))}
                        <span className="text-xs font-bold text-amber-900 ml-1">5.0</span>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                        <Quote className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Review text */}
                    <p className="text-slate-700 leading-relaxed text-sm sm:text-base mb-6 line-clamp-4">
                      &ldquo;{item.content}&rdquo;
                    </p>

                    {/* Verified purchase product pill */}
                    <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-2xl border border-slate-100 mb-6 group-hover:bg-indigo-50/50 transition-colors">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white shadow-sm shrink-0">
                        <Image
                          src={item.productImage}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                          Verified Purchase
                        </p>
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {item.productName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: User avatar & helpful counter */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-2xl overflow-hidden ring-2 ring-indigo-100 shadow-sm shrink-0">
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                          {item.verified && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 font-medium">{item.location}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLike(item.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-200 transition-all active:scale-95"
                      title="Mark as helpful"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{likes[item.id]}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mb-16">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'w-8 bg-indigo-600 shadow-md shadow-indigo-600/30'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Proof Metrics Stats Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center p-3 relative last:border-none lg:border-r border-slate-100"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{metric.value}</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">{metric.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{metric.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
