import { useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { formatIDR } from "@/lib/format";
import {
  useArchiveProduct,
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";
import type { CreateProductInput, Product } from "@/types/product";
import { ProductFormDialog } from "@/components/ProductFormDialog";
import { ProductDetailDialog } from "@/components/ProductDetailDialog";

export function ProductsPage() {
  const { data: products = [] } = useProducts({ includeArchived: true });
  const { data: categories = [] } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const archiveProduct = useArchiveProduct();
  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openCreate = () => {
    setSelectedProduct(null);
    setFormOpen(true);
  };

  const openEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormOpen(true);
  };

  const openDetail = (product: Product) => {
    setSelectedProduct(product);
    setDetailOpen(true);
  };

  const submitProduct = (payload: CreateProductInput) => {
    if (selectedProduct) {
      updateProduct.mutate(
        { id: selectedProduct.id, input: payload },
        {
          onSuccess: () => {
            setFormOpen(false);
            toast.success("Product updated");
          },
        },
      );
      return;
    }

    createProduct.mutate(payload, {
      onSuccess: () => {
        setFormOpen(false);
        toast.success("Product added");
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage product catalog, images, status, and details.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-secondary/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0] || product.image_url}
                      alt=""
                      className="h-12 w-12 rounded object-cover"
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{product.category}</td>
                <td className="px-4 py-3 font-medium">{formatIDR(product.price)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={product.archived ? "secondary" : "default"}>
                      {product.archived ? "Archived" : "Active"}
                    </Badge>
                    <Switch
                      checked={!product.archived}
                      onCheckedChange={(checked) =>
                        archiveProduct.mutate(
                          { id: product.id, archived: !checked },
                          {
                            onSuccess: () =>
                              toast.success(checked ? "Product activated" : "Product archived"),
                          },
                        )
                      }
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDetail(product)}
                      aria-label="View product"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEdit(product)}
                      aria-label="Edit product"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (window.confirm("Delete this product?")) {
                          deleteProduct.mutate(product.id, {
                            onSuccess: () => toast.success("Product deleted"),
                          });
                        }
                      }}
                      aria-label="Delete product"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        categories={categories.map((category) => category.name)}
        product={selectedProduct}
        onSubmit={submitProduct}
      />
      <ProductDetailDialog
        product={selectedProduct}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  );
}
