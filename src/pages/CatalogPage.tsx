import { useMemo, useState } from "react";
import { ProductFilters } from "@/components/ProductFilters";
import { ProductGrid } from "@/components/ProductGrid";
import { useCategories } from "@/hooks/use-categories";
import { useLang } from "@/lib/i18n";
import { useProducts } from "@/hooks/use-products";
import type { ProductCategory } from "@/types/product";

export function CatalogPage() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "All">("All");
  const { data: categories = [] } = useCategories();
  const filters = useMemo(() => ({ query, category }), [query, category]);
  const { data: products = [] } = useProducts(filters);

  return (
    <div className="mx-auto max-w-7xl px-6 pt-12 pb-24">
      <header className="mb-8">
        <h1 className="font-serif text-4xl sm:text-5xl">{t("nav_catalog")}</h1>
        <p className="mt-2 text-muted-foreground">{products.length} products</p>
      </header>
      <ProductFilters
        query={query}
        category={category}
        categories={categories.map((item) => item.name)}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
      />
      <ProductGrid products={products} />
    </div>
  );
}
