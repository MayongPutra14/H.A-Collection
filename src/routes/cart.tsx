import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { useLang } from "@/lib/i18n";
import { formatIDR } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — H.A Collection" }] }),
  component: CartPage,
});

function CartPage() {
  const { t, lang } = useLang();
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const total = useCart((s) => s.total());

  const checkoutWA = () => {
    const lines = items.map(
      (i) => `• ${i.product.name} x${i.qty} — ${formatIDR(i.product.price * i.qty)}`
    );
    const header = lang === "id" ? "Halo H.A Collection, saya ingin memesan:" : "Hello H.A Collection, I'd like to order:";
    const totalLine = `${t("cart_total")}: ${formatIDR(total)}`;
    const text = encodeURIComponent([header, "", ...lines, "", totalLine].join("\n"));
    window.open(`https://wa.me/6281234567890?text=${text}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="font-serif text-3xl mt-6">{t("cart_empty")}</h1>
        <Link to="/catalog" className="inline-block mt-6">
          <Button>{t("cart_continue")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-serif text-4xl sm:text-5xl mb-10">{t("nav_cart")}</h1>
      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <ul className="divide-y divide-border">
          {items.map((i) => (
            <li key={i.product.id} className="py-6 flex gap-4">
              <Link to="/product/$id" params={{ id: i.product.id }} className="shrink-0">
                <img src={i.product.image_url} alt={i.product.name} className="h-28 w-24 object-cover rounded-md" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{i.product.category}</div>
                <Link to="/product/$id" params={{ id: i.product.id }} className="font-serif text-lg hover:underline">
                  {i.product.name}
                </Link>
                <div className="text-sm text-muted-foreground mt-1">{formatIDR(i.product.price)}</div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="inline-flex items-center border border-border rounded-full">
                    <button onClick={() => setQty(i.product.id, i.qty - 1)} className="h-8 w-8 grid place-items-center hover:bg-secondary rounded-l-full">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm">{i.qty}</span>
                    <button onClick={() => setQty(i.product.id, i.qty + 1)} className="h-8 w-8 grid place-items-center hover:bg-secondary rounded-r-full">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button onClick={() => remove(i.product.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-right font-medium">{formatIDR(i.product.price * i.qty)}</div>
            </li>
          ))}
        </ul>
        <aside className="h-fit lg:sticky lg:top-24 rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl mb-4">Summary</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatIDR(total)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="text-muted-foreground">—</dd></div>
          </dl>
          <div className="mt-4 pt-4 border-t border-border flex justify-between items-baseline">
            <span className="text-sm uppercase tracking-wider text-muted-foreground">{t("cart_total")}</span>
            <span className="font-serif text-2xl">{formatIDR(total)}</span>
          </div>
          <Button className="w-full mt-6 h-12 bg-[#25D366] hover:bg-[#25D366]/90 text-white" onClick={checkoutWA}>
            {t("checkout_wa")}
          </Button>
        </aside>
      </div>
    </div>
  );
}
