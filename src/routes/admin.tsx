import { createFileRoute, Link, Outlet, useRouterState, redirect } from "@tanstack/react-router";
import { LayoutGrid, Settings, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/admin") throw redirect({ to: "/admin/products" });
  },
  component: AdminLayout,
});

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const nav = [
    { to: "/admin/products", label: "Products", icon: LayoutGrid },
    { to: "/admin/settings", label: "Settings", icon: Settings },
  ];
  return (
    <div className="min-h-screen flex bg-secondary/30">
      <aside className="w-60 bg-primary text-primary-foreground p-6 flex flex-col">
        <Link to="/" className="font-serif text-xl">H.A Admin</Link>
        <nav className="mt-10 space-y-1 text-sm">
          {nav.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition",
                  active ? "bg-primary-foreground/15" : "text-primary-foreground/70 hover:bg-primary-foreground/10"
                )}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <Link to="/" className="mt-auto text-xs text-primary-foreground/60 hover:text-primary-foreground inline-flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" /> Back to site
        </Link>
      </aside>
      <main className="flex-1 p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
