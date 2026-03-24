import React, { useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Upload,
  X,
  Link2,
  Wrench,
  FileText,
  Tag,
  CheckCircle2,
  AlertCircle,
  Pencil,
  Trash2,
} from "lucide-react";

const EditProjectForm = ({ project, onSuccess, onClose }) => {
  const [form, setForm] = useState({
    title: project.title ?? "",
    description: project.description ?? "",
    tools: project.tools ?? "",
    project_link: project.project_link ?? "",
    display_order: project.display_order ?? "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(project.image_url ?? null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | deleting | deleted | error
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0] || e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      let image_url = project.image_url;

      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("project-thumbnails")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("project-thumbnails")
          .getPublicUrl(fileName);
        image_url = urlData.publicUrl;
      } else if (!imagePreview) {
        // User cleared the image
        image_url = null;
      }

      const { error: updateError } = await supabase
        .from("projects")
        .update({
          title: form.title,
          description: form.description,
          tools: form.tools,
          project_link: form.project_link || null,
          display_order: form.display_order ? parseInt(form.display_order) : null,
          image_url,
        })
        .eq("id", project.id);

      if (updateError) throw updateError;

      setStatus("success");
      setTimeout(() => {
        onSuccess?.();
        onClose?.();
      }, 1500);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong.");
    }
  };

  const handleDelete = async () => {
    setStatus("deleting");
    setErrorMsg("");

    try {
      const { error: deleteError } = await supabase
        .from("projects")
        .delete()
        .eq("id", project.id);

      if (deleteError) throw deleteError;

      setStatus("deleted");
      setTimeout(() => {
        onSuccess?.();
        onClose?.();
      }, 1200);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to delete project.");
      setConfirmDelete(false);
    }
  };

  const isLoading = status === "loading" || status === "deleting";

  return (
    <div className="font-work-sans bg-[#111111] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Pencil className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-white font-space-grotesk text-lg font-semibold leading-none">
              Edit Project
            </h2>
            <p className="text-neutral-500 text-xs mt-0.5">
              Update or remove this project
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-white transition p-1 rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleUpdate} className="p-6 space-y-5">
        {/* Image Drop Zone */}
        <div>
          <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
            Cover Image
          </label>
          {imagePreview ? (
            <div className="relative rounded-xl overflow-hidden border border-blue-600/40 shadow-sm shadow-blue-600/10">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-44 object-cover"
                loading="lazy"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white rounded-full p-1.5 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleImageDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-neutral-700 hover:border-blue-600 rounded-xl h-36 flex flex-col items-center justify-center gap-2 cursor-pointer transition group"
            >
              <Upload className="w-6 h-6 text-neutral-600 group-hover:text-blue-500 transition" />
              <p className="text-neutral-500 text-sm group-hover:text-neutral-300 transition">
                Drop image or <span className="text-blue-500">browse</span>
              </p>
              <p className="text-neutral-600 text-xs">PNG, JPG, WebP</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageDrop}
          />
        </div>

        {/* Name */}
        <Field icon={<Tag className="w-4 h-4" />} label="Project Name" required>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="e.g. Resume IQ: Python, Classical Machine Learning"
            className="input-field"
          />
        </Field>

        {/* Description */}
        <Field icon={<FileText className="w-4 h-4" />} label="Description" required>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            disabled={isLoading}
            rows={3}
            placeholder="What did you build and why?"
            className="input-field resize-none"
          />
        </Field>

        {/* Tools */}
        <Field icon={<Wrench className="w-4 h-4" />} label="Tools Used" required>
          <input
            name="tools"
            value={form.tools}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="e.g. React, Node.js, MongoDB"
            className="input-field"
          />
        </Field>

        {/* Two column: Link + Display Order */}
        <div className="grid grid-cols-2 gap-4">
          <Field icon={<Link2 className="w-4 h-4" />} label="Project Link">
            <input
              name="project_link"
              value={form.project_link}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="https://github.com/..."
              className="input-field"
            />
          </Field>
          <Field icon={<span className="text-xs font-bold">#</span>} label="Display Order">
            <input
              name="display_order"
              type="number"
              value={form.display_order}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="1"
              min="1"
              className="input-field"
            />
          </Field>
        </div>

        {/* Error */}
        {status === "error" && (
          <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        {/* Delete confirmation */}
        {confirmDelete && (
          <div className="flex items-center justify-between gap-3 bg-red-950/40 border border-red-500/30 rounded-lg px-4 py-3 text-sm">
            <span className="text-red-300">Delete this project permanently?</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="px-3 py-1.5 rounded-lg border border-neutral-600 text-neutral-300 hover:bg-neutral-800 transition text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition text-xs disabled:opacity-50"
              >
                {status === "deleting" ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {/* Delete button */}
          {!confirmDelete && (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              disabled={isLoading || status === "success" || status === "deleted"}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border border-red-500/40 text-red-400 hover:bg-red-500/10 transition disabled:opacity-40"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}

          {/* Save button */}
          <button
            type="submit"
            disabled={isLoading || status === "success" || status === "deleted"}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200
              ${
                status === "success" || status === "deleted"
                  ? "bg-green-600 text-white cursor-default"
                  : isLoading
                    ? "bg-blue-600/50 text-white/60 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 text-white active:scale-[0.98]"
              }`}
          >
            {status === "success" ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Saved!
              </>
            ) : status === "deleted" ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Deleted!
              </>
            ) : isLoading && status !== "deleting" ? (
              <>
                <Loader />
                Saving...
              </>
            ) : (
              <>
                <Pencil className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>

      <style>{`
        .input-field {
          width: 100%;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 0.625rem;
          padding: 0.625rem 0.875rem;
          color: #e5e5e5;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s;
          font-family: inherit;
        }
        .input-field::placeholder { color: #555; }
        .input-field:focus { border-color: #d97706; box-shadow: 0 0 0 3px rgba(217,119,6,0.12); }
        .input-field:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

const Field = ({ icon, label, required, children }) => (
  <div>
    <label className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
      <span className="text-neutral-600">{icon}</span>
      {label}
      {required && <span className="text-blue-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const Loader = () => (
  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
  </svg>
);

export default EditProjectForm;
