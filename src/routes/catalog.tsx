import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Catalog — H.A Collection" },
      { name: "description", content: "Browse our full catalog of hijabs and abayas." },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = cat === "All" || p.category === cat;
      const matchQ = p.name.toLowerCase().includes(q.toLowerCase());
      return matchCat && matchQ;
    });
  }, [q, cat]);

  const catLabel = (c: string) => (c === "All" ? t("all") : c);

  return (
    <div className="mx-auto max-w-7xl px-6 pt-12 pb-24">
      <header className="mb-8">
        <h1 className="font-serif text-4xl sm:text-5xl">{t("nav_catalog")}</h1>
        <p className="mt-2 text-muted-foreground">{filtered.length} products</p>
      </header>

      <div className="sticky top-16 z-30 -mx-6 px-6 py-4 bg-background/85 backdrop-blur-md border-b border-border mb-10">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("search_placeholder")}
              className="pl-9 h-10 rounded-full bg-secondary/60 border-transparent focus-visible:bg-background"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto -mx-1 px-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "px-4 h-10 text-sm whitespace-nowrap rounded-full border transition",
                  cat === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                )}
              >
                {catLabel(c)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-24 text-muted-foreground">No products found.</div>
      )}
    </div>
  );
}
