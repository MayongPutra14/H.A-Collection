import { useLocation } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, ShoppingBag, Music } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";
import { BRAND, CONTACT } from "@/lib/config";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  const { pathname } = useLocation();
  const { data: settings } = useSettings();

  if (pathname.startsWith("/dashboard")) return null;

  const socialLinks = [
    { icon: ShoppingBag, url: settings?.shopeeUrl, label: "Shopee" },
    { icon: Music, url: settings?.tiktokUrl, label: "TikTok" },
    { icon: Instagram, url: settings?.instagramUrl, label: "Instagram" },
    { icon: Facebook, url: settings?.facebookUrl, label: "Facebook" },
  ].filter((link) => link.url);

  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-2xl">{BRAND.name}</h3>
          <p className="mt-3 text-sm text-primary-foreground/70 max-w-xs">{t("footer_tag")}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium uppercase tracking-widest mb-4">
            {t("footer_contact")}
          </h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> {CONTACT.email}
            </li>
<li className="flex items-center gap-2">
               <Phone className="h-4 w-4" /> {settings?.adminWhatsApp}
             </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium uppercase tracking-widest mb-4">Social</h4>
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url}
                className="h-9 w-9 grid place-items-center rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
