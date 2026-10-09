import React, { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  X,
  Briefcase,
  Building2,
  CalendarDays,
  FileText,
  ArrowUpCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const AddExperienceForm = ({ onSuccess, onClose }) => {
  const [form, setForm] = useState({
    role: "",
    company: "",
    dates: "",
    highlights: "",
    display_order: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.role.trim() ||
      !form.company.trim() ||
      !form.dates.trim() ||
      !form.highlights.trim()
    ) {
      return;
    }

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
      const { error: insertError } = await supabase.from("experience").insert([
        {
          role: form.role.trim(),
          company: form.company.trim(),
          dates: form.dates.trim(),
          highlights: form.highlights.trim(),
          display_order: displayOrder,
        },
      ]);
      if (insertError) throw insertError;

      if (!mountedRef.current) return;
      setStatus("success");
      timeoutRef.current = setTimeout(() => {
        onSuccess?.();
        onClose?.();
      }, 1500);
    } catch (err) {
      if (!mountedRef.current) return;
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong.");
    }
  };

  const isLoading = status === "loading";

  return (
    <div className="font-work-sans bg-[#111111] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <ArrowUpCircle aria-hidden="true" className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-white font-space-grotesk text-lg font-semibold leading-none">
              Add Experience
            </h2>
            <p className="text-neutral-400 text-xs mt-0.5">
              Publish to your portfolio
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
            <X aria-hidden="true" className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Role */}
        <Field
          icon={<Briefcase className="w-4 h-4" />}
          label="Role"
          required
          htmlFor="add-exp-role"
        >
          <input
            id="add-exp-role"
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
        <Field
          icon={<Building2 className="w-4 h-4" />}
          label="Company"
          required
          htmlFor="add-exp-company"
        >
          <input
            id="add-exp-company"
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
        <Field
          icon={<CalendarDays className="w-4 h-4" />}
          label="Dates"
          required
          htmlFor="add-exp-dates"
        >
          <input
            id="add-exp-dates"
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
        <Field
          icon={<FileText className="w-4 h-4" />}
          label="Highlights"
          required
          htmlFor="add-exp-highlights"
        >
          <textarea
            id="add-exp-highlights"
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
        <Field
          icon={<span className="text-xs font-bold">#</span>}
          label="Display Order"
          htmlFor="add-exp-display-order"
        >
          <input
            id="add-exp-display-order"
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
          <div
            role="status"
            className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 text-sm"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || status === "success"}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200
            ${
              status === "success"
                ? "bg-green-600 text-white cursor-default"
                : isLoading
                  ? "bg-blue-600/50 text-white/60 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white active:scale-[0.98]"
            }`}
        >
          {status === "success" ? (
            <span role="status" className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Experience Added!
            </span>
          ) : isLoading ? (
            <>
              <Loader />
              Saving...
            </>
          ) : (
            <>
              <ArrowUpCircle className="w-4 h-4" />
              Publish Experience
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const Field = ({ icon, label, required, htmlFor, children }) => (
  <div>
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2"
    >
      <span className="text-neutral-600">{icon}</span>
      {label}
      {required && <span className="text-blue-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const Loader = () => (
  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
    />
  </svg>
);

export default AddExperienceForm;
