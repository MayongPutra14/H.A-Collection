import { supabase } from "@/lib/supabase";

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, error: "Format tidak didukung. Gunakan JPG, PNG, WebP, atau SVG." };
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return { valid: false, error: "Ukuran file maksimal 2MB." };
  }
  return { valid: true };
}

export async function uploadImage(file: File, bucket: string, folder: string): Promise<string> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const path = `${folder}/${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return urlData.publicUrl;
}

export async function deleteImageByUrl(url: string, bucket?: string): Promise<void> {
  const match = url.match(/\/uploads\/(.+)$/);
  if (!match) return;

  const path = match[1];
  const { error } = await supabase.storage.from("uploads").remove([path]);
  if (error) {
    console.error("Failed to delete image:", error.message);
  }
}