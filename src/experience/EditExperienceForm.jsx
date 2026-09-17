import React, { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  X,
  Briefcase,
  Building2,
  CalendarDays,
  FileText,
  CheckCircle2,
  AlertCircle,
  Pencil,
  Trash2,
} from "lucide-react";

const EditExperienceForm = ({ experience, onSuccess, onClose }) => {
  const [form, setForm] = useState({
    role: experience.role ?? "",
    company: experience.company ?? "",
    dates: experience.dates ?? "",
    highlights: experience.highlights ?? "",
    display_order: experience.display_order ?? "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | deleting | deleted | error
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const timeoutRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const scheduleClose = (delay) => {
    timeoutRef.current = setTimeout(() => {
      onSuccess?.();
      onClose?.();
    }, delay);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const displayOrder = form.display_order
      ? parseInt(form.display_order, 10)
      : null;
    if (form.display_order && isNaN(displayOrder)) {
      setStatus("error");
      setErrorMsg("Display order must be a number.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const { error: updateError } = await supabase
        .from("experience")
        .update({
          role: form.role.trim(),
          company: form.company.trim(),
          dates: form.dates.trim(),
          highlights: form.highlights.trim(),
          display_order: displayOrder,
        })
        .eq("id", experience.id);

      if (updateError) throw updateError;

      if (!mountedRef.current) return;
      setStatus("success");
      scheduleClose(1500);
    } catch (err) {
      if (!mountedRef.current) return;
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong.");
    }
  };

  const handleDelete = async () => {
    setStatus("deleting");
    setErrorMsg("");

    try {
      const { error: deleteError } = await supabase
        .from("experience")
        .delete()
        .eq("id", experience.id);

      if (deleteError) throw deleteError;

      if (!mountedRef.current) return;
      setStatus("deleted");
      scheduleClose(1200);
    } catch (err) {
      if (!mountedRef.current) return;
      setStatus("error");
      setErrorMsg(err.message || "Failed to delete experience.");
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
              Edit Experience
            </h2>
            <p className="text-neutral-500 text-xs mt-0.5">
              Update or remove this entry
            </p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-neutral-500 hover:text-white transition p-1 rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleUpdate} className="p-6 space-y-5">
        {/* Role */}
        <Field icon={<Briefcase className="w-4 h-4" />} label="Role" required>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="e.g. Full Stack Developer"
            className="input-field"
          />
        </Field>

        {/* Company */}
        <Field icon={<Building2 className="w-4 h-4" />} label="Company" required>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="e.g. MedibleGo"
            className="input-field"
          />
        </Field>

        {/* Dates */}
        <Field icon={<CalendarDays className="w-4 h-4" />} label="Dates" required>
          <input
            name="dates"
            value={form.dates}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="e.g. Dec 2025 – May 2026"
            className="input-field"
          />
        </Field>

        {/* Highlights */}
        <Field icon={<FileText className="w-4 h-4" />} label="Highlights" required>
          <textarea
            name="highlights"
            value={form.highlights}
            onChange={handleChange}
            required
            disabled={isLoading}
            rows={4}
            placeholder="What did you do and what impact did it have?"
            className="input-field resize-none"
          />
        </Field>

        {/* Display Order */}
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
            <span className="text-red-300">Delete this experience permanently?</span>
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
        .input-field:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
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

export default EditExperienceForm;
