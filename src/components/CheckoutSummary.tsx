import { Button } from "@/components/ui/button";
import { formatIDR } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { CartItem } from "@/lib/cart-store";

type Props = {
  items: CartItem[];
  total: number;
  onCheckout: () => void;
};

export function CheckoutSummary({ items, total, onCheckout }: Props) {
  const { t } = useLang();

  return (
    <aside className="h-fit rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
      <h2 className="font-serif text-xl mb-4">Summary</h2>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd>{formatIDR(total)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="text-muted-foreground">—</dd>
        </div>
      </dl>
      <div className="mt-4 pt-4 border-t border-border flex justify-between items-baseline">
        <span className="text-sm uppercase tracking-wider text-muted-foreground">
          {t("cart_total")}
        </span>
        <span className="font-serif text-2xl">{formatIDR(total)}</span>
      </div>
      <Button
        className="w-full mt-6 h-12 bg-[#25D366] hover:bg-[#25D366]/90 text-white"
        onClick={onCheckout}
      >
        {t("checkout_wa")}
      </Button>
      <p className="text-xs text-muted-foreground mt-3">
        {items.length} item{items.length > 1 ? "s" : ""}
      </p>
    </aside>
  );
}
