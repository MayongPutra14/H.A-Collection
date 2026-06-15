import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { formatIDR } from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductDetailDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {product.images.length > 0 && (
            <Carousel className="w-full max-w-md mx-auto">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={`${image}-${index}`}>
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-80 w-full rounded-lg object-cover"
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Category</div>
              <div className="mt-1 font-medium">{product.category}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Price</div>
              <div className="mt-1 font-medium">{formatIDR(product.price)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Material</div>
              <div className="mt-1 font-medium">{product.material || "—"}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Sizes</div>
              <div className="mt-1 font-medium">{product.sizes?.join(", ") || "—"}</div>
            </div>
            <div className="sm:col-span-2">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Status</div>
              <div className="mt-1">
                <Badge variant={product.archived ? "secondary" : "default"}>
                  {product.archived ? "Archived" : "Active"}
                </Badge>
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Description
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {product.description.id}
              </p>
            </div>
            <div className="sm:col-span-2">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Shopee URL
              </div>
              <a
                href={product.shopee_url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-primary underline"
              >
                {product.shopee_url}
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
