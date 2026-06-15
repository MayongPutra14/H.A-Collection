import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, saveSettings } from "@/api/settings";
import type { StoreSettings } from "@/types/admin";

export const settingsKeys = {
  all: ["settings"] as const,
  current: () => [...settingsKeys.all, "current"] as const,
};

export function useSettings() {
  return useQuery({
    queryKey: settingsKeys.current(),
    queryFn: getSettings,
  });
}

export function useSaveSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: Omit<StoreSettings, "updatedAt">) =>
      Promise.resolve(saveSettings(settings)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: settingsKeys.all }),
  });
}
