import { supabase } from "@/lib/supabase";
import type { StoreSettings } from "@/types/admin";

export const getSettings = async (): Promise<StoreSettings | null> => {
  const { data, error } = await supabase.from("store_settings").select("*").single();

  if (error) {
    console.error("Gagal mengambil settings:", error.message);
    return null;
  }

  if (!data || data.length === 0) return null;

  return {
    adminWhatsApp: data.admin_whatsapp || "",
    shopeeStoreUrl: data.shopee_store_url || "",
    shopeeUrl: data.shopee_url || "",
    tiktokUrl: data.tiktok_url || "",
    instagramUrl: data.instagram_url || "",
    facebookUrl: data.facebook_url || "",
    updatedAt: data.updated_at || new Date().toISOString(),
  };
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
    throw new Error(`Gagal menyimpan settings: ${error.message}`);
  }

  if (!data || data.length === 0) return null;
  return {
    adminWhatsApp: data.admin_whatsapp || "",
    shopeeStoreUrl: data.shopee_store_url || "",
    shopeeUrl: data.shopee_url || "",
    tiktokUrl: data.tiktok_url || "",
    instagramUrl: data.instagram_url || "",
    facebookUrl: data.facebook_url || "",
    updatedAt: data.updated_at || new Date().toISOString(),
  };
};
