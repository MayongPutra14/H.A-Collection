import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, deleteCategory, listCategories, updateCategory } from "@/api/categories";

export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: listCategories,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { name: string; image_url?: string }) => Promise.resolve(createCategory(input)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: categoryKeys.all }),
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name, image_url }: { id: string; name: string; image_url?: string }) =>
      Promise.resolve(updateCategory(id, name, image_url)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: categoryKeys.all }),
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => Promise.resolve(deleteCategory(id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: categoryKeys.all }),
  });
}
