import { FormEvent, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "@/components/ImageUploader";
import {
  useCreateCategory,
  useDeleteCategory,
  useCategories,
  useUpdateCategory,
} from "@/hooks/use-categories";
import { uploadImage } from "@/api/storage";
import type { Category } from "@/types/admin";

export function CategoriesPage() {
  const { data: categories = [] } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [editing, setEditing] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setExistingImageUrl(editing.image_url || "");
    } else {
      setName("");
      setExistingImageUrl("");
      setImageFile(null);
    }
  }, [editing, open]);

  const handleAddNew = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditing(category);
    setExistingImageUrl(category.image_url || "");
    setOpen(true);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return;

    if (categories.some(
      (cat) => cat.name.toLowerCase() === name.trim().toLowerCase() && cat.id !== editing?.id,
    )) {
      toast.error("Category already exists");
      return;
    }

    setIsSubmitting(true);

    let imageUrl = existingImageUrl;
    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile, "uploads", "categories");
      } catch {
        toast.error("Failed to upload image");
        setIsSubmitting(false);
        return;
      }
    }

    if (editing) {
      updateCategory.mutate(
        { id: editing.id, name: name.trim(), image_url: imageUrl || undefined },
        {
          onSuccess: () => {
            setOpen(false);
            toast.success("Category updated");
          },
          onSettled: () => setIsSubmitting(false),
        },
      );
    } else {
      createCategory.mutate(
        { name: name.trim(), image_url: imageUrl || undefined },
        {
          onSuccess: () => {
            setOpen(false);
            toast.success("Category added");
          },
          onSettled: () => setIsSubmitting(false),
        },
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl">Categories</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage product category labels.</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Add New Category
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col gap-3 border-b border-border p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="font-medium">{category.name}</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  deleteCategory.mutate(category.id, {
                    onSuccess: () => toast.success("Category deleted"),
                  })
                }
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label>Category Name</Label>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Category name"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label>Category Image</Label>
              <ImageUploader
                files={imageFile ? [imageFile] : []}
                onChange={(files) => setImageFile(files[0] || null)}
                existingUrls={existingImageUrl ? [existingImageUrl] : []}
                onRemoveUrl={() => setExistingImageUrl("")}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : editing ? "Update" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}