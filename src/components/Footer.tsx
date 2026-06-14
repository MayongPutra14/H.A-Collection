import { useRouterState } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-2xl">H.A Collection</h3>
          <p className="mt-3 text-sm text-primary-foreground/70 max-w-xs">{t("footer_tag")}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium uppercase tracking-widest mb-4">{t("footer_contact")}</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@hacollection.id</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +62 812-3456-7890</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium uppercase tracking-widest mb-4">Social</h4>
          <div className="flex gap-3">
            <a href="#" className="h-9 w-9 grid place-items-center rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="h-9 w-9 grid place-items-center rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} H.A Collection. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
