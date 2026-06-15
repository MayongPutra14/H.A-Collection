import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={cn(
        "flex rounded-full border border-border bg-secondary/50 p-0.5",
        compact ? "text-xs" : "text-xs sm:hidden",
      )}
    >
      {(["id", "en"] as Lang[]).map((item) => (
        <button
          key={item}
          onClick={() => setLang(item)}
          className={cn(
            "rounded-full uppercase tracking-wider transition-all",
            compact ? "px-3 py-1" : "px-2.5 py-1",
            lang === item ? "bg-primary text-primary-foreground" : "text-muted-foreground",
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
