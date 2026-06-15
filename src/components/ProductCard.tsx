import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { getPrimaryImage } from "@/api/data-store";
import { formatIDR } from "@/lib/format";
import { useLang } from "@/lib/i18n";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/products/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-lg bg-secondary/40 aspect-[3/4]">
          <img
            src={getPrimaryImage(product)}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-background/95 backdrop-blur px-4 py-2.5 text-center text-xs uppercase tracking-widest">
            {t("view_details")}
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            {product.category}
          </div>
          <h3 className="font-serif text-lg leading-snug text-foreground">{product.name}</h3>
          <p className="text-sm text-foreground/80">{formatIDR(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
