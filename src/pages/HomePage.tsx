import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/ProductGrid";
import { useBanners } from "@/hooks/use-banners";
import { useCategories } from "@/hooks/use-categories";
import { useLang } from "@/lib/i18n";
import { useProducts } from "@/hooks/use-products";

export function HomePage() {
  const { lang, t } = useLang();
  const { data: products = [] } = useProducts();
  const { data: banners = [] } = useBanners();
  const activeBanners = banners.filter((banner) => banner.status === "Active");
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % activeBanners.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [activeBanners.length]);

  const heroBanner = activeBanners[currentHero];
  const heroImage =
    heroBanner?.image_url ||
    "https://xvvqckhgxofdepawhhqf.supabase.co/storage/v1/object/public/uploads/products/1782647665846-image.png";
  const heroTitle =
    heroBanner?.[lang === "en" ? "titleEn" : "title"] || heroBanner?.title || t("hero_title");
  const heroSubtitle =
    heroBanner?.[lang === "en" ? "subtitleEn" : "subtitle"] || heroBanner?.subtitle || "";
  const heroDescription =
    heroBanner?.[lang === "en" ? "descriptionEn" : "description"] || heroBanner?.description || "";
  const featured = products.slice(0, 4);
  const { data: categories = [] } = useCategories();

  const lookbookData = [
    {
      src: "https://6a2f8a18d2c53535166bdd7e.imgix.net/ha-collection/114C3E13-7A2A-4A94-8D3D-03F23836090A.webp?auto=format&fit=crop&w=800&q=80",
      className: "col-span-2 row-span-2",
    },
    {
      src: "https://6a2f8a18d2c53535166bdd7e.imgix.net/ha-collection/id-11134207-8224r-mjb3d1z2tjwl41.jpg",
      className: "col-span-1 row-span-1",
    },
    {
      src: "https://6a2f8a18d2c53535166bdd7e.imgix.net/ha-collection/WhatsApp%20Image%202026-06-15%20at%2016.01.41.jpeg?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 row-span-2",
    },
    {
      src: "https://6a2f8a18d2c53535166bdd7e.imgix.net/ha-collection/WhatsApp%20Image%202026-06-15%20at%2016.01.42.jpeg?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 row-span-1",
    },
    {
      src: "https://6a2f8a18d2c53535166bdd7e.imgix.net/ha-collection/WhatsApp%20Image%202026-06-15%20at%2016.01.34%20(1).jpeg?auto=format&fit=crop&w=800&q=80",
      className: "col-span-2 md:col-span-2 row-span-2",
    },
    {
      src: "https://6a2f8a18d2c53535166bdd7e.imgix.net/ha-collection/WhatsApp%20Image%202026-06-15%20at%2016.01.38.jpeg?auto=format&fit=crop&w=800&q=80",
      className: "col-span-2 md:col-span-2 row-span-2",
    },
  ];

  const reviews = [
    {
      id: "1",
      name: "Sarah",
      textId: "Kainnya jatuh banget dan adem, super nyaman!",
      textEn: "The fabric drapes beautifully and is so breathable!",
    },
    {
      id: "2",
      name: "Alya",
      textId: "Desainnya timeless dan nyaman dipakai sehari-hari.",
      textEn: "The design is timeless and comfortable for daily wear.",
    },
    {
      id: "3",
      name: "Maya",
      textId: "Kualitas premium dengan harga yang masih sangat masuk akal.",
      textEn: "Premium quality at a very reasonable price.",
    },
    {
      id: "4",
      name: "Dina",
      textId: "Jahitannya super rapi, sekelas butik mahal.",
      textEn: "The stitching is super neat, like an expensive boutique.",
    },
  ];

  return (
    <>
      <section className="relative h-[70vh] min-h-105 w-full overflow-hidden">
        <img
          src={heroImage}
          alt="H.A Collection hero"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/30 via-primary/20 to-primary/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex items-center pt-20 pb-12">
          <motion.div
            key={heroBanner?.id || currentHero}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-primary-foreground"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70 mb-4">
              {heroTitle}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              {heroSubtitle}
            </h1>
            <p className="mt-4 text-sm md:text-base text-primary-foreground/85 max-w-md whitespace-pre-line">
              {heroDescription}
            </p>
            <Link to="/catalog" className="inline-block mt-6">
              <Button size="lg" variant="secondary" className="rounded-full px-6 group">
                {t("hero_cta")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-secondary/20 py-10 md:py-12 lg:py-16"
      >
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
              The Brand Vibe
            </div>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-4">
              {lang === "en"
                ? "Woven with elegance. Designed for the comfort of every step of the modern woman."
                : "Ditenun dengan keanggunan. Didesain untuk kenyamanan setiap langkah wanita modern."}
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://6a2f8a18d2c53535166bdd7e.imgix.net/ha-collection/COLOR%20SCHEME.jpg?auto=format&fit=crop&w=1200&q=80"
              alt="Fabric texture"
              className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-10 md:py-12 lg:py-16"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
            {lang === "en" ? "Shop by Style" : "Belanja Berdasarkan Gaya"}
          </div>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-6">
            {lang === "en" ? "Categories" : "Kategori"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/catalog?category=${category.name}`}
                className="group relative aspect-4/3 rounded-xl overflow-hidden"
              >
                <img
                  src={
                    category.image_url ||
                    `https://images.unsplash.com/photo-1584273141181-e28dc5a0b938?auto=format&fit=crop&w=600&q=80&sig=${index}`
                  }
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-b from-primary/80 via-primary/20 to-transparent" />
                <div className="relative z-10 flex items-end h-full p-4">
                  <span className="text-primary-foreground font-serif text-lg group-hover:text-shadow-lg transition">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:py-12 lg:py-16">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
              {t("featured_subtitle")}
            </div>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl">{t("featured_title")}</h2>
          </div>
          <Link
            to="/catalog"
            className="hidden sm:inline-flex text-sm items-center gap-1 text-muted-foreground hover:text-foreground transition"
          >
            {t("nav_catalog")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-secondary/20 py-10 md:py-12 lg:py-16"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
            {lang === "en" ? "Style Inspiration" : "Inspirasi Gaya"}
          </div>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-6">
            {lang === "en" ? "The Lookbook" : "Lookbook"}
          </h2>

          <div className="grid grid-flow-dense grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
            {lookbookData.map((item, index) => (
              <div key={index} className={`overflow-hidden rounded-xl ${item.className}`}>
                <img
                  src={item.src}
                  alt={`Lookbook ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-10 md:py-12 lg:py-16 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
            {lang === "en" ? "What They Say" : "Kata Mereka"}
          </div>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-8">
            {lang === "en" ? "The Trust Builder" : "Kepercayaan Pelanggan"}
          </h2>
        </div>

        <div className="relative flex overflow-hidden group">
          <div className="flex animate-marquee group-hover:paused whitespace-nowrap">
            {reviews.map((review, index) => (
              <div key={`review-1-${index}`} className="shrink-0 w-75 sm:w-100 mx-4">
                <blockquote className="bg-card border border-border rounded-xl p-6 sm:p-8 whitespace-normal">
                  <p className="font-serif italic text-base sm:text-lg text-foreground/80 leading-relaxed">
                    "{lang === "en" ? review.textEn : review.textId}"
                  </p>
                  <footer className="mt-6 text-sm font-medium text-muted-foreground">
                    — {review.name}
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
          <div
            className="flex animate-marquee group-hover:paused whitespace-nowrap"
            aria-hidden="true"
          >
            {reviews.map((review, index) => (
              <div key={`review-2-${index}`} className="shrink-0 w-75 sm:w-100 mx-4">
                <blockquote className="bg-card border border-border rounded-xl p-6 sm:p-8 whitespace-normal">
                  <p className="font-serif italic text-base sm:text-lg text-foreground/80 leading-relaxed">
                    "{lang === "en" ? review.textEn : review.textId}"
                  </p>
                  <footer className="mt-6 text-sm font-medium text-muted-foreground">
                    — {review.name}
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}
