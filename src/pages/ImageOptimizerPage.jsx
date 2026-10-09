import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Copy,
  Image as ImageIcon,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { optimizeImage, webpObjectName, formatKB } from "../lib/optimizeImage";
import { PROJECT_THUMBNAILS_BUCKET, uploadToBucket } from "../lib/storage";

const MAX_WIDTHS = [800, 1200, 1600, 1920];

const INITIAL_SETTINGS = { quality: 0.82, maxWidth: 1600 };

const STATUS_LABELS = {
  ready: "Ready",
  uploading: "Uploading…",
  uploaded: "Uploaded",
  error: "Failed",
};

export default function ImageOptimizerPage() {
  const [session, setSession] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [items, setItems] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const idRef = useRef(0);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session))
      .catch(() => {})
      .finally(() => setAuthChecked(true));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const addFiles = useCallback(
    async (fileList) => {
      const files = Array.from(fileList || []);
      for (const file of files) {
        const id = ++idRef.current;
        setItems((prev) => [
          ...prev,
          {
            id,
            name: file.name,
            status: "optimizing",
            originalSize: file.size,
            optimizedSize: null,
            blob: null,
            previewUrl: null,
            publicUrl: null,
            error: null,
          },
        ]);
        try {
          const result = await optimizeImage(file, settings);
          setItems((prev) =>
            prev.map((item) =>
              item.id === id
                ? {
                    ...item,
                    status: "ready",
                    blob: result.blob,
                    optimizedSize: result.optimizedSize,
                    converted: result.converted,
                    previewUrl: URL.createObjectURL(result.blob),
                  }
                : item
            )
          );
        } catch (err) {
          setItems((prev) =>
            prev.map((item) =>
              item.id === id
                ? { ...item, status: "error", error: err.message || "Could not read this file" }
                : item
            )
          );
        }
      }
    },
    [settings]
  );

  const uploadItem = useCallback(async (id) => {
    const item = items.find((i) => i.id === id);
    if (!item?.blob || item.status === "uploading" || item.status === "uploaded") return;

    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "uploading", error: null } : i)));
    try {
      const objectName = webpObjectName(item.name);
      const publicUrl = await uploadToBucket(objectName, item.blob, {
        contentType: item.blob.type || "image/webp",
      });
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "uploaded", publicUrl } : i))
      );
    } catch (err) {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "error", error: err.message } : i))
      );
    }
  }, [items]);

  const uploadAll = useCallback(async () => {
    for (const item of items) {
      if (item.status === "ready") await uploadItem(item.id);
    }
  }, [items, uploadItem]);

  const removeItem = useCallback((id) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const copyUrl = useCallback(async (url) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
  }, []);

  const totalOriginal = items.reduce((s, i) => s + (i.originalSize || 0), 0);
  const totalOptimized = items.reduce((s, i) => s + (i.optimizedSize ?? i.originalSize ?? 0), 0);
  const readyCount = items.filter((i) => i.status === "ready").length;

  if (!authChecked) {
    return <div className="min-h-screen bg-[#0a0a0a]" />;
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-work-sans px-6 text-center">
        <ImageIcon className="w-10 h-10 text-neutral-600 mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-space-grotesk mb-2">Image Optimizer</h1>
        <p className="text-neutral-400 max-w-md">
          This tool is admin-only. Sign in from the home page sidebar ("Admin
          Login"), then come back.
        </p>
        <Link
          to="/"
          className="no-underline mt-6 flex items-center gap-1 border px-3 py-2.5 border-white text-white rounded-lg text-sm hover:bg-white hover:text-black transition"
        >
          Back Home <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        </Link>
      </main>
    );
  }

  return (
    <main id="main" className="min-h-screen bg-[#0a0a0a] text-white font-work-sans">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-space-grotesk">Image Optimizer</h1>
            <p className="text-sm text-neutral-400 mt-1">
              Images are converted to WebP and resized in your browser before
              upload, then served from the <code>{PROJECT_THUMBNAILS_BUCKET}</code> bucket.
            </p>
          </div>
          <Link
            to="/projects"
            className="no-underline shrink-0 ml-4 flex items-center gap-1 border px-3 py-2.5 border-white text-white rounded-lg text-sm hover:bg-white hover:text-black transition"
          >
            Back <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="bg-[#111111] border border-neutral-800 rounded-2xl p-5 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-sm text-neutral-300">
                Quality — <strong>{Math.round(settings.quality * 100)}%</strong>
              </span>
              <input
                type="range"
                min="50"
                max="95"
                value={Math.round(settings.quality * 100)}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, quality: Number(e.target.value) / 100 }))
                }
                className="w-full mt-2 accent-blue-600"
              />
            </label>
            <label className="block">
              <span className="text-sm text-neutral-300">Max width</span>
              <select
                value={settings.maxWidth}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, maxWidth: Number(e.target.value) }))
                }
                className="w-full mt-2 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
              >
                {MAX_WIDTHS.map((w) => (
                  <option key={w} value={w}>
                    {w}px
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="text-xs text-neutral-500 mt-3">
            Applies to files added after the change. Animated GIFs are
            flattened to a still frame.
          </p>
        </div>

        <div
          role="button"
          tabIndex={0}
          aria-label="Add images to optimize"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={(e) => {
            // Ignore leave events fired when the pointer crosses child elements.
            if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) return;
            setDragOver(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            addFiles(e.dataTransfer?.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition mb-6 ${
            dragOver
              ? "border-blue-500 bg-blue-600/10"
              : "border-neutral-700 hover:border-neutral-500"
          }`}
        >
          <UploadCloud className="w-8 h-8 mx-auto text-neutral-500 mb-2" aria-hidden="true" />
          <p className="text-neutral-300 text-sm">
            Drop images here or click to choose files
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>

        {items.length > 0 && (
          <div className="bg-[#111111] border border-neutral-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
              <p className="text-sm text-neutral-300">
                {formatKB(totalOriginal)} → <strong>{formatKB(totalOptimized)}</strong>
                <span className="text-green-400 ml-2">
                  −{Math.max(0, Math.round((1 - totalOptimized / Math.max(totalOriginal, 1)) * 100))}%
                </span>
              </p>
              <div className="flex gap-2">
                {readyCount > 0 && (
                  <button
                    type="button"
                    onClick={uploadAll}
                    className="bg-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-500 transition"
                  >
                    Upload all ({readyCount})
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    items.forEach((i) => i.previewUrl && URL.revokeObjectURL(i.previewUrl));
                    setItems([]);
                  }}
                  className="border border-neutral-600 px-4 py-2 rounded-lg text-sm hover:bg-neutral-800 transition"
                >
                  Clear
                </button>
              </div>
            </div>

            <ul className="divide-y divide-neutral-800">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 px-5 py-3">
                  {item.previewUrl ? (
                    <img
                      src={item.previewUrl}
                      alt=""
                      className="w-14 h-14 rounded-lg object-cover bg-neutral-800 shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
                      <ImageIcon className="w-5 h-5 text-neutral-600" aria-hidden="true" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-neutral-400">
                      {formatKB(item.originalSize)}
                      {item.optimizedSize != null && (
                        <>
                          {" → "}
                          <strong>{formatKB(item.optimizedSize)}</strong>
                          {" ("}
                          {item.converted
                            ? `−${Math.round((1 - item.optimizedSize / item.originalSize) * 100)}%, WebP`
                            : "kept original"}
                          {")"}
                        </>
                      )}
                    </p>
                    {item.error && <p className="text-xs text-red-400 mt-1">{item.error}</p>}
                    {item.publicUrl && (
                      <button
                        type="button"
                        onClick={() => copyUrl(item.publicUrl)}
                        className="text-xs text-blue-400 hover:text-blue-300 mt-1 flex items-center gap-1 truncate"
                        title={item.publicUrl}
                      >
                        <Copy className="w-3 h-3 shrink-0" aria-hidden="true" />
                        <span className="truncate">{item.publicUrl}</span>
                      </button>
                    )}
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                      item.status === "uploaded"
                        ? "bg-green-600/20 text-green-400"
                        : item.status === "error"
                          ? "bg-red-600/20 text-red-400"
                          : item.status === "uploading" || item.status === "optimizing"
                            ? "bg-blue-600/20 text-blue-400"
                            : "bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {STATUS_LABELS[item.status] ?? item.status}
                  </span>

                  {item.status === "ready" && (
                    <button
                      type="button"
                      onClick={() => uploadItem(item.id)}
                      className="bg-blue-600 px-3 py-1.5 rounded-lg text-xs hover:bg-blue-500 transition shrink-0"
                    >
                      Upload
                    </button>
                  )}
                  {item.status === "uploaded" && (
                    <Check className="w-4 h-4 text-green-400 shrink-0" aria-hidden="true" />
                  )}
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="text-neutral-500 hover:text-white transition shrink-0"
                  >
                    {item.status === "error" ? (
                      <X className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
