import type { Product } from "@/types/product";

export const getPrimaryImage = (product: Product) => product.images?.[0] || product.image_url;