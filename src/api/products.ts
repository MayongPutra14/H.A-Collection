import { readProducts, writeProducts } from "@/api/data-store";
import type {
  CreateProductInput,
  Product,
  ProductFilters,
  UpdateProductInput,
} from "@/types/product";

export const listProducts = (filters: ProductFilters = {}): Product[] => {
  const query = filters.query?.trim().toLowerCase() ?? "";
  const category = filters.category ?? "All";

  return readProducts()
    .filter((product) => !product.archived || filters.includeArchived)
    .filter((product) => category === "All" || product.category === category)
    .filter((product) => {
      if (!query) return true;
      return [product.name, product.description.id, product.description.en, product.category]
        .join(" ")
        .toLowerCase()
        .includes(query);
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const getProductById = (id: string) =>
  readProducts().find((product) => product.id === id && !product.archived);

export const createProduct = (input: CreateProductInput): Product => {
  const products = readProducts();
  const timestamp = new Date().toISOString();
  const product: Product = {
    ...input,
    id: `product-${Date.now()}`,
    image_url: input.images[0] || input.image_url || "",
    archived: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  writeProducts([product, ...products]);
  return product;
};

export const updateProduct = (id: string, input: UpdateProductInput): Product => {
  const products = readProducts();
  const timestamp = new Date().toISOString();
  const nextProducts = products.map((product) =>
    product.id === id
      ? {
          ...product,
          ...input,
          image_url: input.images?.[0] || input.image_url || product.image_url,
          images: input.images?.length ? input.images : product.images,
          updatedAt: timestamp,
        }
      : product,
  );
  writeProducts(nextProducts);
  const updated = nextProducts.find((product) => product.id === id);
  if (!updated) throw new Error("Product not found");
  return updated;
};

export const archiveProduct = (id: string, archived: boolean) => updateProduct(id, { archived });

export const deleteProduct = (id: string) => {
  writeProducts(readProducts().filter((product) => product.id !== id));
};
