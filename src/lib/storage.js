import { supabase } from "./supabaseClient";
import { optimizeImage, webpObjectName } from "./optimizeImage";

// Single source of truth for the public thumbnails bucket. Every upload in
// the app (project forms + the image optimizer page) goes through here.
export const PROJECT_THUMBNAILS_BUCKET = "project-thumbnails";

// Low-level: upload an already-prepared blob and return its public URL.
export async function uploadToBucket(objectName, blob, options = {}) {
  const { bucket = PROJECT_THUMBNAILS_BUCKET, contentType, cacheControl = "31536000" } = options;

  const { error } = await supabase.storage.from(bucket).upload(objectName, blob, {
    contentType,
    cacheControl,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(objectName);
  return data.publicUrl;
}

// Prepare at selection time so publishing only uploads the resulting bytes.
export async function prepareProjectThumbnail(file, optimizeOptions = {}) {
  const optimized = await optimizeImage(file, optimizeOptions);
  // Sanitize the fallback extension the same way webpObjectName sanitizes
  // the base name — never interpolate the raw file name into storage paths.
  const ext = (file.name.split(".").pop() || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const objectName = optimized.converted
    ? webpObjectName(file.name)
    : `${Date.now()}.${ext || "bin"}`;

  return {
    ...optimized,
    objectName,
    contentType: optimized.converted ? "image/webp" : file.type,
  };
}

export async function uploadProjectThumbnail(prepared) {
  const publicUrl = await uploadToBucket(prepared.objectName, prepared.blob, {
    contentType: prepared.contentType,
  });
  return { ...prepared, publicUrl };
}
