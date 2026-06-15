export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type BannerStatus = "Active" | "Inactive";

export type Banner = {
  id: string;
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  description: string;
  descriptionEn?: string;
  image_url: string;
  status: BannerStatus;
  createdAt: string;
  updatedAt: string;
};

export type StoreSettings = {
  adminWhatsApp: string;
  shopeeStoreUrl: string;
  shopeeUrl?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  updatedAt: string;
};
