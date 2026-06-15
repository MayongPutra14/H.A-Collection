import { readBanners, writeBanners } from "@/api/data-store";
import type { Banner, BannerStatus } from "@/types/admin";

export const listBanners = () =>
  readBanners().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

export const getActiveBanner = () => listBanners().find((banner) => banner.status === "Active");

export const createBanner = (input: {
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  description: string;
  descriptionEn?: string;
  image_url: string;
}): Banner => {
  const banners = readBanners();
  const timestamp = new Date().toISOString();
  const banner: Banner = {
    id: `banner-${Date.now()}`,
    title: input.title.trim(),
    titleEn: input.titleEn?.trim() || undefined,
    subtitle: input.subtitle.trim(),
    subtitleEn: input.subtitleEn?.trim() || undefined,
    description: input.description.trim(),
    descriptionEn: input.descriptionEn?.trim() || undefined,
    image_url: input.image_url.trim(),
    status: "Active",
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  writeBanners([banner, ...banners]);
  return banner;
};

export const updateBanner = (
  id: string,
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
): Banner => {
  const banners = readBanners();
  const timestamp = new Date().toISOString();
  const nextBanners = banners.map((banner) =>
    banner.id === id
      ? {
          ...banner,
          ...input,
          updatedAt: timestamp,
        }
      : banner,
  );
  writeBanners(nextBanners);
  const updated = nextBanners.find((banner) => banner.id === id);
  if (!updated) throw new Error("Banner not found");
  return updated;
};

export const toggleBanner = (id: string, status: BannerStatus) => updateBanner(id, { status });

export const deleteBanner = (id: string) => {
  writeBanners(readBanners().filter((banner) => banner.id !== id));
};
