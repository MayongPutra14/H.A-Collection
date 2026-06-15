import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatIDR } from "@/lib/format";
import { SHOPEE_BASE_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart-store";
import { useProductById } from "@/hooks/use-products";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function ProductDetailPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProductById(id);
  const { lang, t } = useLang();
  const add = useCart((state) => state.add);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center text-muted-foreground">
        Loading product...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-serif text-4xl">Product not found</h1>
        <Link to="/catalog" className="mt-6 inline-block text-primary underline">
          Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pt-8 pb-24">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> {t("nav_catalog")}
      </button>
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <div>
          {product.images.length > 0 && (
            <Carousel className="rounded-xl bg-secondary/40">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={`${image}-${index}`}>
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {product.images.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
            {product.category}
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl leading-tight">{product.name}</h1>
          <div className="mt-4 text-2xl text-foreground/90">{formatIDR(product.price)}</div>

          <p className="mt-8 text-foreground/75 leading-relaxed">{product.description[lang]}</p>

          <dl className="mt-8 grid grid-cols-2 gap-6 text-sm border-t border-border pt-6">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                {t("material")}
              </dt>
              <dd>{product.material}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                {t("size")}
              </dt>
              <dd>{product.sizes?.join(", ")}</dd>
            </div>
          </dl>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              size="lg"
              className="bg-shopee text-shopee-foreground hover:bg-shopee/90 h-12"
              asChild
            >
              <a
                href={product.shopee_url || SHOPEE_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("buy_shopee")}
              </a>
            </Button>
            <Button
              size="lg"
              className="h-12"
              onClick={() => {
                add(product);
                toast.success(t("added_toast"), { description: product.name });
              }}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              {t("add_to_cart")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
