# LUXE Store — Project Workflow & Development Agenda

Welcome to the **LUXE Store** development workspace. This document serves as the central source of truth for the project's architecture, workflows, and implementation agenda. Whether you are a human developer or an AI engineer, please adhere to these standards and structures.

---

## 1. Project Overview & Tech Stack

LUXE Store is a premium, modern e-commerce web application featuring high-end aesthetics, seamless client-side state transitions, responsive filtering, and modular components.

*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript (Strict Mode)
*   **Styling**: Tailwind CSS & Vanilla CSS (via `globals.css`)
*   **Icons**: Lucide React
*   **State Management**: React Context API (`CartContext`, `WishlistContext`) with local storage persistence.

---

## 2. Directory Architecture

```text
D:\ecomerce\
├───app\                       # Next.js App Router (Pages, Layouts, and Routing)
│   ├───about\                 # About Us page
│   ├───account\               # User Account/Profile dashboard
│   ├───cart\                  # Detailed Shopping Cart page
│   ├───checkout\              # Secure Checkout workflow
│   ├───contact\               # Customer Contact form
│   ├───product\[id]\          # Dynamic Product details, gallery & reviews
│   ├───shop\                  # Catalog page with high-performance filters
│   └───wishlist\              # User Wishlist page
├───components\                # Reusable React components
│   ├───cart\                  # Cart-specific drawer/item/summary UI elements
│   ├───home\                  # Landing page sections (Hero, Category, Featured, etc.)
│   ├───layout\                # Core page skeleton (Header, Footer, MegaMenu, MobileMenu)
│   ├───product\               # Catalog components (ProductCard, ProductGrid)
│   └───ui\                    # Shared interactive UI widgets (BackToTop, PageLoader)
├───context\                   # State management providers
│   ├───CartContext.tsx        # Add/Remove/Update items, recalculate totals & sync storage
│   └───WishlistContext.tsx    # Manage saved items list & toggle states
├───data\                      # Mock database / Static product data
│   └───products.ts            # Typed catalogue items, categories, and reviews
└───types\                     # Global TypeScript interfaces
    └───index.ts               # Definitions for Product, CartItem, WishlistItem, etc.
```

---

## 3. Core Development Workflows

### 3.1 Local Setup & Scripts
Verify and run standard ecosystem scripts from `package.json`:

*   **Install Dependencies**: `npm install`
*   **Development Server**: `npm run dev` (Runs locally at `http://localhost:3000`)
*   **Build Production**: `npm run build` (Type-checks, lint, and compiles static/server-rendered output)
*   **Lint Code**: `npm run lint` (ESLint analysis)

### 3.2 Iterative Engineering Lifecycle
When adding features or fixing bugs:
1.  **Research**: Locate relevant types, mock data, and existing components to preserve architectural patterns.
2.  **Strategy**: Plan the minimal footprint change. Verify type safety and styling compatibility before implementation.
3.  **Execution (Plan-Act-Validate)**:
    *   Make targeted, surgical edits to code.
    *   Add corresponding unit tests or mock behavior.
    *   Verify by running `npm run lint` or `npm run build` to catch compilation or styling issues early.

---

## 4. Key Architectural Patterns & Features

### 4.1 Global Context State Management
*   **Local Storage Syncing**: Both `CartContext` and `WishlistContext` hydrate their state on mount from `localStorage` using Client-Side React Effects (`useEffect`).
*   **Unambiguous Actions**: State transitions are handled using React `useReducer` to prevent conflicting updates (e.g. `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `CLEAR_CART`).

### 4.2 Dynamic Routing & Details
*   Dynamic pages like `app/product/[id]/page.tsx` parse the product ID from URL params and load corresponding mock data from `data/products.ts`.
*   Interactive features include color/size selection, review submittals, and multi-image galleries.

### 4.3 Catalog Filtering (`app/shop/page.tsx`)
*   Uses client-side filtering via search query matching (names, descriptions, tags) and multi-facet sliders (price range, rating, inventory status).
*   URL query params are synced with state for shareable filtered views.

---

## 5. Development Agenda & Future Roadmap

This list defines the planned milestones for upcoming iterations:

### Phase 1: Interactive & State Enhancement (Current Focus)
- [x] Complete landing page component sections.
- [x] Setup robust context providers for Wishlist and Cart with client persistence.
- [x] Build multi-faceted catalog filter workflow on the `/shop` route.
- [x] Integrate dynmic single product pages with size/color pickers and reviews.
- [x] Create visually detailed Cart and Checkout UI skeleton.

### Phase 2: Dynamic API & Server Integration
- [ ] Transition mock data in `data/products.ts` into a database-driven API (e.g., PostgreSQL, Prisma, MongoDB) and write Next.js Route Handlers (`app/api/products/route.ts`).
- [ ] Migrate client-side state hooks to react-query or SWR for Server-Side State caching.
- [ ] Implement Server Actions for form submittals (Checkout billing forms, Contact submissions).

### Phase 3: Auth & Account Dashboards
- [ ] Implement secure authentication using NextAuth.js or Clerk.
- [ ] Connect account dashboards to fetch past order histories, saved addresses, and active carts.
- [ ] Define user roles (Admin vs. Customer) for product/inventory dashboard management.

### Phase 4: Production Optimization & SEO
- [ ] Set up image optimization via Next.js `<Image>` component for external image CDNs.
- [ ] Tune PageSpeed insights: implement dynamic imports for large layouts (e.g., MobileMenu, MegaMenu).
- [ ] Add structured JSON-LD schema markup on `/product/[id]` pages for optimized SEO rich snippets.

---

## 6. Coding Standards & AI Guidelines

To maintain code excellence and prevent tech debt, follow these conventions:

*   **No Warning Suppressions**: Never use `// @ts-ignore` or `any` types. Instead, build proper type guards, declare interface extensions, or cast precisely if handling external payloads.
*   **Vanilla CSS Over Tailwind Hacks**: For custom transitions, complicated pseudo-selectors, or dynamic multi-stop gradients, define a clean class in `app/globals.css` instead of long inline Tailwind strings.
*   **Strict Composition**: Favor composition over inheritance. Break down complex landing page widgets into smaller, focused presentation/container components in `/components`.
*   **No Leftover Log Statements**: Ensure debug logs (`console.log`) are scrubbed before submitting changes. Use production-ready logger paradigms when required.
