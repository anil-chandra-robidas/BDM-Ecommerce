'use client';

import { useState } from 'react';
import {
  Mail,
  CheckCircle2,
  Send,
  Sparkles,
  ShieldCheck,
  Gift,
  Zap,
  Star,
  Tag,
  Flame,
} from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
    }, 600);
  };

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Banner Container */}
        <div className="relative rounded-3xl lg:rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-indigo-500/20 overflow-hidden">
          {/* Ambient Glows & Mesh Backdrop */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 animate-pulse-slow" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          {/* Floating Decorative Glass Badges (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5 absolute top-10 right-12 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 shadow-xl animate-float">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center shadow-md">
              <Tag className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-300">Instant Bonus</p>
              <p className="text-xs font-extrabold text-amber-300">15% OFF Code</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2.5 absolute bottom-10 left-12 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 shadow-xl animate-float [animation-delay:2s]">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-300">Weekly Perks</p>
              <p className="text-xs font-extrabold text-emerald-300">Early Access Drops</p>
            </div>
          </div>

          {/* Inner Content Grid */}
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Top Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-400/30 text-indigo-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
              <span>VIP Newsletter & Weekly Drops</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Never Miss a Trend.{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-violet-300 to-pink-300">
                Stay in the Loop.
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
              Get secret promotional codes, curated weekly edits, and first dibs on limited-edition releases.
            </p>

            {/* Value Highlights Pill Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <Gift className="w-4 h-4 text-amber-400" />
                <span>15% Off 1st Order</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>Secret Flash Sales</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>No Spam Guarantee</span>
              </div>
            </div>

            {/* Interactive Subscription Form */}
            <div className="mt-8 sm:mt-10 max-w-xl mx-auto">
              {isSubmitted ? (
                <div className="p-6 sm:p-7 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl sm:rounded-3xl backdrop-blur-md animate-scale-in flex flex-col sm:flex-row items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg">
                      Welcome to the LUXE VIP Club! 🎉
                    </h3>
                    <p className="text-emerald-200 text-xs sm:text-sm mt-0.5">
                      Your 15% promo code <strong className="text-white font-mono bg-emerald-800/60 px-2 py-0.5 rounded ml-1">LUXE15</strong> has been sent to your inbox.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="relative p-1.5 sm:p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col sm:flex-row gap-2"
                >
                  <div className="relative flex-1 flex items-center">
                    <Mail className="absolute left-4 w-5 h-5 text-indigo-300 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:ring-0 border-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:pointer-events-none shrink-0"
                  >
                    {isLoading ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Joining...</span>
                      </>
                    ) : (
                      <>
                        <span>Join & Claim 15%</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Social Proof Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 max-w-xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="w-7 h-7 rounded-full ring-2 ring-slate-900 bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
                    JD
                  </div>
                  <div className="w-7 h-7 rounded-full ring-2 ring-slate-900 bg-violet-500 flex items-center justify-center text-[10px] font-bold text-white">
                    SK
                  </div>
                  <div className="w-7 h-7 rounded-full ring-2 ring-slate-900 bg-pink-500 flex items-center justify-center text-[10px] font-bold text-white">
                    ML
                  </div>
                  <div className="w-7 h-7 rounded-full ring-2 ring-slate-900 bg-amber-500 flex items-center justify-center text-[10px] font-bold text-white">
                    +45k
                  </div>
                </div>
                <span className="text-slate-300 font-medium">Joined by 45,000+ members</span>
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-slate-300 font-semibold ml-1">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
