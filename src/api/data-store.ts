import { SHOPEE_BASE_URL } from "@/lib/config";
import type { Banner, Category, StoreSettings } from "@/types/admin";
import type { Product } from "@/types/product";

const now = "2026-06-14T00:00:00.000Z";

export const seedProducts: Product[] = [
  {
    id: "ab-001",
    name: "Noor Abaya — Midnight",
    description: {
      id: "Abaya elegan dengan potongan flowy, dibuat dari katun premium yang adem dan jatuh sempurna.",
      en: "An elegant abaya with a flowy silhouette, crafted from premium breathable cotton that drapes beautifully.",
    },
    price: 459000,
    image_url:
      "https://images.unsplash.com/photo-1611042553484-d61f84d22784?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1611042553484-d61f84d22784?auto=format&fit=crop&w=1200&q=80",
    ],
    shopee_url: SHOPEE_BASE_URL,
    category: "Formal",
    material: "Premium Cotton Blend",
    sizes: ["S", "M", "L", "XL"],
    archived: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "ab-002",
    name: "Layla Abaya — Sand",
    description: {
      id: "Sentuhan minimalis dengan warna pasir lembut, cocok untuk acara formal maupun kasual.",
      en: "A minimalist piece in soft sand tone, perfect for both formal and casual occasions.",
    },
    price: 525000,
    image_url:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1200&q=80",
    ],
    shopee_url: SHOPEE_BASE_URL,
    category: "Casual",
    material: "Linen Blend",
    sizes: ["S", "M", "L"],
    archived: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "hj-001",
    name: "Soft Voal Hijab — Ivory",
    description: {
      id: "Hijab voal premium dengan tepi laser cut, ringan dan nyaman dipakai seharian.",
      en: "Premium voal hijab with laser-cut edges — lightweight and comfortable all day.",
    },
    price: 119000,
    image_url:
      "https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&w=1200&q=80",
    ],
    shopee_url: SHOPEE_BASE_URL,
    category: "Hijab",
    material: "Premium Voal",
    sizes: ["115 x 115 cm"],
    archived: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "ab-003",
    name: "Maryam Abaya — Charcoal",
    description: {
      id: "Desain modern dengan detail kancing minimalis dan siluet lurus yang elegan.",
      en: "Modern design with minimalist button details and an elegant straight silhouette.",
    },
    price: 489000,
    image_url:
      "https://images.unsplash.com/photo-1631233859262-0d7333d6f1b9?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1631233859262-0d7333d6f1b9?auto=format&fit=crop&w=1200&q=80",
    ],
    shopee_url: SHOPEE_BASE_URL,
    category: "Formal",
    material: "Crepe",
    sizes: ["S", "M", "L", "XL"],
    archived: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "hj-002",
    name: "Pashmina Plisket — Mocha",
    description: {
      id: "Pashmina plisket yang memberi dimensi pada gaya hijab sehari-hari Anda.",
      en: "Pleated pashmina that adds beautiful dimension to your everyday hijab style.",
    },
    price: 99000,
    image_url:
      "https://images.unsplash.com/photo-1591375275624-c4fe1fa1d99b?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1591375275624-c4fe1fa1d99b?auto=format&fit=crop&w=1200&q=80",
    ],
    shopee_url: SHOPEE_BASE_URL,
    category: "Hijab",
    material: "Plisket Premium",
    sizes: ["75 x 175 cm"],
    archived: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "ab-004",
    name: "Aisyah Abaya — Olive",
    description: {
      id: "Abaya kasual dengan warna olive yang earthy, nyaman untuk aktivitas harian.",
      en: "Casual abaya in earthy olive — comfortable for everyday activities.",
    },
    price: 399000,
    image_url:
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=1200&q=80",
    ],
    shopee_url: SHOPEE_BASE_URL,
    category: "Casual",
    material: "Cotton Twill",
    sizes: ["S", "M", "L", "XL"],
    archived: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "ab-005",
    name: "Zahra Abaya — Pearl",
    description: {
      id: "Abaya formal dengan bordir halus di bagian lengan, tampilan mewah untuk acara istimewa.",
      en: "Formal abaya with delicate sleeve embroidery — a luxurious look for special occasions.",
    },
    price: 689000,
    image_url:
      "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?auto=format&fit=crop&w=1200&q=80",
    ],
    shopee_url: SHOPEE_BASE_URL,
    category: "Formal",
    material: "Silk Blend",
    sizes: ["S", "M", "L"],
    archived: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "hj-003",
    name: "Square Hijab — Dusty Rose",
    description: {
      id: "Hijab segi empat dengan warna dusty rose yang lembut dan feminin.",
      en: "Square hijab in soft, feminine dusty rose tone.",
    },
    price: 89000,
    image_url:
      "https://images.unsplash.com/photo-1622495806084-d4f1a3a85a9d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1622495806084-d4f1a3a85a9d?auto=format&fit=crop&w=1200&q=80",
    ],
    shopee_url: SHOPEE_BASE_URL,
    category: "Hijab",
    material: "Voal Cotton",
    sizes: ["110 x 110 cm"],
    archived: false,
    createdAt: now,
    updatedAt: now,
  },
];

export const seedCategories: Category[] = ["Casual", "Formal", "Hijab"].map((name) => ({
  id: name.toLowerCase(),
  name,
  createdAt: now,
  updatedAt: now,
}));

export const seedBanners: Banner[] = [
  {
    id: "banner-hero-1",
    title: "Baru",
    titleEn: "New",
    subtitle: "Anggun dalam Kesederhanaan",
    subtitleEn: "Graceful in Simplicity",
    description: "Koleksi hijab dan abaya pilihan, dibuat dengan rasa cinta untuk wanita modern.",
    descriptionEn: "Selected hijab and abaya collection, crafted with love for modern women.",
    image_url:
      "https://images.unsplash.com/photo-1611042553484-d61f84d22784?auto=format&fit=crop&w=1600&q=80",
    status: "Active",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "banner-hero-2",
    title: "Voal Premium",
    titleEn: "Premium Voal",
    subtitle: "Nyaman seharian",
    subtitleEn: "All-day Comfort",
    description: "Hijab voal premium dengan motif elegan.",
    descriptionEn: "Premium voal hijab with elegant motif.",
    image_url:
      "https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&w=1600&q=80",
    status: "Inactive",
    createdAt: now,
    updatedAt: now,
  },
];

export const defaultSettings: StoreSettings = {
  adminWhatsApp: "+62 812 3456 7890",
  shopeeStoreUrl: "shopee.co.id/hacollection",
  shopeeUrl: "https://shopee.co.id/hacollection",
  tiktokUrl: "",
  instagramUrl: "",
  facebookUrl: "",
  updatedAt: now,
};

const readStore = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) return fallback;
    return JSON.parse(stored) as T;
  } catch {
    return fallback;
  }
};

const writeStore = <T>(key: string, value: T) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getPrimaryImage = (product: Product) => product.images?.[0] || product.image_url;

export const migrateProducts = (products: Product[]): Product[] =>
  products.map((product) => ({
    ...product,
    image_url: product.images?.[0] || product.image_url,
    images: product.images?.length ? product.images : [product.image_url],
    archived: product.archived ?? false,
    createdAt: product.createdAt || now,
    updatedAt: product.updatedAt || now,
  }));

export const readProducts = () =>
  migrateProducts(readStore<Product[]>("ha-products-v2", seedProducts));
export const writeProducts = (products: Product[]) => writeStore("ha-products-v2", products);
export const readCategories = () => readStore<Category[]>("ha-categories-v1", seedCategories);
export const writeCategories = (categories: Category[]) =>
  writeStore("ha-categories-v1", categories);
export const readBanners = () => readStore<Banner[]>("ha-banners-v1", seedBanners);
export const writeBanners = (banners: Banner[]) => writeStore("ha-banners-v1", banners);
export const readSettings = () => readStore<StoreSettings>("ha-store-settings-v2", defaultSettings);
export const writeSettings = (settings: StoreSettings) =>
  writeStore("ha-store-settings-v2", settings);
