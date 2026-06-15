import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import type { ProductCategory } from "@/types/product";

type Props = {
  query: string;
  category: ProductCategory | "All";
  categories: string[];
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: ProductCategory | "All") => void;
};

export function ProductFilters({
  query,
  category,
  categories,
  onQueryChange,
  onCategoryChange,
}: Props) {
  const { t } = useLang();

  return (
    <div className="sticky top-16 z-30 -mx-6 px-6 py-4 bg-background/85 backdrop-blur-md border-b border-border mb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={t("search_placeholder")}
            className="pl-9 h-10 rounded-full bg-secondary/60 border-transparent focus-visible:bg-background"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto -mx-1 px-1">
          {["All", ...categories].map((item) => (
            <button
              key={item}
              onClick={() => onCategoryChange(item)}
              className={cn(
                "px-4 h-10 text-sm whitespace-nowrap rounded-full border transition",
                category === item
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30",
              )}
            >
              {item === "All" ? t("all") : item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
