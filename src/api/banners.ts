import { supabase } from "@/lib/supabase";
import type { Banner, BannerStatus } from "@/types/admin";

export const listBanners = async (): Promise<Banner[]> => {
  const { data, error } = await supabase.from("banners").select("*");
  if (error) {
    console.error("Failed to fetch banners:", error.message);
    return [];
  }
  if (!data) return [];

  return data.map((item) => ({
    id: String(item.id),
    title: item.title,
    titleEn: item.title_en ?? undefined,
    subtitle: item.subtitle ?? "",
    subtitleEn: item.subtitle_en ?? undefined,
    description: item.description ?? "",
    descriptionEn: item.description_en ?? undefined,
    image_url: item.image_url,
    status: item.status as BannerStatus,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));
};

export const getActiveBanner = async (): Promise<Banner[]> => {
  const { data, error } = await supabase.from("banners").select("*").eq("status", "Active");
  if (error) {
    console.error("Failed to fetch active banners:", error.message);
    return [];
  }
  if (!data) return [];

  return data.map((item) => ({
    id: String(item.id),
    title: item.title,
    titleEn: item.title_en ?? undefined,
    subtitle: item.subtitle ?? "",
    subtitleEn: item.subtitle_en ?? undefined,
    description: item.description ?? "",
    descriptionEn: item.description_en ?? undefined,
    image_url: item.image_url,
    status: item.status as BannerStatus,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));
};

export const createBanner = async (input: {
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  description: string;
  descriptionEn?: string;
  image_url: string;
}): Promise<Banner> => {
  const { data, error } = await supabase
    .from("banners")
    .insert({
      title: input.title,
      title_en: input.titleEn,
      subtitle: input.subtitle,
      subtitle_en: input.subtitleEn,
      description: input.description,
      description_en: input.descriptionEn,
      image_url: input.image_url,
    })
    .select()
    .single();

  if (error || !data) throw new Error(`Failed to create banner ${error?.message}`);

  return {
    id: String(data.id),
    title: data.title,
    titleEn: data.title_en ?? undefined,
    subtitle: data.subtitle ?? "",
    subtitleEn: data.subtitle_en ?? undefined,
    description: data.description ?? "",
    descriptionEn: data.description_en ?? undefined,
    image_url: data.image_url,
    status: data.status as BannerStatus,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

export const updateBanner = async (
  id: string | number,
  input: {
    title?: string;
    titleEn?: string;
    subtitle?: string;
    subtitleEn?: string;
    description?: string;
    descriptionEn?: string;
    image_url?: string;
    status?: BannerStatus;
  },
): Promise<void> => {
  const { data, error } = await supabase
    .from("banners")
    .update({
      title: input.title,
      title_en: input.titleEn,
      subtitle: input.subtitle,
      subtitle_en: input.subtitleEn,
      description: input.description,
      description_en: input.descriptionEn,
      image_url: input.image_url,
      status: input.status,
    })
    .eq("id", Number(id))
    .select()
    .single();

  if (error || !data) throw new Error(`Failed to update banner: ${error?.message}`);
};

export const toggleBanner = async (id: string | number, status: BannerStatus): Promise<void> => {
  await updateBanner(id, { status });
};

export const deleteBanner = async (id: string | number): Promise<void> => {
  const { error } = await supabase.from("banners").delete().eq("id", Number(id));
  if (error) throw new Error(`Failed to delete banner: ${error.message}`);
};
