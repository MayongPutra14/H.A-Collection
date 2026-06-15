import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "@/components/ImageUploader";
import { toNumber } from "@/lib/format";
import type { CreateProductInput, Product, ProductCategory } from "@/types/product";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: string[];
  product?: Product | null;
  onSubmit: (payload: CreateProductInput) => void | Promise<void>;
};

type FormState = {
  name: string;
  description: string;
  price: string;
  images: string[];
  shopee_url: string;
  category: string;
  material: string;
  sizes: string;
};

const emptyForm: FormState = {
  name: "",
  description: "",
  price: "",
  images: [],
  shopee_url: "",
  category: "Casual",
  material: "",
  sizes: "",
};

export function ProductFormDialog({ open, onOpenChange, categories, product, onSubmit }: Props) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description.id,
        price: String(product.price),
        images: product.images,
        shopee_url: product.shopee_url,
        category: product.category,
        material: product.material || "",
        sizes: product.sizes?.join(", ") || "",
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [product, open]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (form.name.trim().length < 2) nextErrors.name = "Name is required";
    if (form.description.trim().length < 10) nextErrors.description = "Description is required";
    if (toNumber(form.price) <= 0) nextErrors.price = "Price must be greater than 0";
    if (!form.images.length) nextErrors.images = "Upload at least one image";
    if (form.shopee_url.trim() && !/^https?:\/\//i.test(form.shopee_url.trim())) {
      nextErrors.shopee_url = "Use a valid Shopee URL";
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setPending(true);
    await onSubmit({
      name: form.name.trim(),
      description: { id: form.description.trim(), en: form.description.trim() },
      price: toNumber(form.price),
      images: form.images,
      shopee_url: form.shopee_url.trim(),
      category: form.category as ProductCategory,
      material: form.material.trim() || undefined,
      sizes: form.sizes
        ? form.sizes
            .split(",")
            .map((size) => size.trim())
            .filter(Boolean)
        : undefined,
    });
    setPending(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label>Images</Label>
              <ImageUploader
                value={form.images}
                onChange={(images) => setForm({ ...form, images })}
              />
              {errors.images && <p className="text-sm text-destructive">{errors.images}</p>}
            </div>
            <div className="sm:col-span-2">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>
            <div>
              <Label>Price</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(event) => setForm({ ...form, price: event.target.value })}
              />
              {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(category) => setForm({ ...form, category })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label>Description</Label>
              <Textarea
                rows={4}
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>
            <div>
              <Label>Material</Label>
              <Input
                value={form.material}
                onChange={(event) => setForm({ ...form, material: event.target.value })}
              />
            </div>
            <div>
              <Label>Sizes</Label>
              <Input
                value={form.sizes}
                onChange={(event) => setForm({ ...form, sizes: event.target.value })}
                placeholder="S, M, L"
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Shopee URL</Label>
              <Input
                value={form.shopee_url}
                onChange={(event) => setForm({ ...form, shopee_url: event.target.value })}
                placeholder="https://shopee.co.id/product/..."
              />
              {errors.shopee_url && <p className="text-sm text-destructive">{errors.shopee_url}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : product ? "Update Product" : "Save Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
