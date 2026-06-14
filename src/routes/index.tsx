import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "H.A Collection — Elegant Hijab & Abaya" },
      { name: "description", content: "Curated hijabs and abayas crafted with love for the modern woman." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useLang();
  const featured = products.slice(0, 4);
  return (
    <>
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1611042553484-d61f84d22784?auto=format&fit=crop&w=2000&q=80"
          alt="H.A Collection hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/20 to-primary/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex items-end pb-24 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-primary-foreground"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70 mb-4">
              New Season — 2026
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
              {t("hero_title")}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-primary-foreground/85 max-w-md">
              {t("hero_subtitle")}
            </p>
            <Link to="/catalog" className="inline-block mt-8">
              <Button size="lg" variant="secondary" className="rounded-full px-7 group">
                {t("hero_cta")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              {t("featured_subtitle")}
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl">{t("featured_title")}</h2>
          </div>
          <Link to="/catalog" className="hidden sm:inline-flex text-sm items-center gap-1 text-muted-foreground hover:text-foreground transition">
            {t("nav_catalog")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </>
  );
}
