import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBanner, deleteBanner, listBanners, toggleBanner, updateBanner } from "@/api/banners";
import type { BannerStatus } from "@/types/admin";

export const bannerKeys = {
  all: ["banners"] as const,
  lists: () => [...bannerKeys.all, "list"] as const,
};

export function useBanners() {
  return useQuery({
    queryKey: bannerKeys.lists(),
    queryFn: listBanners,
  });
}

export function useCreateBanner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      title: string;
      titleEn?: string;
      subtitle: string;
      subtitleEn?: string;
      description: string;
      descriptionEn?: string;
      image_url: string;
    }) => Promise.resolve(createBanner(input)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: bannerKeys.all }),
  });
}

export function useUpdateBanner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: {
        title?: string;
        titleEn?: string;
        subtitle?: string;
        subtitleEn?: string;
        description?: string;
        descriptionEn?: string;
        image_url?: string;
        status?: BannerStatus;
      };
    }) => Promise.resolve(updateBanner(id, input)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: bannerKeys.all }),
  });
}

export function useToggleBanner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: BannerStatus }) =>
      Promise.resolve(toggleBanner(id, status)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: bannerKeys.all }),
  });
}

export function useDeleteBanner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => Promise.resolve(deleteBanner(id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: bannerKeys.all }),
  });
}
