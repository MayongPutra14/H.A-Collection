import { Link } from "react-router-dom";
import { PackageCheck, ArrowRight, MousePointerClick, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCategories } from "@/hooks/use-categories";
import { useProducts } from "@/hooks/use-products";

const topPerformingProducts = [
  {
    id: "ab-001",
    name: "Noor Abaya — Midnight",
    image_url:
      "https://images.unsplash.com/photo-1611042553484-d61f84d22784?auto=format&fit=crop&w=300&q=80",
    category: "Formal",
    clicks: 184,
  },
  {
    id: "hj-001",
    name: "Soft Voal Hijab — Ivory",
    image_url:
      "https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&w=300&q=80",
    category: "Hijab",
    clicks: 156,
  },
  {
    id: "ab-002",
    name: "Layla Abaya — Sand",
    image_url:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=300&q=80",
    category: "Casual",
    clicks: 132,
  },
  {
    id: "ab-005",
    name: "Zahra Abaya — Pearl",
    image_url:
      "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?auto=format&fit=crop&w=300&q=80",
    category: "Formal",
    clicks: 98,
  },
];

export function OverviewPage() {
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl">Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor catalog performance and daily store activity.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Products</CardTitle>
            <PackageCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{products.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Products currently listed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Checkout Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">1,284</div>
            <p className="text-xs text-muted-foreground mt-1">Simulated WhatsApp checkout clicks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
            <Tags className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{categories.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Casual, Formal, Hijab</p>
          </CardContent>
        </Card>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage catalog and homepage content faster.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button asChild className="h-12">
                <Link to="/dashboard/products">
                  Add New Product <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12">
                <Link to="/dashboard/banners">
                  Update Hero Banner <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Store Health</CardTitle>
            <CardDescription>Quick snapshot of catalog readiness.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Catalog status</span>
                <Badge>Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Checkout channel</span>
                <Badge variant="secondary">WhatsApp</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Admin mode</span>
                <Badge variant="outline">Demo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>Mock engagement data for catalog optimization.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Product Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-right">Total Clicks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {topPerformingProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <img
                        src={product.image_url}
                        alt=""
                        className="h-12 w-12 rounded object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{product.category}</td>
                    <td className="px-4 py-3 text-right font-semibold">{product.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
