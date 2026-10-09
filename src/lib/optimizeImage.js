// Client-side image optimization shared by the project forms and the
// admin Image Optimizer page. Decodes an image, downscales it to a maximum
// width, and re-encodes as WebP. If the browser cannot encode WebP (older
// Safari) or the result is not smaller, the original file is returned.
//
// Note: animated GIFs are decoded to their first frame.

const DEFAULTS = { maxWidth: 1600, maxHeight: 1600, quality: 0.82 };

export async function optimizeImage(file, options = {}) {
  const { maxWidth, maxHeight, quality } = { ...DEFAULTS, ...options };

  if (file.type === "image/svg+xml" || !file.type.startsWith("image/")) {
    return { blob: file, originalSize: file.size, optimizedSize: file.size, converted: false };
  }

  const bitmap = await createImageBitmap(file);
  try {
    // Cap both dimensions so extreme aspect ratios (e.g. 300x20000) still downscale.
    const scale = Math.min(1, maxWidth / bitmap.width, maxHeight / bitmap.height);
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(bitmap, 0, 0, width, height);

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/webp", quality)
    );

    // toBlob falls back to PNG when WebP encoding is unsupported, and can
    // in rare cases produce a larger file — keep the original bytes then.
    if (!blob || blob.type !== "image/webp" || blob.size >= file.size) {
      return { blob: file, originalSize: file.size, optimizedSize: file.size, converted: false };
    }

    return { blob, originalSize: file.size, optimizedSize: blob.size, converted: true, width, height };
  } finally {
    bitmap.close();
  }
}

// Unique, web-safe object name for Storage: <timestamp>-<sanitized-base>.webp
export function webpObjectName(originalName) {
  const base = originalName
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "image";
  return `${Date.now()}-${base}.webp`;
}

export function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}
