'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Ultimate Guide to Building a Capsule Wardrobe',
    excerpt:
      'Discover how to create a versatile wardrobe with just 30 essential pieces that mix and match effortlessly for any occasion.',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop&auto=format',
    category: 'Fashion',
    author: 'Sarah Mitchell',
    date: 'Aug 15, 2024',
    readTime: '6 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'Top 10 Tech Gadgets You Need This Summer',
    excerpt:
      'From noise-cancelling earbuds to portable speakers, these are the must-have tech accessories for your summer adventures.',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format',
    category: 'Technology',
    author: 'James Cooper',
    date: 'Aug 12, 2024',
    readTime: '5 min read',
    featured: false,
  },
  {
    id: 3,
    title: 'Transform Your Space: Minimalist Home Decor Trends',
    excerpt:
      'Explore the latest minimalist design trends that bring calm and elegance to any living space without breaking the bank.',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&auto=format',
    category: 'Home & Living',
    author: 'Emma Laurent',
    date: 'Aug 10, 2024',
    readTime: '4 min read',
    featured: false,
  },
  {
    id: 4,
    title: 'Sustainable Shopping: How to Make Eco-Friendly Choices',
    excerpt:
      'Learn practical tips for making sustainable purchasing decisions that benefit both the planet and your personal style.',
    image:
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop&auto=format',
    category: 'Lifestyle',
    author: 'Olivia Chen',
    date: 'Aug 8, 2024',
    readTime: '7 min read',
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  Fashion: 'bg-pink-100 text-pink-700',
  Technology: 'bg-blue-100 text-blue-700',
  'Home & Living': 'bg-emerald-100 text-emerald-700',
  Lifestyle: 'bg-amber-100 text-amber-700',
};

export default function BlogSection() {
  const [featured, ...rest] = blogPosts;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
              Our Blog
            </span>
            <h2 className="section-title">Latest Stories & Tips</h2>
            <p className="section-subtitle">
              Insights, trends, and inspiration from our team
            </p>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors shrink-0"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Post (Large) */}
          <Link href="/shop" className="group block">
            <article className="relative h-full bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      categoryColors[featured.category] || 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {featured.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600 text-white">
                    Featured
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-slate-200 text-sm line-clamp-2">
                    {featured.excerpt}
                  </p>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {featured.author}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readTime}
                  </span>
                </div>
              </div>
            </article>
          </Link>

          {/* Smaller Posts */}
          <div className="flex flex-col gap-6">
            {rest.map((post) => (
              <Link href="/shop" key={post.id} className="group block">
                <article className="flex gap-5 bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 p-4">
                  <div className="relative w-36 sm:w-44 shrink-0 aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1 min-w-0">
                    <div>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${
                          categoryColors[post.category] || 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {post.category}
                      </span>
                      <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 text-sm sm:text-base">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1 line-clamp-2 hidden sm:block">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
