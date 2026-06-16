import { useLocation } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";
import { BRAND, CONTACT } from "@/lib/config";
import { useLang } from "@/lib/i18n";

const TikTokIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.72 4.17 1.08 1.07 2.66 1.73 4.36 1.77v3.66c-1.44-.06-2.87-.48-4.04-1.21v5.16c-.01 3.2-2.43 6.03-5.63 6.25-3.34.22-6.42-1.99-6.9-5.32-.47-3.32 1.93-6.43 5.25-6.83.16-.02.33-.03.5-.03v3.67c-1.42.06-2.6 1.28-2.58 2.72s1.25 2.59 2.68 2.54c1.33-.05 2.37-1.16 2.38-2.5V.02z" />
  </svg>
);

const ShopeeIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M7.4 5.92A4.6 4.6 0 0112 1.32a4.6 4.6 0 014.6 4.6V7.6h2.95a1.84 1.84 0 011.83 1.63l1.24 10.12A2.76 2.76 0 0119.88 22.4H4.12a2.76 2.76 0 01-2.74-3.05L2.62 9.23A1.84 1.84 0 014.45 7.6H7.4V5.92zm1.84 0v1.68h5.52V5.92a2.76 2.76 0 00-5.52 0zm.45 4.6a1.1 1.1 0 00-.73 1.9l4.58 4.34a1.66 1.66 0 01-1.15 2.84H8.7a.92.92 0 100 1.84h3.69a3.5 3.5 0 002.43-6l-4.58-4.33a.18.18 0 01.12-.31h3.69a.92.92 0 100-1.84H9.69z" />
  </svg>
);

export function Footer() {
  const { t } = useLang();
  const { pathname } = useLocation();
  const { data: settings } = useSettings();

  if (pathname.startsWith("/dashboard")) return null;

  const socialLinks = [
    { icon: ShopeeIcon, url: settings?.shopeeUrl, label: "Shopee" },
    { icon: TikTokIcon, url: settings?.tiktokUrl, label: "TikTok" },
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
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 grid place-items-center rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition group"
                aria-label={label}
              >
                <Icon className="h-4 w-4 text-primary-foreground/80 group-hover:text-primary-foreground transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-primary-foreground/60 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <span>Designed with precision</span>
        </div>
      </div>
    </footer>
  );
}