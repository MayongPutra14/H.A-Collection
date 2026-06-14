import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Menu } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const items = useCart((s) => s.items);
  const count = items.reduce((a, i) => a + i.qty, 0);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  const links = [
    { to: "/", label: t("nav_home") },
    { to: "/catalog", label: t("nav_catalog") },
    { to: "/admin", label: t("nav_admin") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-serif text-2xl tracking-tight text-primary">
          H.A <span className="italic font-medium">Collection</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative text-foreground/70 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:flex items-center text-xs rounded-full border border-border bg-secondary/50 p-0.5">
            {(["id", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "px-2.5 py-1 rounded-full uppercase tracking-wider transition-all",
                  lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                )}
              >
                {l}
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
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col px-6 py-4 gap-3 text-sm">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-1">
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-2">
              {(["id", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    "px-3 py-1 text-xs rounded-full uppercase border border-border",
                    lang === l && "bg-primary text-primary-foreground border-primary"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
