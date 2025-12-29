# 🛒 CYBER GADGET — E-COMMERCE STORE

A modern, full-stack e-commerce platform for electronics and gadgets, built with performance, accessibility, and scalability in mind.

![Cyber Gadget Store Preview](./public/preview.png)

---

## 🔗 Design Reference (Figma)

This project was designed based on a mobile-first, modern e-commerce UI system.

👉 **Figma Design:**
https://www.figma.com/design/H9LHbMHBV9Zs1xsr3dvq1N/E-Store---Mobile-web--Community-?node-id=2619-1481

The implementation closely follows the design system, layout structure, spacing, typography, and interaction patterns defined in Figma.

---

## 📌 Project Overview

**Cyber Gadget** is a production-ready, full-stack e-commerce application built with **Next.js 15**, **TypeScript**, and **Supabase**.
It delivers a complete online shopping experience with advanced filtering, authentication, cart management, and a multi-step checkout flow.

The platform supports browsing, searching, filtering, wishlisting, and purchasing electronics across multiple categories.

---

## 🧰 Tech Stack

### Frontend

- **Next.js 15.5.7** (App Router)
- **React 19.1.0**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Framer Motion** (animations)
- **Radix UI** (accessible components)
- **Lucide React** (icons)

### Backend & Database

- **Supabase** (PostgreSQL)
- Server-side data fetching
- RESTful API architecture

### State Management

- React Context API
- Custom hooks (cart, wishlist, auth, toast)
- LocalStorage for client-side persistence

---

## ✨ Key Features

### 🔐 User Authentication

- Custom email/password authentication
- User registration & login
- Profile management with avatar support
- Protected routes for authenticated users
- Session persistence via `localStorage`

---

### 🛍️ Product Catalog

- 200+ products across multiple categories:
  - Phones, Computers, Headphones, Cameras, etc.
- Advanced filtering:
  - Brand
  - Price range
  - Battery
  - Screen size
- Real-time search
- Sorting (rating, price, newest)
- Pagination support
- Dynamic product detail pages with specifications

---

### 🛒 Shopping Experience

- Full-featured shopping cart
- Quantity management
- Wishlist functionality
- Product reviews & ratings
- Discount system with rotating offers
- Responsive product cards with hover effects
- Category & brand-based navigation

---

### 💳 Checkout Process

- Multi-step checkout flow:
  1. Address
  2. Shipping
  3. Payment
- Address management (add/edit/delete)
- Multiple shipping options:
  - Free
  - Express
  - Scheduled
- Payment form with validation
- Order summary with tax & shipping calculations

---

### 🎨 UI / UX Features

- Fully responsive design (mobile, tablet, desktop)
- Dark mode support
- Toast notification system
- Loading states & skeletons
- Breadcrumb navigation
- Search with filters & suggestions
- Mobile-optimized navigation drawer

---

## 🗂️ Project Structure

```txt
cyber-gadget/
├── app/                          # Next.js 15 app directory
│   ├── (client)/                # Client-facing pages
│   │   ├── about/
│   │   ├── brands/
│   │   ├── cart/
│   │   ├── category/
│   │   ├── checkout/
│   │   ├── contact/
│   │   ├── profile/
│   │   ├── search/
│   │   ├── services/
│   │   └── wishlist/
│   ├── api/                     # API routes
│   ├── login/
│   ├── signup/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── features/
│   │   ├── auth/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── home/
│   │   ├── products/
│   │   ├── search/
│   │   └── wishList/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Breadcrumb.tsx
│   └── ui/
├── contexts/
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   ├── WishlistContext.tsx
│   └── ToastContext.tsx
├── lib/
│   ├── api.ts
│   ├── supabase.ts
│   └── utils.ts
├── types/
└── constants/
```


## ⚙️ Core Functionality

### Product Management

* Dynamic product fetching from Supabase
* Category & brand filtering
* Dual-slider price range filtering
* Search across product name, brand & description
* Product specifications display
* Multiple product image views

### Cart System

* Add/remove items
* Quantity adjustment
* Persistent cart storage
* Cart total calculation
* Promo code support
* Bonus card integration

### Wishlist

* Add/remove favorites
* Move items to cart
* Persistent storage
* Badge notifications
* Empty-state handling

---

## 🔐 Authentication Flow

* Email/password registration
* Credential validation on login
* Protected route redirects
* Profile updates
* Session management
* Multi-user support via `localStorage`

---

## 🗄️ Database Schema (Supabase)

### Products Table

<pre class="overflow-visible! px-0!" data-start="5110" data-end="5356"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-sql"><span><span>id            </span><span>INTEGER</span><span></span><span>PRIMARY KEY</span><span>
category      TEXT
brand         TEXT
model         TEXT
price         </span><span>NUMERIC</span><span>
images        JSON
specifications JSON
details       TEXT
rating        </span><span>NUMERIC</span><span>
reviews       JSON
created_at    </span><span>TIMESTAMP</span><span>
</span></span></code></div></div></pre>

---

## 🚀 Performance Optimizations

* Next.js Image optimization
* Lazy loading images
* Memoized calculations (`useMemo`)
* Debounced search inputs
* Pagination to limit render load
* Suspense boundaries for async components

---

## ♿ Accessibility

* Semantic HTML
* ARIA labels
* Keyboard navigation
* Screen-reader friendly
* Focus management
* Proper form validation

---

## 📱 Responsive Design

* Mobile-first approach
* Breakpoints: mobile / tablet / desktop
* Touch-friendly UI
* Adaptive layouts
* Mobile drawer navigation

---

## 🔑 Environment Variables

<pre class="overflow-visible! px-0!" data-start="5927" data-end="6033"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-env"><span>NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
</span></code></div></div></pre>

---

## 🛠️ Development Setup

<pre class="overflow-visible! px-0!" data-start="6066" data-end="6268"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span># Clone repository</span><span>
git </span><span>clone</span><span> https://github.com/your-username/cyber-gadget.git

</span><span># Install dependencies</span><span>
npm install

</span><span># Run development server</span><span>
npm run dev

</span><span># Build for production</span><span>
npm run build
</span></span></code></div></div></pre>

---

## ☁️ Deployment

* Optimized for **Vercel**
* Static generation where applicable
* Server-side rendering for dynamic content
* API routes for backend functionality

---

## 🧩 Design Patterns Used

* Context API for global state
* Custom hooks for reusable logic
* Compound components
* Controlled vs uncontrolled components
* Higher-order components for route protection
* Provider pattern for context distribution

---

## 🛡️ Validation & Error Handling

* Real-time form validation
* Error boundaries
* Toast notifications
* Try-catch blocks for async logic
* Fallback UI for loading states
* Custom 404 page

---

## 🔮 Future Enhancements

* Order history tracking
* Email notifications
* Product recommendations
* Advanced analytics
* Social authentication
* Payment gateway integration
* Multi-language support
* Admin dashboard

## 👤 Author

**Ayokanmi Odunayo Ogunyebi**

Frontend / Full-Stack Developer

Project: **Cyber Gadget — E-Commerce Store**
