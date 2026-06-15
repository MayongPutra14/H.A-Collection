import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  Tags,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { logoutAdmin } from "@/auth/ProtectedRoute";

const nav = [
  { to: "/dashboard/overview", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/products", label: "Products", icon: Package },
  { to: "/dashboard/categories", label: "Categories", icon: Tags },
  { to: "/dashboard/banners", label: "Banners", icon: Image },
  { to: "/dashboard/settings", label: "Store Settings", icon: Settings },
];

function isActivePath(pathname: string, to: string) {
  if (to === "/dashboard/overview") {
    return pathname === "/dashboard" || pathname === "/dashboard/";
  }

  return pathname.startsWith(to);
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();

  return (
    <div className="flex h-full flex-col">
      <Link
        to="/dashboard/overview"
        onClick={onNavigate}
        className="font-serif text-xl text-primary-foreground"
      >
        H.A Admin
      </Link>
      <nav className="mt-10 space-y-1 text-sm">
        {nav.map((item) => {
          const active = isActivePath(pathname, item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 transition",
                active
                  ? "bg-primary-foreground/15 text-primary-foreground"
                  : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto space-y-3">
        <Button
          variant="ghost"
          className="w-full justify-start text-primary-foreground/70 hover:text-primary-foreground"
          asChild
        >
          <Link to="/" onClick={onNavigate} className="inline-flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Back to site
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-primary-foreground/70 hover:text-destructive"
          onClick={() => {
            onNavigate?.();
            logoutAdmin();
            window.location.href = "/dashboard/login";
          }}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-secondary/30">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-primary p-6 md:flex">
        <SidebarContent />
      </aside>

      <div className="md:pl-64">
        <div className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur md:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <Link to="/dashboard/overview" className="font-serif text-xl text-primary">
              H.A Admin
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open dashboard menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-primary p-6 text-primary-foreground">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
