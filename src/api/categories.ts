import { readCategories, writeCategories } from "@/api/data-store";
import type { Category } from "@/types/admin";

export const listCategories = () => readCategories().sort((a, b) => a.name.localeCompare(b.name));

export const createCategory = (input: { name: string; image_url?: string }): Category => {
  const categories = readCategories();
  const normalized = input.name.trim();
  const timestamp = new Date().toISOString();
  const category: Category = {
    id: `category-${Date.now()}`,
    name: normalized,
    image_url: input.image_url?.trim() || undefined,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  writeCategories([...categories, category]);
  return category;
};

export const updateCategory = (id: string, name: string, image_url?: string): Category => {
  const categories = readCategories();
  const timestamp = new Date().toISOString();
  const nextCategories = categories.map((category) =>
    category.id === id ? { ...category, name: name.trim(), image_url: image_url?.trim() || category.image_url, updatedAt: timestamp } : category,
  );
  writeCategories(nextCategories);
  const updated = nextCategories.find((category) => category.id === id);
  if (!updated) throw new Error("Category not found");
  return updated;
};

export const deleteCategory = (id: string) => {
  writeCategories(readCategories().filter((category) => category.id !== id));
};
