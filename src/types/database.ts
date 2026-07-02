export type Banner = {
  id: number;
  title: string;
  titleEn: string | null;
  subtitle: string | null;
  subtitleEn: string | null;
  description: string | null;
  descriptionEn: string | null;
  imageUrl: string;
  status: string;
};

export type Category = {
  id: number;
  name: string | null;
  imageUrl: string | null;
};

export type Product = {
  id: number;
  name: string;
  descriptionId: string | null;
  descriptionEn: string | null;
  price: number;
  imageUrl: string | null;
  images: string | null;
  shopeeUrl: string | null;
  material: string | null;
  sizes: string[] | null;
  archived: boolean;
  category_id: number | null;
};

export type StoreSetting = {
  id: number;
  adminWhatsapp: string | null;
  shopeeStoreUrl: string | null;
  shopeeUrl: string | null;
  tiktokUrl: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
};
