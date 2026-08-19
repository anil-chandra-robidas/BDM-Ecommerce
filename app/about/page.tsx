import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Users,
  Globe,
  Heart,
  Target,
  Zap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Leaf,
  Layers,
  Smile,
  Clock,
  TrendingUp,
  CheckCircle2,
  Quote,
  Building2,
  Package,
} from 'lucide-react';

export const metadata = {
  title: 'About Us — LUXE Store',
  description:
    'Learn about LUXE Store, our mission to bring premium quality craftsmanship, sustainable design, and unmatched style to your lifestyle.',
};

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'Uncompromising Quality',
      description:
        'Every material, stitch, and finish is rigorously tested. We collaborate exclusively with master artisans and verified sustainable suppliers.',
      accent: 'from-amber-500/10 to-orange-500/10 text-amber-600',
    },
    {
      icon: Leaf,
      title: 'Mindful Sustainability',
      description:
        'We believe luxury should never cost the earth. 80%+ of our packaging is biodegradable, and our manufacturing partners adhere to strict zero-waste goals.',
      accent: 'from-emerald-500/10 to-teal-500/10 text-emerald-600',
    },
    {
      icon: Users,
      title: 'Global Community',
      description:
        'We design for modern tastemakers across the globe. Our customer-first community guides our seasonal releases and bespoke capsule collections.',
      accent: 'from-indigo-500/10 to-violet-500/10 text-indigo-600',
    },
    {
      icon: ShieldCheck,
      title: 'Authenticity Guaranteed',
      description:
        'All products come with genuine cryptographic certification and 100% manufacturer warranties for complete confidence.',
      accent: 'from-blue-500/10 to-cyan-500/10 text-blue-600',
    },
    {
      icon: Zap,
      title: 'Swift Worldwide Logistics',
      description:
        'Fast carbon-neutral shipping with localized warehouses in North America, Europe, and Asia for expedited arrival.',
      accent: 'from-purple-500/10 to-pink-500/10 text-purple-600',
    },
    {
      icon: Heart,
      title: 'Dedicated Concierge',
      description:
        '24/7 personalized stylist assistance, custom sizing recommendations, and white-glove customer care at every step.',
      accent: 'from-rose-500/10 to-red-500/10 text-rose-600',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Curated Products' },
    { value: '50,000+', label: 'Happy Customers' },
    { value: '100+', label: 'Designer Brands' },
    { value: '30+', label: 'Countries Served' },
  ];

  const milestones = [
    {
      year: '2021',
      title: 'The Inception',
      desc: 'Founded in New York with a mission to make luxury craftsmanship accessible, intentional, and ethical.',
    },
    {
      year: '2023',
      title: 'Global Flagships',
      desc: 'Expanded physical showrooms to London and Tokyo, scaling curated deliveries to over 20+ countries.',
    },
    {
      year: '2024',
      title: 'Zero-Waste Certification',
      desc: 'Achieved 100% carbon-neutral parcel logistics and 80%+ circular sustainable packaging across all lines.',
    },
    {
      year: '2026',
      title: 'Digital Atelier & Beyond',
      desc: 'Launched cutting-edge digital styling, real-time concierge, and instant personalized shopping experiences.',
    },
  ];

  const team = [
    {
      name: 'Sarah Jenkins',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format',
      initials: 'SJ',
      bio: 'Former luxury brand director with 15+ years revolutionizing modern digital retail.',
    },
    {
      name: 'Marcus Chen',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format',
      initials: 'MC',
      bio: 'Award-winning industrial & fashion designer obsessed with minimalism and ergonomic grace.',
    },
    {
      name: 'Elena Rostova',
      role: 'VP of Merchandising',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format',
      initials: 'ER',
      bio: 'Curator of global high-fashion collections with an eye for timeless modern aesthetic.',
    },
    {
      name: 'David Thorne',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format',
      initials: 'DT',
      bio: 'Pioneering seamless digital shopping experiences and ultra-secure global logistics.',
    },
  ];

  const pressQuotes = [
    {
      quote: 'LUXE Store has redefined the benchmark for modern e-commerce and curated elegance.',
      source: 'Vogue International',
    },
    {
      quote: 'The intersection of ethical sourcing, breathtaking design, and exceptional digital retail.',
      source: 'GQ Style Review',
    },
    {
      quote: 'A masterclass in customer-first luxury and seamless global fulfillment.',
      source: 'Forbes Lifestyle',
    },
  ];

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Breadcrumb */}
          <nav className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 bg-white/80 backdrop-blur-sm border border-slate-200/80 px-4 py-1.5 rounded-full shadow-sm">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-indigo-600 font-bold">About Us</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/60 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Elevating Daily Living</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none mb-6">
            Redefining Modern Luxury Through{' '}
            <span className="text-gradient">Our Story</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Founded on the belief that premium aesthetics and accessible elegance should go hand in hand. We bring you thoughtfully curated fashion, electronics, and home essentials.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="btn-primary py-3.5 px-7 text-sm inline-flex items-center gap-2 shadow-indigo-500/20"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-all text-sm"
            >
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>

        {/* Decorative ambient blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-300/20 to-violet-300/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      </section>

      {/* 2. Mission Section */}
      <section className="py-16 sm:py-24 border-t border-slate-100 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Column */}
            <div className="relative">
              <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&h=800&fit=crop&auto=format"
                  alt="LUXE Store Boutique Experience"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-indigo-600/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    Our Heritage
                  </span>
                  <p className="mt-2 text-lg font-bold">Craftsmanship, Innovation, Authenticity</p>
                </div>
              </div>

              {/* Decorative floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 hidden sm:flex items-center gap-4 max-w-xs animate-bounce-slow">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">100% Guaranteed</p>
                  <p className="text-xs text-slate-500">Every product verified for premium authenticity</p>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-indigo-600 font-semibold text-sm">
                <Target className="w-4 h-4" />
                <span>OUR MISSION & PHILOSOPHY</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Empowering your signature lifestyle with intentional design.
              </h2>

              <p className="text-slate-600 leading-relaxed text-base">
                At LUXE, we believe that true elegance lies in simplicity, endurance, and ethical creation. Born in 2021, LUXE Store set out to bridge the gap between unattainable haute couture and fast disposable commodities.
              </p>

              <p className="text-slate-600 leading-relaxed text-base">
                We scour the globe for artisans and innovative tech creators who obsess over details just as much as you do. Every product in our collection undergoes strict vetting for durability, tactile pleasure, and environmental impact.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Ethical Sourcing</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Fair wages & zero child labor</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Swift Logistics</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Carbon-neutral fast delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              What Drives Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
              Our Core Principles
            </h2>
            <p className="text-slate-500 mt-3 text-base">
              The fundamental pillars that define how we design, curate, and serve our global community every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="card p-8 group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative border border-slate-100 bg-white"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${val.accent} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Timeline / Milestones */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950 border border-indigo-800 px-3 py-1 rounded-full">
              Our Evolution
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-3 text-white">
              The LUXE Journey
            </h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              From an ambitious boutique workshop into a world-renowned digital lifestyle destination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl relative hover:border-indigo-500/50 transition-all group"
              >
                <div className="text-2xl font-black text-indigo-400 mb-2 group-hover:scale-105 transition-transform">
                  {item.year}
                </div>
                <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Stats Section (Full Width Gradient) */}
      <section className="bg-gradient-to-r from-indigo-600 to-violet-600 py-16 sm:py-20 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/15">
            {stats.map((stat, idx) => (
              <div key={idx} className="pt-6 md:pt-0 px-4">
                <div className="text-3xl sm:text-5xl font-black tracking-tight mb-2 drop-shadow-sm">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-indigo-100 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Press & Recognition */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Featured Across Industry Press
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pressQuotes.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-8 h-8 text-indigo-400 mb-4 opacity-50" />
                  <p className="text-slate-700 font-medium text-sm leading-relaxed mb-6 italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                <div className="font-extrabold text-xs text-slate-900 tracking-wider uppercase border-t border-slate-100 pt-4">
                  — {item.source}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Team Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
              Meet the Visionaries
            </h2>
            <p className="text-slate-500 mt-3 text-base">
              Passionate creators, curators, and engineers committed to building the future of premium retail.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all text-center group"
              >
                <div className="relative w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden border-4 border-indigo-50 shadow-md group-hover:scale-105 transition-transform">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                <p className="text-xs font-semibold text-indigo-600 mb-3">{member.role}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA Section */}
      <section className="py-16 sm:py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-16 text-center shadow-2xl">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start Exploring</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Join Our Journey & Discover Perfection
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Step into a curated world of timeless fashion, breakthrough tech, and luxury homeware designed for the way you live.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/shop"
                  className="btn-primary py-4 px-8 text-base shadow-indigo-500/30 inline-flex items-center justify-center gap-2"
                >
                  <span>Explore The Shop</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-md transition-all text-base border border-white/10"
                >
                  <span>Get In Touch</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
