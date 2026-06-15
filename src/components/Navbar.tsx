import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";
import { useLang } from "@/lib/i18n";

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const count = useCart((state) => state.count());
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const links = useMemo(
    () => [
      { to: "/", label: t("nav_home") },
      { to: "/catalog", label: t("nav_catalog") },
    ],
    [t],
  );

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-serif text-2xl tracking-tight text-primary">
          H.A <span className="italic font-medium">Collection</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden items-center rounded-full border border-border bg-secondary/50 p-0.5 text-xs sm:flex">
            {(["id", "en"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setLang(item)}
                className={cn(
                  "px-2.5 py-1 rounded-full uppercase tracking-wider transition-all",
                  lang === item ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {count}
                </span>
              )}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col px-6 py-4 gap-3 text-sm">
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="py-1">
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-2">
              {(["id", "en"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setLang(item)}
                  className={cn(
                    "px-3 py-1 text-xs rounded-full uppercase border border-border",
                    lang === item && "bg-primary text-primary-foreground border-primary",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
