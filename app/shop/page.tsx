'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  LayoutGrid,
  X,
  ChevronRight,
  RotateCcw,
  Star,
  Check,
  Filter,
  Loader2,
  ChevronDown,
} from 'lucide-react';
import { products, categories } from '@/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import { Product } from '@/types';

const ITEMS_PER_PAGE = 9;

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get('category') || 'all';
  const initialSearchParam = searchParams.get('search') || '';
  const initialSubParam = searchParams.get('sub') || '';

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearchParam);
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryParam);
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubParam);
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState<number>(3);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Reset pagination when any filter changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedCategory, selectedSubcategory, minPrice, maxPrice, inStockOnly, minRating, sortBy]);

  // Sync state if search params change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
    const sub = searchParams.get('sub');
    if (sub) setSelectedSubcategory(sub);
  }, [searchParams]);

  // Predefined price ranges
  const pricePresets: { label: string; min: number | ''; max: number | '' }[] = [
    { label: 'All Prices', min: '', max: '' },
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 to $100', min: 50, max: 100 },
    { label: '$100 to $200', min: 100, max: 200 },
    { label: '$200 & Above', min: 200, max: '' },
  ];

  // Check if a category matches
  const isCategoryMatch = (prodCategory: string, filterCat: string) => {
    if (!filterCat || filterCat === 'all') return true;
    const catObj = categories.find(
      (c) =>
        c.slug.toLowerCase() === filterCat.toLowerCase() ||
        c.name.toLowerCase() === filterCat.toLowerCase()
    );
    if (catObj) {
      return prodCategory.toLowerCase() === catObj.name.toLowerCase();
    }
    return prodCategory.toLowerCase() === filterCat.toLowerCase();
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesSubcat = product.subcategory.toLowerCase().includes(query);
        const matchesTag = product.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesSubcat && !matchesTag) {
          return false;
        }
      }

      // Category match
      if (!isCategoryMatch(product.category, selectedCategory)) {
        return false;
      }

      // Subcategory match
      if (selectedSubcategory) {
        const subSlug = selectedSubcategory.toLowerCase().replace('-', ' ');
        if (!product.subcategory.toLowerCase().includes(subSlug)) {
          return false;
        }
      }

      // Price filter
      if (minPrice !== '' && product.price < Number(minPrice)) {
        return false;
      }
      if (maxPrice !== '' && product.price > Number(maxPrice)) {
        return false;
      }

      // In Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          if (a.badge === 'New' && b.badge !== 'New') return -1;
          if (b.badge === 'New' && a.badge !== 'New') return 1;
          return b.id - a.id;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          if ((a.badge === 'Best Seller' || a.badge === 'Hot') && (b.badge !== 'Best Seller' && b.badge !== 'Hot')) return -1;
          if ((b.badge === 'Best Seller' || b.badge === 'Hot') && (a.badge !== 'Best Seller' && a.badge !== 'Hot')) return 1;
          return a.id - b.id;
      }
    });
  }, [searchQuery, selectedCategory, selectedSubcategory, minPrice, maxPrice, inStockOnly, minRating, sortBy]);

  // Paginated visible products
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 350);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSubcategory('');
    setMinPrice('');
    setMaxPrice('');
    setInStockOnly(false);
    setMinRating(0);
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedSubcategory !== '' ||
    minPrice !== '' ||
    maxPrice !== '' ||
    inStockOnly ||
    minRating > 0;

  // Selected Category Name helper
  const currentCategoryName = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'all') return 'All Categories';
    const cat = categories.find(
      (c) =>
        c.slug.toLowerCase() === selectedCategory.toLowerCase() ||
        c.name.toLowerCase() === selectedCategory.toLowerCase()
    );
    return cat ? cat.name : selectedCategory;
  }, [selectedCategory]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-indigo-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Shop</span>
            {selectedCategory !== 'all' && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white font-medium">{currentCategoryName}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {selectedCategory === 'all' ? 'Discover Our Collection' : currentCategoryName}
              </h1>
              <p className="text-indigo-200 mt-2 text-base max-w-xl">
                Explore handpicked premium essentials, trending styles, and innovative lifestyle products tailored for you.
              </p>
            </div>
            <div className="text-indigo-200 text-sm font-medium">
              Showing <span className="text-white font-bold">{filteredProducts.length}</span> products
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm sticky top-24 space-y-6">
              {/* Header & Clear */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
                  <h2 className="font-bold text-slate-900 text-lg">Filters</h2>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                )}
              </div>

              {/* Search */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                  Search
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="input-field pl-10 pr-9 py-2.5 text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">
                  Categories
                </label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedSubcategory('');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-indigo-50 text-indigo-600 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-xs text-slate-400">{products.length}</span>
                  </button>

                  {categories.map((cat) => {
                    const count = products.filter((p) => p.category === cat.name).length;
                    const isActive =
                      selectedCategory === cat.slug || selectedCategory === cat.name;
                    return (
                      <button
                        key={cat.slug}
                        onClick={() => {
                          setSelectedCategory(cat.slug);
                          setSelectedSubcategory('');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-600 font-semibold'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs text-slate-400">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">
                  Price Range
                </label>
                <div className="space-y-2 mb-3">
                  {pricePresets.map((preset, index) => {
                    const isSelected = minPrice === preset.min && maxPrice === preset.max;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setMinPrice(preset.min);
                          setMaxPrice(preset.max);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) =>
                        setMinPrice(e.target.value === '' ? '' : Number(e.target.value))
                      }
                      className="w-full pl-6 pr-2 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <span className="text-slate-400 text-xs">-</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) =>
                        setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))
                      }
                      className="w-full pl-6 pr-2 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">
                  Minimum Rating
                </label>
                <div className="space-y-1.5">
                  {[4, 3, 2].map((stars) => (
                    <button
                      key={stars}
                      onClick={() => setMinRating(minRating === stars ? 0 : stars)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                        minRating === stars
                          ? 'bg-amber-50 text-amber-900 font-semibold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < stars
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span>& Up</span>
                      </div>
                      {minRating === stars && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 select-none">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Product Area */}
          <main className="flex-1 min-w-0">
            {/* Top Toolbar */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
              {/* Mobile Filter Toggle & Count */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 font-medium rounded-xl text-sm hover:bg-indigo-100 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  {hasActiveFilters && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  )}
                </button>
                <span className="text-sm text-slate-500">
                  Showing <span className="font-semibold text-slate-900">{visibleProducts.length}</span> of{' '}
                  <span className="font-semibold text-slate-900">{filteredProducts.length}</span> products
                </span>
              </div>

              {/* Right Side: Sort & Grid View Controls */}
              <div className="flex items-center gap-3 ml-auto">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500 hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort products by"
                    className="bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="name-asc">Name: A to Z</option>
                  </select>
                </div>

                {/* Grid Columns Toggle */}
                <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl gap-1">
                  <button
                    onClick={() => setGridCols(2)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      gridCols === 2
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="2 Columns"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      gridCols === 3
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="3 Columns"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Badges */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-in">
                <span className="text-xs text-slate-500 font-medium">Active Filters:</span>

                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-100">
                    Category: {currentCategoryName}
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="hover:text-indigo-900"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {selectedSubcategory && (
                  <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-100">
                    Sub: {selectedSubcategory}
                    <button
                      onClick={() => setSelectedSubcategory('')}
                      className="hover:text-indigo-900"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">
                    &quot;{searchQuery}&quot;
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-slate-900"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {(minPrice !== '' || maxPrice !== '') && (
                  <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">
                    ${minPrice || 0} - ${maxPrice || '∞'}
                    <button
                      onClick={() => {
                        setMinPrice('');
                        setMaxPrice('');
                      }}
                      className="hover:text-slate-900"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {inStockOnly && (
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100">
                    In Stock Only
                    <button
                      onClick={() => setInStockOnly(false)}
                      className="hover:text-emerald-900"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {minRating > 0 && (
                  <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-100">
                    {minRating}+ Stars
                    <button
                      onClick={() => setMinRating(0)}
                      className="hover:text-amber-900"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                <button
                  onClick={handleClearFilters}
                  className="text-xs text-rose-500 hover:text-rose-600 font-semibold underline underline-offset-2 ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Product Grid */}
            <ProductGrid products={visibleProducts} columns={gridCols} />

            {/* Load More Section */}
            {filteredProducts.length > visibleCount && (
              <div className="mt-12 flex justify-center animate-fade-in">
                {/* Load More Button */}
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-600 hover:text-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 group"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Loading more items...</span>
                    </>
                  ) : (
                    <>
                      <span>Load More Products</span>
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}

            {filteredProducts.length > 0 &&
              visibleCount >= filteredProducts.length &&
              filteredProducts.length > ITEMS_PER_PAGE && (
                <div className="mt-12 text-center text-sm text-slate-400 font-medium animate-fade-in">
                  ✨ You&apos;ve viewed all {filteredProducts.length} products
                </div>
              )}
          </main>
        </div>
      </div>

      {/* Mobile Slide-Out Filters Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileFiltersOpen(false)}
          ></div>

          {/* Drawer Content */}
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-lg">Filters</h3>
              </div>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="input-field pl-9 py-2 text-sm"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">
                Categories
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubcategory('');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium ${
                    selectedCategory === 'all'
                      ? 'bg-indigo-50 text-indigo-600 font-semibold'
                      : 'text-slate-600'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-xs text-slate-400">{products.length}</span>
                </button>
                {categories.map((cat) => {
                  const count = products.filter((p) => p.category === cat.name).length;
                  const isActive =
                    selectedCategory === cat.slug || selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        setSelectedCategory(cat.slug);
                        setSelectedSubcategory('');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-600 font-semibold'
                          : 'text-slate-600'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-slate-400">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">
                Price Range
              </label>
              <div className="space-y-2 mb-3">
                {pricePresets.map((preset, index) => {
                  const isSelected = minPrice === preset.min && maxPrice === preset.max;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setMinPrice(preset.min);
                        setMaxPrice(preset.max);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium ${
                        isSelected
                          ? 'bg-indigo-600 text-white font-semibold'
                          : 'text-slate-600 bg-slate-50'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* In Stock */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex gap-3 mt-auto">
              <button
                onClick={handleClearFilters}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-md"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
