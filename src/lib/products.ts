export type Product = {
  id: string;
  name: string;
  description: { id: string; en: string };
  price: number;
  image_url: string;
  shopee_url: string;
  category: "Casual" | "Formal" | "Hijab";
  material?: string;
  sizes?: string[];
};

export const products: Product[] = [
  {
    id: "ab-001",
    name: "Noor Abaya — Midnight",
    description: {
      id: "Abaya elegan dengan potongan flowy, dibuat dari katun premium yang adem dan jatuh sempurna.",
      en: "An elegant abaya with a flowy silhouette, crafted from premium breathable cotton that drapes beautifully.",
    },
    price: 459000,
    image_url: "https://images.unsplash.com/photo-1611042553484-d61f84d22784?auto=format&fit=crop&w=1200&q=80",
    shopee_url: "https://shopee.co.id/",
    category: "Formal",
    material: "Premium Cotton Blend",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "ab-002",
    name: "Layla Abaya — Sand",
    description: {
      id: "Sentuhan minimalis dengan warna pasir lembut, cocok untuk acara formal maupun kasual.",
      en: "A minimalist piece in soft sand tone, perfect for both formal and casual occasions.",
    },
    price: 525000,
    image_url: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1200&q=80",
    shopee_url: "https://shopee.co.id/",
    category: "Casual",
    material: "Linen Blend",
    sizes: ["S", "M", "L"],
  },
  {
    id: "hj-001",
    name: "Soft Voal Hijab — Ivory",
    description: {
      id: "Hijab voal premium dengan tepi laser cut, ringan dan nyaman dipakai seharian.",
      en: "Premium voal hijab with laser-cut edges — lightweight and comfortable all day.",
    },
    price: 119000,
    image_url: "https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&w=1200&q=80",
    shopee_url: "https://shopee.co.id/",
    category: "Hijab",
    material: "Premium Voal",
    sizes: ["115 x 115 cm"],
  },
  {
    id: "ab-003",
    name: "Maryam Abaya — Charcoal",
    description: {
      id: "Desain modern dengan detail kancing minimalis dan siluet lurus yang elegan.",
      en: "Modern design with minimalist button details and an elegant straight silhouette.",
    },
    price: 489000,
    image_url: "https://images.unsplash.com/photo-1631233859262-0d7333d6f1b9?auto=format&fit=crop&w=1200&q=80",
    shopee_url: "https://shopee.co.id/",
    category: "Formal",
    material: "Crepe",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "hj-002",
    name: "Pashmina Plisket — Mocha",
    description: {
      id: "Pashmina plisket yang memberi dimensi pada gaya hijab sehari-hari Anda.",
      en: "Pleated pashmina that adds beautiful dimension to your everyday hijab style.",
    },
    price: 99000,
    image_url: "https://images.unsplash.com/photo-1591375275624-c4fe1fa1d99b?auto=format&fit=crop&w=1200&q=80",
    shopee_url: "https://shopee.co.id/",
    category: "Hijab",
    material: "Plisket Premium",
    sizes: ["75 x 175 cm"],
  },
  {
    id: "ab-004",
    name: "Aisyah Abaya — Olive",
    description: {
      id: "Abaya kasual dengan warna olive yang earthy, nyaman untuk aktivitas harian.",
      en: "Casual abaya in earthy olive — comfortable for everyday activities.",
    },
    price: 399000,
    image_url: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=1200&q=80",
    shopee_url: "https://shopee.co.id/",
    category: "Casual",
    material: "Cotton Twill",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "ab-005",
    name: "Zahra Abaya — Pearl",
    description: {
      id: "Abaya formal dengan bordir halus di bagian lengan, tampilan mewah untuk acara istimewa.",
      en: "Formal abaya with delicate sleeve embroidery — a luxurious look for special occasions.",
    },
    price: 689000,
    image_url: "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?auto=format&fit=crop&w=1200&q=80",
    shopee_url: "https://shopee.co.id/",
    category: "Formal",
    material: "Silk Blend",
    sizes: ["S", "M", "L"],
  },
  {
    id: "hj-003",
    name: "Square Hijab — Dusty Rose",
    description: {
      id: "Hijab segi empat dengan warna dusty rose yang lembut dan feminin.",
      en: "Square hijab in soft, feminine dusty rose tone.",
    },
    price: 89000,
    image_url: "https://images.unsplash.com/photo-1622495806084-d4f1a3a85a9d?auto=format&fit=crop&w=1200&q=80",
    shopee_url: "https://shopee.co.id/",
    category: "Hijab",
    material: "Voal Cotton",
    sizes: ["110 x 110 cm"],
  },
];

export const categories = ["All", "Casual", "Formal", "Hijab"] as const;

export const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
