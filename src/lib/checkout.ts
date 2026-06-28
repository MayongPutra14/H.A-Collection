import { formatIDR } from "@/lib/format";
import type { CartItem } from "@/lib/cart-store";

const SETTINGS_KEY = "ha-store-settings-v2";

function getSettingsSync() {
  if (typeof window === "undefined") {
    return { adminWhatsApp: "+62 812 3456 7890" };
  }
  try {
    const stored = window.localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : { adminWhatsApp: "+62 812 3456 7890" };
  } catch {
    return { adminWhatsApp: "+62 812 3456 7890" };
  }
}

export function buildWhatsAppCheckoutMessage(items: CartItem[], total: number, lang: "id" | "en") {
  const header =
    lang === "id"
      ? "Halo H.A Collection, saya ingin memesan:"
      : "Hello H.A Collection, I'd like to order:";
  const lines = items.map(
    (item) => `• ${item.product.name} x${item.qty} — ${formatIDR(item.product.price * item.qty)}`,
  );
  return [header, "", ...lines, "", `Total: ${formatIDR(total)}`].join("\n");
}

function normalizeWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

export function openWhatsAppCheckout(items: CartItem[], total: number, lang: "id" | "en") {
  const settings = getSettingsSync();
  const text = encodeURIComponent(buildWhatsAppCheckoutMessage(items, total, lang));
  window.open(
    `https://wa.me/${normalizeWhatsAppNumber(settings.adminWhatsApp)}?text=${text}`,
    "_blank",
    "noopener,noreferrer",
  );
}
