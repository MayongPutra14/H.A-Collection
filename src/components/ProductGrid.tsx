import { ProductCard } from "@/components/ProductCard";
import { useLang } from "@/lib/i18n";
import type { Product } from "@/types/product";

export function ProductGrid({ products }: { products: Product[] }) {
  const { t } = useLang();

  if (products.length === 0) {
    return <div className="text-center py-24 text-muted-foreground">{t("no_products_found")}</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
