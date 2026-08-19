# 🚀 ThemeForest Item Submission & Upload Guide

This step-by-step guide will help you upload and publish **BDM-Ecommerce** to ThemeForest as an Envato Author.

---

## 1. Item Submission Metadata

When creating your new item submission on ThemeForest:

| Field | Recommended Value |
| :--- | :--- |
| **Category** | `Site Templates / Retail / Shopping` OR `Site Templates / React / Next.js / eCommerce` |
| **Name / Title** | `BDM-Ecommerce - Luxury Modern E-Commerce Next.js 14 Template with Admin CMS & Page Builder` |
| **Price Suggestion** | **$24 – $29** (Regular License) / **$600 – $800** (Extended License) |
| **Compatible Browsers** | Chrome, Firefox, Safari, Edge, Opera |
| **Compatible With** | React 18.x, Next.js 14.x, Tailwind CSS 3.x, TypeScript 5.x |
| **Framework** | React, Next.js |
| **Software Version** | Next.js 14.2.x, React 18.3.x, TypeScript 5.x |
| **Files Included** | TypeScript (`.ts`, `.tsx`), JavaScript (`.js`), CSS, HTML (Documentation) |
| **Columns** | 4+ |
| **Layout** | Responsive |
| **Demo URL** | Your Vercel live deployment link (e.g. `https://your-bdm-ecommerce.vercel.app`) |

---

## 2. Recommended 15 Tags (Keywords)

Copy and paste these exact tags into the ThemeForest tag input field:
```
nextjs, react, ecommerce, tailwind, typescript, admin dashboard, page builder, shopping cart, luxury, fashion store, responsive, cms, checkout, app router, modern
```

---

## 3. Required Image Assets for ThemeForest

Envato requires the following 3 graphical assets in your upload form:

1. **Thumbnail (`thumbnail.png` / `thumbnail.jpg`)**:
   - Exact Dimensions: **`80 × 80 px`**
   - Content: Logo/Icon for BDM-Ecommerce.
2. **Inline Preview Image (`preview.png` / `preview.jpg`)**:
   - Exact Dimensions: **`590 × 300 px`**
   - Content: High-impact hero snapshot of the storefront and admin dashboard.
3. **Main File (ZIP)**:
   - Your compiled `BDM-Ecommerce-package.zip` (see packaging guide below).

---

## 4. How to Create the Final ThemeForest Download ZIP

Your final downloadable ZIP file submitted to ThemeForest should be structured like this:

```
BDM-Ecommerce-package.zip/
├── bdm-ecommerce-source/
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── public/
│   ├── types/
│   ├── next.config.js
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── README.md
└── documentation/
    └── index.html
```

> [!IMPORTANT]
> **DO NOT** include `node_modules` or the `.next` build folder in the downloadable zip. They inflate file size and cause automated rejection.

---

## 5. Description Box HTML

Open [`themeforest_item_description.html`](file:///d:/ecomerce/themeforest_item_description.html), copy all the HTML, and paste it directly into the **"Item Description"** field on the ThemeForest upload page.

---

## 6. Envato Quality Review Tips

1. **Live Preview URL**: Ensure your Vercel URL is live and functioning smoothly with zero 404s.
2. **Offline Documentation**: We have already created [`documentation/index.html`](file:///d:/ecomerce/documentation/index.html) with complete styling and instructions.
3. **No Console Errors**: The template has been verified with `npm run build` and zero TypeScript errors.
