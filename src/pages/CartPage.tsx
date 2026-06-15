import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutSummary } from "@/components/CheckoutSummary";
import { getPrimaryImage } from "@/api/data-store";
import { formatIDR } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart-store";
import { openWhatsAppCheckout } from "@/lib/checkout";

export function CartPage() {
  const { t, lang } = useLang();
  const items = useCart((state) => state.items);
  const setQty = useCart((state) => state.setQty);
  const remove = useCart((state) => state.remove);
  const total = useCart((state) => state.total());

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
          {items.map((item) => (
            <li key={item.product.id} className="py-6 flex gap-4">
              <Link to={`/products/${item.product.id}`} className="shrink-0">
                <img
                  src={getPrimaryImage(item.product)}
                  alt={item.product.name}
                  className="h-28 w-24 object-cover rounded-md"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {item.product.category}
                </div>
                <Link
                  to={`/products/${item.product.id}`}
                  className="font-serif text-lg hover:underline"
                >
                  {item.product.name}
                </Link>
                <div className="text-sm text-muted-foreground mt-1">
                  {formatIDR(item.product.price)}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="inline-flex items-center border border-border rounded-full">
                    <button
                      onClick={() => setQty(item.product.id, item.qty - 1)}
                      className="h-8 w-8 grid place-items-center hover:bg-secondary rounded-l-full"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.qty}</span>
                    <button
                      onClick={() => setQty(item.product.id, item.qty + 1)}
                      className="h-8 w-8 grid place-items-center hover:bg-secondary rounded-r-full"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => remove(item.product.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-right font-medium">
                {formatIDR(item.product.price * item.qty)}
              </div>
            </li>
          ))}
        </ul>
        <CheckoutSummary
          items={items}
          total={total}
          onCheckout={() => openWhatsAppCheckout(items, total, lang)}
        />
      </div>
    </div>
  );
}
