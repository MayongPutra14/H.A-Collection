export type ProductCategory = string;

export type Product = {
  id: string;
  name: string;
  description: { id: string; en: string };
  price: number;
  image_url: string;
  images: string[];
  shopee_url: string;
  category: ProductCategory;
  material?: string;
  sizes?: string[];
  archived?: boolean;
  categories?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductFilters = {
  query?: string;
  category?: ProductCategory | "All";
  includeArchived?: boolean;
};

export type CreateProductInput = Omit<Product, "id" | "createdAt" | "updatedAt" | "image_url"> & {
  image_url?: string;
};

export type UpdateProductInput = Partial<CreateProductInput> & {
  archived?: boolean;
};

export type DashboardProductFormData = {
  name: string;
  description: string;
  price: string;
  images: string[];
  shopee_url: string;
  category: ProductCategory;
  material?: string;
  sizes?: string;
};
