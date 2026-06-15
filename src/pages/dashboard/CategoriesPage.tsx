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
import {
  useCreateCategory,
  useDeleteCategory,
  useCategories,
  useUpdateCategory,
} from "@/hooks/use-categories";
import type { Category } from "@/types/admin";

export function CategoriesPage() {
  const { data: categories = [] } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const [name, setName] = useState("");
  const [editing, setEditing] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setName(editing?.name || "");
  }, [editing]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return;

    if (
      categories.some(
        (category) =>
          category.name.toLowerCase() === name.trim().toLowerCase() && category.id !== editing?.id,
      )
    ) {
      toast.error("Category already exists");
      return;
    }

    createCategory.mutate(name.trim(), {
      onSuccess: () => {
        setName("");
        toast.success("Category added");
      },
    });
  };

  const startEdit = (category: Category) => {
    setEditing(category);
    setOpen(true);
  };

  const submitEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editing || !name.trim()) return;

    updateCategory.mutate(
      { id: editing.id, name: name.trim() },
      {
        onSuccess: () => {
          setOpen(false);
          setEditing(null);
          setName("");
          toast.success("Category updated");
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Categories</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage product category labels.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Add new category"
            className="min-w-0 flex-1"
          />
          <Button type="submit" className="whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" /> Add New Category
          </Button>
        </form>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col gap-3 border-b border-border p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="font-medium">{category.name}</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => startEdit(category)}>
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
          <form onSubmit={submitEdit} className="space-y-4">
            <div>
              <Label>Category Name</Label>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Category name"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editing ? "Update" : "Save"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
