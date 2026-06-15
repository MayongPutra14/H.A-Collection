import { FormEvent, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ImageUploader } from "@/components/ImageUploader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useCreateBanner,
  useDeleteBanner,
  useBanners,
  useToggleBanner,
  useUpdateBanner,
} from "@/hooks/use-banners";
import type { Banner } from "@/types/admin";

const emptyForm = { title: "", titleEn: "", subtitle: "", subtitleEn: "", description: "", descriptionEn: "", image_url: "" };

export function BannersPage() {
  const { data: banners = [] } = useBanners();
  const createBanner = useCreateBanner();
  const updateBanner = useUpdateBanner();
  const toggleBanner = useToggleBanner();
  const deleteBanner = useDeleteBanner();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        titleEn: editing.titleEn || "",
        subtitle: editing.subtitle || "",
        subtitleEn: editing.subtitleEn || "",
        description: editing.description || "",
        descriptionEn: editing.descriptionEn || "",
        image_url: editing.image_url,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editing, open]);

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (banner: Banner) => {
    setEditing(banner);
    setOpen(true);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim() || !form.image_url) return;

    if (editing) {
      updateBanner.mutate(
        {
          id: editing.id,
          input: {
            title: form.title.trim(),
            titleEn: form.titleEn.trim() || undefined,
            subtitle: form.subtitle.trim(),
            subtitleEn: form.subtitleEn.trim() || undefined,
            description: form.description.trim(),
            descriptionEn: form.descriptionEn.trim() || undefined,
            image_url: form.image_url,
          },
        },
        {
          onSuccess: () => {
            setOpen(false);
            toast.success("Banner updated");
          },
        },
      );
      return;
    }

    createBanner.mutate(
      {
        title: form.title.trim(),
        titleEn: form.titleEn.trim() || undefined,
        subtitle: form.subtitle.trim(),
        subtitleEn: form.subtitleEn.trim() || undefined,
        description: form.description.trim(),
        descriptionEn: form.descriptionEn.trim() || undefined,
        image_url: form.image_url,
      },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Banner added");
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl">Banners</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage home page hero banners.</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Add Banner
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Thumbnail</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {banners.map((banner) => (
              <tr key={banner.id} className="hover:bg-secondary/30">
                <td className="px-4 py-3">
                  <img src={banner.image_url} alt="" className="h-14 w-20 rounded object-cover" />
                </td>
                <td className="px-4 py-3 font-medium">{banner.title}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={banner.status === "Active" ? "default" : "secondary"}>
                      {banner.status}
                    </Badge>
                    <Switch
                      checked={banner.status === "Active"}
                      onCheckedChange={(checked) =>
                        toggleBanner.mutate(
                          { id: banner.id, status: checked ? "Active" : "Inactive" },
                          {
                            onSuccess: () =>
                              toast.success(checked ? "Banner activated" : "Banner deactivated"),
                          },
                        )
                      }
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(banner)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (window.confirm("Delete this banner?")) {
                          deleteBanner.mutate(banner.id, {
                            onSuccess: () => toast.success("Banner deleted"),
                          });
                        }
                      }}
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Banner" : "Add Banner"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
<div>
               <Label>Banner Title</Label>
               <Input
                 value={form.title}
                 onChange={(event) => setForm({ ...form, title: event.target.value })}
                 placeholder="New Season Collection"
               />
             </div>
             <div>
               <Label>Banner Title (English)</Label>
               <Input
                 value={form.titleEn}
                 onChange={(event) => setForm({ ...form, titleEn: event.target.value })}
                 placeholder="New Season Collection"
               />
             </div>
             <div>
               <Label>Banner Subtitle</Label>
               <Input
                 value={form.subtitle}
                 onChange={(event) => setForm({ ...form, subtitle: event.target.value })}
                 placeholder="Subtitle banner..."
               />
             </div>
             <div>
               <Label>Banner Subtitle (English)</Label>
               <Input
                 value={form.subtitleEn}
                 onChange={(event) => setForm({ ...form, subtitleEn: event.target.value })}
                 placeholder="Banner subtitle..."
               />
             </div>
             <div>
               <Label>Banner Description</Label>
               <Textarea
                 value={form.description}
                 onChange={(event) => setForm({ ...form, description: event.target.value })}
                 placeholder="Deskripsi banner..."
                 rows={3}
               />
             </div>
             <div>
               <Label>Banner Description (English)</Label>
               <Textarea
                 value={form.descriptionEn}
                 onChange={(event) => setForm({ ...form, descriptionEn: event.target.value })}
                 placeholder="Banner description..."
                 rows={3}
               />
             </div>
             <div>
               <Label>Banner Image</Label>
              <ImageUploader
                value={form.image_url ? [form.image_url] : []}
                onChange={(images) => setForm({ ...form, image_url: images[0] || "" })}
                label="Upload banner image"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editing ? "Update Banner" : "Submit"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
