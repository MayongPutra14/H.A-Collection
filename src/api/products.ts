import { supabase } from "@/lib/supabase";
import type {
  CreateProductInput,
  Product,
  ProductFilters,
  UpdateProductInput,
} from "@/types/product";

export const listProducts = async (filters: ProductFilters = {}): Promise<Product[]> => {
  let query = supabase.from("products").select(`*, categories(id, name)`);
  if (!filters.includeArchived) {
    query = query.eq("archived", false);
  }

  if (filters.category && filters.category !== "All") {
    query = query.eq("categories.name", filters.category);
    query = query.not("categories", "is", null);
  }

  if (filters.query) {
    query = query.ilike("name", `%${filters.query}%`);
  }

  const { data, error } = await query.order("name", { ascending: true });
  if (error || !data) {
    console.error("Gagal mengambil produk:", error?.message);
    return [];
  }

  return data.map((item) => {
    const categoryName = item.categories ? item.categories.name : "";

    return {
      id: String(item.id),
      name: item.name,
      description: {
        id: item.description_id || "",
        en: item.description_en || "",
      },
      price: Number(item.price),
      image_url: item.image_url || "",
      images: item.images
        ? typeof item.images === "string"
          ? JSON.parse(item.images)
          : item.images
        : [],
      shopee_url: item.shopee_url || "",
      material: item.material || "",
      sizes: item.sizes || [],
      archived: item.archived,
      category: String(categoryName),
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    };
  });
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .select(`*, categories(id, name)`)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Product not found:", error.message);
    return null;
  }

  if (!data) return null;
  const categoryName = data.categories ? data.categories.name : "";

  return {
    id: String(data.id),
    name: data.name,
    description: { id: data.description_id || "", en: data.description_en || "" },
    price: Number(data.price),
    image_url: data.image_url || "",
    images: data.images ? JSON.parse(data.images) : [],
    shopee_url: data.shopee_url || "",
    material: data.material || "",
    sizes: data.sizes || [],
    archived: data.archived,
    category: String(categoryName),
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

export const createProduct = async (input: CreateProductInput): Promise<Product> => {
  let matchedCategoryId: number | null = null;

  if (input.category) {
    const { data: catData } = await supabase
      .from("categories")
      .select("id")
      .eq("name", input.category)
      .single();
    if (catData) {
      matchedCategoryId = catData.id;
    }
  }

  const { data, error } = await supabase
    .from("products")
    .insert({
      name: input.name,
      description_id: input.description.id,
      description_en: input.description.en,
      price: input.price,
      image_url: input.images?.[0] || input.image_url || "",
      images: JSON.stringify(input.images),
      shopee_url: input.shopee_url,
      material: input.material,
      sizes: input.sizes,
      category_id: matchedCategoryId,
      archived: input.archived ?? false,
    })
    .select(`*, categories(id, name)`)
    .single();

  if (error || !data) throw new Error(`Failed to create product: ${error?.message}`);
  const categoryName = data.categories ? data.categories.name : "";
  return {
    id: String(data.id),
    name: data.name,
    description: { id: data.description_id || "", en: data.description_en || "" },
    price: Number(data.price),
    image_url: data.image_url || "",
    images: data.images ? JSON.parse(data.images) : [],
    shopee_url: data.shopee_url || "",
    material: data.material || "",
    sizes: data.sizes || [],
    archived: data.archived,
    category: String(categoryName),
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

export const updateProduct = async (id: string, input: UpdateProductInput): Promise<Product> => {
  let matchedCategoryId: number | null = null;

  if (input.category) {
    const { data: catData } = await supabase
      .from("categories")
      .select("id")
      .eq("name", input.category)
      .single();
    if (catData) {
      matchedCategoryId = catData.id;
    }
  }

  const { data, error } = await supabase
    .from("products")
    .update({
      name: input.name,
      description_id: input.description?.id,
      description_en: input.description?.en,
      price: input.price,
      image_url: input.images?.[0] || input.image_url,
      images: input.images ? JSON.stringify(input.images) : undefined,
      shopee_url: input.shopee_url,
      material: input.material,
      sizes: input.sizes,
      category_id: matchedCategoryId,
      archived: input.archived,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select(`*, categories(id, name)`)
    .single();

  if (error || !data) throw new Error(error?.message);

  const categoryName = data.categories ? data.categories.name : "";
  return {
    id: String(data.id),
    name: data.name,
    description: { id: data.description_id || "", en: data.description_en || "" },
    price: Number(data.price),
    image_url: data.image_url || "",
    images: data.images ? JSON.parse(data.images) : [],
    shopee_url: data.shopee_url || "",
    material: data.material || "",
    sizes: data.sizes || [],
    archived: data.archived,
    category: String(categoryName),
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

export const archiveProduct = async (id: string, archived: boolean): Promise<void> => {
  const { error } = await supabase.from("products").update({ archived }).eq("id", id);
  if (error) {
    throw new Error(`Failed to archive product: ${error.message}`);
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
};
