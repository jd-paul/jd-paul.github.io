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

// High-level: optimize an image file in the browser (WebP + downscale) and
// upload it. Falls back to the original bytes when WebP is unavailable.
export async function uploadProjectThumbnail(file, optimizeOptions = {}) {
  const { blob, converted } = await optimizeImage(file, optimizeOptions);
  const objectName = converted
    ? webpObjectName(file.name)
    : `${Date.now()}.${file.name.split(".").pop()}`;
  const publicUrl = await uploadToBucket(objectName, blob, {
    contentType: converted ? "image/webp" : file.type,
  });
  return { publicUrl, converted, objectName };
}
