import { readCategories, writeCategories } from "@/api/data-store";
import type { Category } from "@/types/admin";

export const listCategories = () => readCategories().sort((a, b) => a.name.localeCompare(b.name));

export const createCategory = (name: string): Category => {
  const categories = readCategories();
  const normalized = name.trim();
  const timestamp = new Date().toISOString();
  const category: Category = {
    id: `category-${Date.now()}`,
    name: normalized,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  writeCategories([...categories, category]);
  return category;
};

export const updateCategory = (id: string, name: string): Category => {
  const categories = readCategories();
  const timestamp = new Date().toISOString();
  const nextCategories = categories.map((category) =>
    category.id === id ? { ...category, name: name.trim(), updatedAt: timestamp } : category,
  );
  writeCategories(nextCategories);
  const updated = nextCategories.find((category) => category.id === id);
  if (!updated) throw new Error("Category not found");
  return updated;
};

export const deleteCategory = (id: string) => {
  writeCategories(readCategories().filter((category) => category.id !== id));
};
