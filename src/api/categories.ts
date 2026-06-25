import { supabase } from "@/lib/supabase";
import type { Category } from "@/types/admin";

export const listCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error || !data || data.length === 0) {
    console.error("Failed to fetch categories:", error?.message);
    return [];
  }

  return data.map((item) => ({
    id: String(item.id),
    name: item.name,
    image_url: item.image_url,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));
};

export const createCategory = async (input: {
  name: string;
  image_url?: string;
}): Promise<Category> => {
  const normalized = input.name.trim();

  const { data, error } = await supabase
    .from("categories")
    .insert({
      name: normalized,
      image_url: input.image_url?.trim() || null,
    })
    .select()
    .single();

  if (error || !data || data.length === 0) {
    throw new Error(`Failed to create category ${error?.message}`);
  }

  return {
    id: String(data.id),
    name: data.name,
    image_url: data.image_url,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

export const updateCategory = async (
  id: number,
  name: string,
  image_url?: string,
): Promise<Category> => {
  const { data, error } = await supabase
    .from("categories")
    .update({
      name: name.trim(),
      image_url: image_url?.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .select()
    .eq("id", id)
    .single();

  if (error || !data || data.length === 0) {
    throw new Error(`Failed to update category ${error?.message}`);
  }

  return {
    id: String(data.id),
    name: data.name,
    image_url: data.image_url,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

export const deleteCategory = async (id: number): Promise<void> => {
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete category${error.message}`);
  }
};
