import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "id" | "en";

const dict = {
  id: {
    nav_home: "Beranda",
    nav_catalog: "Katalog",
    nav_cart: "Keranjang",
    nav_admin: "Dashboard",
    hero_title: "Anggun dalam Kesederhanaan",
    hero_subtitle: "Koleksi hijab dan abaya pilihan, dibuat dengan rasa cinta untuk wanita modern.",
    hero_cta: "Belanja Sekarang",
    featured_title: "Koleksi Pilihan",
    featured_subtitle: "Pilihan favorit minggu ini",
    search_placeholder: "Cari produk...",
    view_details: "Lihat Detail",
    add_to_cart: "Tambah ke Keranjang",
    buy_shopee: "Beli di Shopee",
    material: "Material",
    size: "Ukuran",
    description: "Deskripsi",
    cart_empty: "Keranjang Anda kosong.",
    cart_continue: "Lanjut Belanja",
    cart_total: "Total",
    checkout_wa: "Checkout via WhatsApp",
    footer_tag: "Anggun. Sopan. Elegan.",
    footer_contact: "Kontak",
    added_toast: "Ditambahkan ke keranjang",
    all: "Semua",
    products: "Produk",
    no_products_found: "Tidak ada produk ditemukan.",
    admin_login: "Login Admin",
    dashboard: "Dashboard",
    settings: "Pengaturan",
    save_changes: "Simpan Perubahan",
    product_added: "Produk berhasil ditambahkan.",
  },
  en: {
    nav_home: "Home",
    nav_catalog: "Catalog",
    nav_cart: "Cart",
    nav_admin: "Dashboard",
    hero_title: "Elegance in Simplicity",
    hero_subtitle: "Curated hijabs and abayas, crafted with love for the modern woman.",
    hero_cta: "Shop Now",
    featured_title: "Featured Collection",
    featured_subtitle: "This week's favorites",
    search_placeholder: "Search products...",
    view_details: "View Details",
    add_to_cart: "Add to Cart",
    buy_shopee: "Buy on Shopee",
    material: "Material",
    size: "Size",
    description: "Description",
    cart_empty: "Your cart is empty.",
    cart_continue: "Continue Shopping",
    cart_total: "Total",
    checkout_wa: "Checkout via WhatsApp",
    footer_tag: "Graceful. Modest. Elegant.",
    footer_contact: "Contact",
    added_toast: "Added to cart",
    all: "All",
    products: "Products",
    no_products_found: "No products found.",
    admin_login: "Admin Login",
    dashboard: "Dashboard",
    settings: "Settings",
    save_changes: "Save Changes",
    product_added: "Product added.",
  },
} as const;

type Key = keyof (typeof dict)["en"];

type Ctx = { lang: Lang; setLang: (lang: Lang) => void; t: (key: Key) => string };

const LangContext = createContext<Ctx | null>(null);

const LANG_STORAGE_KEY = "ha-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    return stored === "en" ? "en" : "id";
  });

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (key) => dict[lang][key],
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
