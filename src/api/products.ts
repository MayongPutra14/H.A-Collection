import { readProducts, writeProducts } from "@/api/data-store";
import { supabase } from "@/lib/supabase";
import type {
  CreateProductInput,
  Product,
  ProductFilters,
  UpdateProductInput,
} from "@/types/product";

export const listProducts = async (filters: ProductFilters = {}): Promise<Product[]> => {
  let query = supabase.from("products").select("*");
  if (!filters.includeArchived) {
    query = query.eq("archived", false);
  }

  if (filters.category && filters.category !== "All") {
    query = query.eq("categories", filters.category);
  }

  if (filters.query) {
    query = query.ilike("name", `%${filters.query}`);
  }

  const { data, error } = await query.order("name", { ascending: true });
  if (error) {
    console.error("failed fetch prducts: ", error.message);
  }

  return data as unknown as Product[];
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("archived", false)
    .single();

  if (error) {
    console.error("Product not found:", error.message);
  }
  return data as unknown as Product;
};

export const createProduct = async (input: CreateProductInput): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .insert({
      name: input.name,
      description_id: input.description.id,
      description_en: input.description.en,
      price: input.price,
      image_url: input.image_url,
      images: JSON.stringify(input.images),
      shopee_url: input.shopee_url,
      material: input.material,
      sizes: input.sizes,
      categories: input.categories,
      archived: input.archived,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data as unknown as Product;
};

export const updateProduct = async (id: string, input: UpdateProductInput): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .update({
      ...input,
      image_url: input.images?.[0] || input.image_url,
      images: input.images ? JSON.stringify(input.images) : undefined,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error?.message);
  }
  return data as unknown as Product;
};

export const archiveProduct = async (id: string, archived: boolean) => {
  const { error } = await supabase.from("products").update({ archived }).eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
};
