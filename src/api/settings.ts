import { supabase } from "@/lib/supabase";
import type { StoreSettings } from "@/types/admin";

export const getSettings = async (): Promise<StoreSettings | null> => {
  const { data, error } = await supabase.from("store_settings").select("*").single();

  if (error) {
    console.error("Gagal mengambil settings:", error.message);
    return null;
  }
  return data as unknown as StoreSettings;
};

export const saveSettings = async (
  settings: Omit<StoreSettings, "updatedAt">,
): Promise<StoreSettings | null> => {
  const { data, error } = await supabase
    .from("store_settings")
    .upsert({
      ...settings,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Gagal menyimpan settings:", error.message);
    throw new Error(error.message);
  }
  return data as unknown as StoreSettings;
};
