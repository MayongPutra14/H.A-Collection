import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { products as initial, formatIDR } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  const [products, setProducts] = useState(initial);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">{products.length} items in catalog</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const newP = {
                  id: `new-${Date.now()}`,
                  name: String(fd.get("name")),
                  description: { id: String(fd.get("description")), en: String(fd.get("description")) },
                  price: Number(fd.get("price")),
                  image_url: String(fd.get("image_url")),
                  shopee_url: String(fd.get("shopee_url")),
                  category: fd.get("category") as "Casual" | "Formal" | "Hijab",
                };
                setProducts((p) => [newP, ...p]);
                setOpen(false);
                toast.success("Product added (UI only)");
              }}
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><Label>Image URL</Label><Input name="image_url" required /></div>
                <div className="col-span-2"><Label>Name</Label><Input name="name" required /></div>
                <div><Label>Price (IDR)</Label><Input type="number" name="price" required /></div>
                <div>
                  <Label>Category</Label>
                  <Select name="category" defaultValue="Casual">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Casual">Casual</SelectItem>
                      <SelectItem value="Formal">Formal</SelectItem>
                      <SelectItem value="Hijab">Hijab</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2"><Label>Description</Label><Textarea name="description" rows={3} /></div>
                <div className="col-span-2"><Label>Shopee URL</Label><Input name="shopee_url" /></div>
              </div>
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3 text-right">ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-secondary/30">
                <td className="px-6 py-3 flex items-center gap-3">
                  <img src={p.image_url} alt="" className="h-10 w-10 rounded object-cover" />
                  <span className="font-medium">{p.name}</span>
                </td>
                <td className="px-6 py-3 text-muted-foreground">{p.category}</td>
                <td className="px-6 py-3">{formatIDR(p.price)}</td>
                <td className="px-6 py-3 text-right text-xs text-muted-foreground">{p.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
