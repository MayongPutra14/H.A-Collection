# H.A Collection E-Catalog

> Premium bilingual e-catalog for modest fashion featuring hijabs and abayas. Zero-friction shopping via WhatsApp/Shopee integration.

## 🚀 Project Overview & Functionality

**H.A Collection** is a modern, responsive web application serving as an elegant product catalog for modest fashion items — specifically hijabs and abayas. The application supports **bilingual content** (Indonesian & English) and features a complete **Admin Dashboard** for content management without handling transactions directly. All purchases are redirected to external WhatsApp or Shopee links.

### Core Features

| Feature | Description |
|---------|-------------|
| **Bilingual Support** | Seamless ID/EN language toggle via `useLang()` hook with persistent storage |
| **Dynamic Catalog** | Products, categories, and banners managed through localStorage (mock API) |
| **Admin Dashboard** | Protected routes for CRUD operations on products, categories, banners, and settings |
| **Hero Carousel** | Auto-scrolling banner display (10-second interval) on homepage |
| **Product Gallery** | Multi-image carousel with file upload capability |
| **Lookbook Section** | Pinterest-style masonry grid showcasing lifestyle imagery |
| **Trust Builder** | Infinite horizontal marquee displaying customer reviews |

---

## 🛠 TECH STACK

| Technology | Purpose |
|------------|---------|
| **React 19** | Component-based UI framework with concurrent features |
| **TypeScript** | Static typing for safer development |
| **Vite** | Lightning-fast bundler and dev server |
| **React Router DOM 7** | Declarative routing system |
| **Tailwind CSS 4** | Utility-first styling framework |
| **shadcn/ui** | Accessible component primitives (Radix UI based) |
| **TanStack Query 5** | Server state management & caching |
| **Framer Motion** | Animation library for smooth transitions |
| **Lucide React** | Icon library |
| **Zustand** | Lightweight state management for cart |
| **Sonner** | Toast notifications |

---

## 📂 Folder Structure

```
src/
├── app.tsx                    # Root component with providers (QueryClient, LangProvider)
├── main.tsx                   # React entry point
├── index.css                  # Tailwind configuration & custom utilities
├── api/
│   ├── banners.ts             # Banner CRUD operations
│   ├── categories.ts          # Category CRUD operations
│   ├── data-store.ts          # LocalStorage abstraction + seed data
│   ├── products.ts            # Product CRUD operations
│   └── settings.ts            # Store settings CRUD
├── auth/
│   └── ProtectedRoute.tsx     # Route guard for admin pages
├── components/
│   ├── Footer.tsx             # Site footer with social links (Shopee, TikTok, Instagram, Facebook icons)
│   ├── Navbar.tsx             # Top navigation with language switcher
│   ├── LanguageSwitcher.tsx   # UI component for language toggle
│   ├── ProductCard.tsx        # Product display card
│   ├── ProductFilters.tsx     # Catalog filter controls
│   ├── ProductGrid.tsx        # Responsive product grid
│   ├── CheckoutSummary.tsx    # Cart summary component
│   ├── ImageUploader.tsx      # File upload with preview (base64)
│   ├── ProductFormDialog.tsx  # Modal for product creation/edit
│   └── ui/                  # shadcn/ui primitive components
├── hooks/
│   ├── use-products.ts        # React Query hooks for products
│   ├── use-categories.ts      # React Query hooks for categories
│   ├── use-banners.ts         # React Query hooks for banners
│   ├── use-settings.ts        # React Query hooks for settings
│   └── use-mobile.ts          # Responsive hook for mobile detection
├── lib/
│   ├── cart-store.ts          # Zustand cart store
│   ├── config.ts              # Brand/config constants
│   ├── format.ts              # Number/date formatting utilities
│   ├── i18n.tsx             # Language context & translations
│   └── utils.ts               # Tailwind class merging utility
├── pages/
│   ├── HomePage.tsx           # Landing page with hero, sections, lookbook
│   ├── CatalogPage.tsx        # Product catalog with filters
│   ├── ProductDetailPage.tsx  # Product detail view with carousel
│   ├── CartPage.tsx           # Shopping cart page
│   ├── NotFoundPage.tsx       # 404 page
│   └── dashboard/
│       ├── DashboardLayout.tsx    # Admin layout with sidebar/hamburger menu
│       ├── LoginPage.tsx          # Admin authentication
│       ├── OverviewPage.tsx       # Dashboard overview/stats
│       ├── ProductsPage.tsx       # Product management
│       ├── CategoriesPage.tsx     # Category management with image upload
│       ├── BannersPage.tsx        # Banner management with text/image
│       └── SettingsPage.tsx       # Store settings management
└── types/
    ├── admin.ts               # Types: Banner, Category, StoreSettings
    └── product.ts             # Types: Product, ProductFilters, ProductFormData
```

---

## 🗺 Routing Architecture

| Route | Type | Component | Access |
|-------|------|-----------|--------|
| `/` | Public | HomePage | Guest |
| `/catalog` | Public | CatalogPage | Guest |
| `/products/:id` | Public | ProductDetailPage | Guest |
| `/cart` | Public | CartPage | Guest |
| `/dashboard/login` | Public | LoginPage | Guest |
| `/dashboard` | Protected | OverviewPage | Admin Only |
| `/dashboard/overview` | Protected | OverviewPage | Admin Only |
| `/dashboard/products` | Protected | ProductsPage | Admin Only |
| `/dashboard/categories` | Protected | CategoriesPage | Admin Only |
| `/dashboard/banners` | Protected | BannersPage | Admin Only |
| `/dashboard/settings` | Protected | SettingsPage | Admin Only |

All dashboard routes are wrapped in `<ProtectedRoute>` which checks `localStorage` for a valid admin session stored under key `ha-admin-session`. Unauthorized users are redirected to `/dashboard/login`.

---

## 🧠 Core Logic, Hooks & Global Variables

### i18n System (`lib/i18n.tsx`)

The bilingual system uses React Context with persistent storage:

```tsx
const { lang, t, setLang } = useLang();
```

| Variable | Type | Description |
|----------|------|-------------|
| `lang` | `"id" \| "en"` | Current language |
| `t` | `(key: Key) => string` | Translation function - `t("hero_title")` returns localized string |
| `setLang` | `(lang: Lang) => void` | Updates language + persists to `localStorage` under key `ha-lang` |

Translations are stored in a `dict` object (lines 5-72) with parallel keys for both languages.

### Custom Hooks

| Hook | Purpose |
|------|---------|
| `useProducts(filters?)` | Fetches products from data-store with optional filter `{ query, category, includeArchived }` |
| `useProductById(id)` | Fetches single product by ID, throws if not found |
| `useCreateProduct()` | Mutation to add new product |
| `useUpdateProduct()` | Mutation to edit product fields |
| `useArchiveProduct()` | Mutation to archive/unarchive product |
| `useDeleteProduct()` | Mutation to delete product permanently |
| `useCategories()` | Fetches all categories |
| `useCreateCategory()` | Mutation to add category with optional `image_url` |
| `useUpdateCategory()` | Mutation to edit category |
| `useDeleteCategory()` | Mutation to delete category |
| `useBanners()` | Fetches all banners |
| `useCreateBanner()` | Mutation to add banner with title/subtitle/description fields |
| `useUpdateBanner()` | Mutation to edit banner |
| `useToggleBanner()` | Mutation to toggle banner status between "Active" and "Inactive" |
| `useSettings()` | Fetches store settings |
| `useSaveSettings()` | Mutation to save settings |

All hooks use `@tanstack/react-query` for caching and automatic re-fetching.

### State Management

**Cart Store** (`lib/cart-store.ts`):

```tsx
const items = useCart((state) => state.items);
const add = useCart((state) => state.add);
const remove = useCart((state) => state.remove);
const clear = useCart((state) => state.clear);
const total = useCart((state) => state.total);
```

| Property | Type | Description |
|----------|------|-------------|
| `items` | `CartItem[]` | Array of products in cart |
| `add(product)` | `(product, quantity?) => void` | Add item to cart |
| `remove(id)` | `(id) => void` | Remove item by product ID |
| `clear()` | `() => void` | Clear all items |
| `total()` | `() => number` | Calculate total price |

### Data Flow

1. **Seed Data** (`api/data-store.ts`): Contains `seedProducts`, `seedCategories`, `seedBanners`, and `defaultSettings` that populate localStorage on first load
2. **LocalStorage Keys**:
   - `ha-products-v2` — Products
   - `ha-categories-v1` — Categories  
   - `ha-banners-v1` — Banners
   - `ha-store-settings-v2` — Store settings
   - `ha-lang` — Current language preference
   - `ha-admin-session` — Admin authentication session

---

## 💻 How to Run & Deploy

### Prerequisites
- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The dev server auto-kills any process on port 5173 before starting. Access at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts development server |
| `npm run build` | Builds for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

---

## 🎨 Design System

| Element | Value |
|---------|-------|
| **Primary Color** | `#1F2E4F` (oklch) |
| **Background** | `#FAFAFA` |
| **Font Serif** | Playfair Display |
| **Font Sans** | Inter |
| **Shopee Button** | `bg-shopee` with `text-shopee-foreground` |

Custom CSS in `index.css` includes:
- `@layer utilities { .animate-marquee { animation: marquee 30s linear infinite } }` — Used for Trust Builder reviews

---

## 📝 Notes

- This project uses `localStorage` as a mock backend. Replace `data-store.ts` APIs with real database calls when integrating Supabase or another backend.
- The admin panel currently uses localStorage sessions. Implement proper JWT authentication for production.
- Images are stored as data URLs (base64) via `ImageUploader` component for demo purposes.
- The Footer component uses custom SVG icons for Shopee and TikTok platforms.