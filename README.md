# 🛍️ bdshop — Enterprise-Grade Modern E-Commerce Platform & Visual CMS

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-0.441-f97316?style=flat-square)](https://lucide.dev/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/arntech-anil/bdshop/pulls)

**bdshop** is an ultra-fast, responsive modern e-commerce platform and visual content management system (CMS) built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, and **Tailwind CSS**. It combines a refined shopping experience with a powerful, zero-code administrative studio.

---

## 📑 Table of Contents

1. [✨ Key Features Overview](#-key-features-overview)
2. [🖥️ Storefront Experience & Route Directory](#️-storefront-experience--route-directory)
3. [🛠️ Admin Dashboard & Visual CMS Deep Dive](#️-admin-dashboard--visual-cms-deep-dive)
4. [🏗️ Project Architecture & Directory Structure](#️-project-architecture--directory-structure)
5. [💾 State Management & Context Architecture](#-state-management--context-architecture)
6. [🧩 Data Models & TypeScript Interfaces](#-data-models--typescript-interfaces)
7. [🎨 Design System & Color Tokens](#-design-system--color-tokens)
8. [🚀 Getting Started & Installation](#-getting-started--installation)
9. [🧪 Available Scripts](#-available-scripts)
10. [🚢 Production Deployment & Docker Guide](#-production-deployment--docker-guide)
11. [🛡️ Troubleshooting & FAQ](#️-troubleshooting--faq)
12. [🗺️ Future Development Roadmap](#️-future-development-roadmap)
13. [🤝 Contributing & License](#-contributing--license)

---

## ✨ Key Features Overview

```
+-----------------------------------------------------------------------------+
|                                   BDSHOP                                    |
+--------------------------------------+--------------------------------------+
|          🛍️ STOREFRONT               |          🛠️ ADMIN CMS                |
+--------------------------------------+--------------------------------------+
| • Hero Showcase & Seasonal Ribbons   | • Real-Time Financial Analytics      |
| • Faceted Filter & Live Search       | • Inventory & Stock Management       |
| • Multi-Image Gallery Product Pages  | • Order Fulfillment Status Workflow  |
| • Persistent Cart & Slide-out Drawer | • Customer Spending Directory        |
| • Multi-Step Express Checkout        | • Live Header & Navigation Studio    |
| • Wishlist & Move-to-Cart Sync       | • Live Footer & Guarantees Studio    |
| • Customer Order History Portal      | • Visual Pages Builder (Home/About)  |
| • Global Showrooms & FAQs Hub        | • Storefront Config & Maintenance    |
+--------------------------------------+--------------------------------------+
```

### ⚡ Architectural Highlights
- **Next.js 14 App Router**: Hybrid rendering using React Server Components (RSC) and interactive Client Components.
- **Strict TypeScript Compliance**: Full static typing across products, cart line items, orders, customers, and CMS configurations.
- **Persistent LocalStorage State**: Shopping cart and user wishlist survive browser reloads with zero hydration mismatch errors.
- **Live Real-Time Previews**: Instant visual preview cards inside the admin panel reflecting navigation, header ribbons, hero banners, and footers in real time.
- **Mobile-First Responsive Layout**: Optimized for smartphones, tablets, laptops, and ultra-wide desktop monitors.

---

## 🖥️ Storefront Experience & Route Directory

### 🗺️ Storefront Route Matrix

| Route | Type | Description | Key Components |
| :--- | :--- | :--- | :--- |
| [`/`](file:///d:/ecomerce/app/page.tsx) | `Static (SSG)` | Storefront landing page with dynamic hero banner, categories, and testimonials | `HeroBanner`, `CategoryGrid`, `BestSellers`, `DealOfTheDay` |
| [`/shop`](file:///d:/ecomerce/app/shop/page.tsx) | `Static (SSG)` | Catalog browsing with category filters, price sliders, sorting, and view modes | `ProductGrid`, `ProductCard`, Filter Sidebar |
| [`/product/[id]`](file:///d:/ecomerce/app/product/[id]/page.tsx) | `Dynamic (SSR)` | Comprehensive product view with multi-image gallery, swatches, and reviews | Gallery thumbnails, Color/Size selectors, Reviews |
| [`/cart`](file:///d:/ecomerce/app/cart/page.tsx) | `Static (SSG)` | Full cart management page with shipping threshold progress & promo codes | `CartItem`, `CartSummary`, Promo Voucher Engine |
| [`/checkout`](file:///d:/ecomerce/app/checkout/page.tsx) | `Static (SSG)` | Multi-step checkout with address validation, shipping methods, and payments | 3-step checkout wizard, Order Summary Card |
| [`/wishlist`](file:///d:/ecomerce/app/wishlist/page.tsx) | `Static (SSG)` | Saved favorite products with 1-click move-to-cart functionality | Wishlist Item Grid, Quick Add actions |
| [`/account`](file:///d:/ecomerce/app/account/page.tsx) | `Static (SSG)` | Customer portal with order history tracking and delivery status badges | Order timeline, Profile editor, Address book |
| [`/about`](file:///d:/ecomerce/app/about/page.tsx) | `Static (SSG)` | Brand narrative, core sustainability values, leadership profiles, and milestones | Mission story, Team grid, Milestone timeline |
| [`/contact`](file:///d:/ecomerce/app/contact/page.tsx) | `Static (SSG)` | Global flagship showrooms, support SLA badge, FAQ accordion, and contact form | Showroom cards, FAQ accordion, Inquiry form |
| [`/admin`](file:///d:/ecomerce/app/admin/page.tsx) | `Static (SSG)` | Full administrative management dashboard and live Visual CMS builders | Admin Sidebar, Modals, Live Preview frames |

---

## 🛠️ Admin Dashboard & Visual CMS Deep Dive

Access the administrative interface at [`http://localhost:3000/admin`](http://localhost:3000/admin).

```
+----------------------------------------------------------------------------+
| [ADMIN DASHBOARD SIDEBAR]                 [ACTIVE WORKSPACE AREA]           |
|                                                                            |
| 📊 Overview                              • Real-Time Revenue Metrics       |
| 📦 Products (12)                          • Monthly Performance Charts      |
| 🛍️ Orders (6)                             • Product Catalog Editor & Modal  |
| 👥 Customers (6)                          • Order Fulfillment Dispatcher    |
|                                                                            |
| ▾ 🔝 Header & Footer                      • Header Live Preview Card        |
|    • Header & Navigation                  • Announcement Ribbon Controls    |
|    • Footer & Guarantees                  • MegaMenu Promotion Banner       |
|                                           • Footer 4-Column Configurator    |
| ▾ 📑 Pages                                                                 |
|    • Home Page                            • Home Hero & Flash Sale Builder  |
|    • About Us Page                        • Core Values & Team Profiles     |
|    • Contact Us Page                      • Flagship Showrooms & FAQs       |
|                                                                            |
| ⚙️ Settings                              • Currency & Maintenance Trigger   |
+----------------------------------------------------------------------------+
```

### 1. 📊 Executive Analytics & Metrics
- **Consolidated KPI Cards**: Total Revenue calculation with month-over-month growth, pending fulfillment counts, live active inventory, and 30-day active customer counters.
- **Revenue Stream Visualizer**: Interactive 8-month revenue bar chart with hover tooltips.
- **Sales by Category Donut**: Visual category unit sales breakdown (Fashion, Electronics, Accessories, Home).

### 2. 📦 Product Inventory Manager
- Add, edit, duplicate, and delete catalog items.
- Live **In-Stock / Out-of-Stock** toggle switch with instant storefront synchronization.
- Modal editor for selling price, original MSRP discount, category assignments, color swatches, sizes, and badge tags (`Best Seller`, `New`, `Sale`, `Popular`).

### 3. 🛍️ Order Dispatch & Fulfillment
- Order search by ID, customer name, or purchased item titles.
- Lifecycle state machine: `Pending` ➔ `Processing` ➔ `Shipped` ➔ `Delivered` ➔ `Cancelled`.
- Automatically increments customer order history and cumulative spending upon delivery.

### 4. 🔝 Header & Navigation Customizer
- **Interactive Live Header Preview**: Updates in real time as settings are toggled.
- **Announcement Ribbon**: Toggle visibility, customize promotion text, and configure coupon vouchers (`LUXE20`).
- **Brand Identity**: Store brand title (`LUXE`) and tagline badge label (`Store`).
- **Action Icons Selector**: Toggle visibility for Search, Wishlist, Account, and Cart icons.
- **Main Navigation Menu Manager**: List of menu items with **`+ Add Nav Item` modal** to configure custom routes.
- **MegaMenu Promo Banner**: Headline, description, and seasonal coupon code.

### 5. 🔻 Footer & Guarantees Customizer
- **Interactive Live Footer Preview**: Full 4-column layout rendering with social icons and payment badges.
- **Company Profile & Coordinates**: Bio narrative, physical address, support telephone, and support email.
- **Value Guarantees Customizer**: 4 customer pledges with **`+ Add Guarantee` modal**.
- **Quick Links Manager**: Configure navigation shortcuts with **`+ Add Quick Link` modal**.
- **Customer Service Links Manager**: Manage policy links with **`+ Add Service Link` modal**.
- **Social Media Hub**: Configurable links and visibility for Instagram, Twitter / X, Facebook, YouTube, and GitHub.
- **Payment Method Badges**: Checkbox selectors for Visa, Mastercard, Amex, PayPal, Apple Pay, and Google Pay.

### 6. 📑 Pages Visual Builder
- **🏠 Home Page Creator**:
  - Live interactive Home preview.
  - Hero banner controls (seasonal badge, main headline, narrative subtitle, CTA buttons, background image).
  - Flash sale & promotional card editor (discount percentage, coupon code).
  - Client testimonials manager with **`+ Add Testimonial` modal** (name, role, star rating, quote).
- **📄 About Us Page Creator**:
  - Header story and mission narrative.
  - Core values builder with **`+ Add Value` modal**.
  - Leadership team profiles builder with **`+ Add Team Member` modal** (name, role, avatar URL, biography).
  - Timeline journey builder with **`+ Add Milestone` modal** (year, title, description).
- **📬 Contact Us Page Creator**:
  - Support header and SLA response time badge.
  - Global flagship showrooms builder with **`+ Add Showroom` modal** (city, address, telephone, hours, bespoke services).
  - Support FAQs manager with **`+ Add FAQ` modal** (question, answer).

---

## 🏗️ Project Architecture & Directory Structure

```
bdshop/
├── app/
│   ├── about/
│   │   └── page.tsx            # About Us page: Mission, Values, Team, Milestones
│   ├── account/
│   │   └── page.tsx            # User portal: Order history, Addresses, Profile
│   ├── admin/
│   │   └── page.tsx            # Complete Admin Dashboard & Visual CMS
│   ├── cart/
│   │   └── page.tsx            # Dedicated shopping cart page
│   ├── checkout/
│   │   └── page.tsx            # 3-step checkout wizard with payments
│   ├── contact/
│   │   └── page.tsx            # Contact Us page: Showrooms, FAQ, Inquiry form
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx        # Dynamic product page: Gallery, Swatches, Reviews
│   ├── shop/
│   │   └── page.tsx            # Shop catalog: Faceted filters, Sorting, Search
│   ├── wishlist/
│   │   └── page.tsx            # User wishlist portal: Move-to-cart
│   ├── globals.css             # Tailwind base styles, animations, utilities
│   ├── layout.tsx              # Root layout: Header, Footer, Cart & Wishlist providers
│   ├── not-found.tsx           # Custom luxury 404 error page
│   └── page.tsx                # Storefront landing page
├── components/
│   ├── cart/
│   │   ├── CartItem.tsx        # Individual cart line item with quantity steppers
│   │   └── CartSummary.tsx     # Order subtotal, tax, free shipping bar, vouchers
│   ├── home/
│   │   ├── BestSellers.tsx     # Highest rated products showcase
│   │   ├── BlogSection.tsx     # Editorial inspiration & lifestyle articles
│   │   ├── CategoryGrid.tsx    # Curated department category tiles
│   │   ├── DealOfTheDay.tsx    # Flash sale card with countdown timer
│   │   ├── FeaturedProducts.tsx# Editor's picks product grid
│   │   ├── HeroBanner.tsx      # Main hero header with primary/secondary CTAs
│   │   ├── NewArrivals.tsx     # Latest catalog additions
│   │   ├── Newsletter.tsx      # Newsletter subscription card
│   │   └── Testimonials.tsx    # Customer reviews carousel
│   ├── layout/
│   │   ├── Footer.tsx          # Storefront footer with guarantees & columns
│   │   ├── Header.tsx          # Storefront header with search, cart, and mega-menu
│   │   ├── MegaMenu.tsx        # Multi-column dropdown catalog navigation
│   │   └── MobileMenu.tsx      # Mobile slide-out navigation menu
│   ├── product/
│   │   ├── ProductCard.tsx     # Reusable product card with quick-actions
│   │   └── ProductGrid.tsx     # Responsive product grid container
│   └── ui/
│       ├── BackToTop.tsx       # Smooth scroll-to-top floating button
│       └── PageLoader.tsx      # Luxury loading spinner animation
├── context/
│   ├── CartContext.tsx         # Cart state, LocalStorage sync, promo engine
│   └── WishlistContext.tsx     # Wishlist state, LocalStorage sync, toggle actions
├── data/
│   └── products.ts             # Default mock products, reviews, and categories
├── types/
│   └── index.ts                # TypeScript interfaces (Product, Order, Customer, etc.)
├── public/                     # Static images, favicon, icons
├── next.config.js              # Next.js optimization configuration
├── tailwind.config.ts          # Custom design system tokens & colors
├── tsconfig.json               # TypeScript compiler rules
└── package.json                # Project dependencies and script declarations
```

---

## 💾 State Management & Context Architecture

### 1. `CartContext` ([`context/CartContext.tsx`](file:///d:/ecomerce/context/CartContext.tsx))
Provides global cart operations across the entire component tree:
- `items: CartItem[]`: List of products, selected sizes, colors, and quantities.
- `addToCart(product, quantity?, selectedColor?, selectedSize?)`: Adds items or increments existing lines.
- `removeFromCart(productId, selectedColor?, selectedSize?)`: Deletes a specific variant line.
- `updateQuantity(productId, quantity, selectedColor?, selectedSize?)`: Modifies quantity with bounds checking.
- `clearCart()`: Empties cart.
- `subtotal`: Calculated item subtotal before discounts.
- `discount`: Applied coupon percentage discount (e.g. `20%` from `LUXE20`).
- `shipping`: Dynamic shipping rate based on threshold (`Free` over `$50`).
- `total`: Final payable invoice sum.
- `isCartOpen / setIsCartOpen`: Controls the global slide-out cart drawer.

### 2. `WishlistContext` ([`context/WishlistContext.tsx`](file:///d:/ecomerce/context/WishlistContext.tsx))
- `items: Product[]`: Array of user favorited items.
- `addToWishlist(product)`: Adds an item.
- `removeFromWishlist(productId)`: Removes an item.
- `isInWishlist(productId)`: Returns boolean check for heart icon state.
- `moveToCart(product)`: Transfers an item from wishlist to cart and removes from wishlist.

---

## 🧩 Data Models & TypeScript Interfaces

All core types are declared in [`types/index.ts`](file:///d:/ecomerce/types/index.ts):

```typescript
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  subcategory: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  colors?: string[];
  sizes?: string[];
  tags?: string[];
  badge?: string; // 'Best Seller' | 'New' | 'Sale' | 'Popular'
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  subcategories: string[];
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}
```

---

## 🎨 Design System & Color Tokens

bdshop utilizes a cohesive luxury palette built on Tailwind CSS utility classes:

| Color Role | Hex Code | Tailwind Token | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Brand** | `#4f46e5` | `bg-indigo-600` | Primary buttons, active badges, highlights |
| **Primary Hover** | `#4338ca` | `bg-indigo-700` | Hover states, active pressed states |
| **Deep Dark** | `#0f172a` | `bg-slate-900` | Dark navigation bars, footers, headers |
| **Light Canvas** | `#f8fafc` | `bg-slate-50` | Body background, card surfaces |
| **Success / In-Stock** | `#10b981` | `text-emerald-600` | In-stock pills, discounts, completed orders |
| **Warning / Rating** | `#f59e0b` | `text-amber-500` | Star ratings, flash sale badges, countdowns |
| **Danger / Out-of-Stock** | `#f43f5e` | `text-rose-600` | Remove actions, out of stock, cancelled |

---

## 🚀 Getting Started & Installation

### System Requirements
- **Node.js**: `v18.17.0` or later (LTS recommended)
- **Package Manager**: `npm` (bundled with Node) or `yarn` / `pnpm` / `bun`

### 1. Clone the Repository
```bash
git clone https://github.com/arntech-anil/bdshop.git
cd bdshop
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Visit the following URLs:
- 🌐 **Storefront**: [http://localhost:3000](http://localhost:3000)
- 🎛️ **Admin Studio**: [http://localhost:3000/admin](http://localhost:3000/admin)
- 📄 **About Us**: [http://localhost:3000/about](http://localhost:3000/about)
- 📬 **Contact Us**: [http://localhost:3000/contact](http://localhost:3000/contact)

---

## 🧪 Available Scripts

In the project root, you can run:

```bash
# Start development server with hot reload
npm run dev

# Run TypeScript type checks and create optimized production build
npm run build

# Start production server from compiled build
npm start

# Run ESLint to detect code syntax and style issues
npm run lint
```

---

## 🚢 Production Deployment & Docker Guide

### Deploying to Vercel (Recommended)
1. Push your code to GitHub.
2. Import your repository into [Vercel Dashboard](https://vercel.com/new).
3. Vercel automatically detects Next.js:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Click **Deploy**.

### Docker Containerization Setup

Create a `Dockerfile` in the root directory:

```dockerfile
# 1. Base image
FROM node:18-alpine AS base

# 2. Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 3. Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 4. Production Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

---

## 🛡️ Troubleshooting & FAQ

### Q1: Why do I see a 403 error when pushing to GitHub?
> **Answer**: Your local Git client has cached credentials for a different GitHub user. Remove the old credential in **Windows Credential Manager** (`git:https://github.com`) or use a Personal Access Token:
> ```bash
> git remote set-url origin https://<TOKEN>@github.com/arntech-anil/bdshop.git
> git push -u origin main
> ```

### Q2: How do I add new products to the catalogue?
> **Answer**: You can either:
> 1. Use the **Admin Dashboard** (`/admin`) ➔ Click **Products** ➔ **"+ Add Product"** modal.
> 2. Or add items directly to [`data/products.ts`](file:///d:/ecomerce/data/products.ts).

### Q3: How do coupon discount codes work?
> **Answer**: The checkout and cart summary accept the promo code `LUXE20` for an immediate 20% discount off total cart value. Additional promo vouchers can be configured in [`context/CartContext.tsx`](file:///d:/ecomerce/context/CartContext.tsx).

---

## 🗺️ Future Development Roadmap

- [ ] **Database Persistence**: Integrate PostgreSQL via Prisma ORM / Supabase for permanent multi-tenant storage.
- [ ] **Payment Gateways**: Connect live Stripe Checkout & PayPal SDK webhooks.
- [ ] **Authentication**: Implement NextAuth.js for OAuth (Google, GitHub, Apple ID) customer logins.
- [ ] **AI Concierge**: Integrate an AI product recommendation assistant & virtual stylist.
- [ ] **Internationalization (i18n)**: Multi-language translations (English, French, Japanese, Spanish) and multi-currency real-time forex conversions.

---

## 🤝 Contributing & License

Contributions, issues, and feature suggestions are welcome!

1. Fork the repository (`https://github.com/arntech-anil/bdshop/fork`).
2. Create your feature branch: `git checkout -b feature/amazing-feature`.
3. Commit your changes: `git commit -m 'feat: add amazing feature'`.
4. Push to branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

Distributed under the **MIT License**. See `LICENSE` for more information.

---

**Built with ❤️ for bdshop.**