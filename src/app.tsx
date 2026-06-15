import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ProtectedRoute } from "@/auth/ProtectedRoute";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LangProvider } from "@/lib/i18n";
import { HomePage } from "@/pages/HomePage";
import { CatalogPage } from "@/pages/CatalogPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { CartPage } from "@/pages/CartPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { BannersPage } from "@/pages/dashboard/BannersPage";
import { CategoriesPage } from "@/pages/dashboard/CategoriesPage";
import { DashboardLayout } from "@/pages/dashboard/DashboardLayout";
import { LoginPage } from "@/pages/dashboard/LoginPage";
import { OverviewPage } from "@/pages/dashboard/OverviewPage";
import { ProductsPage } from "@/pages/dashboard/ProductsPage";
import { SettingsPage } from "@/pages/dashboard/SettingsPage";
import "./app.css";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/dashboard/login" element={<LoginPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Navigate to="/dashboard/overview" replace />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/overview"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <OverviewPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/products"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <ProductsPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/categories"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <CategoriesPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/banners"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <BannersPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/settings"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <SettingsPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-center" />
        </BrowserRouter>
      </LangProvider>
    </QueryClientProvider>
  );
}
