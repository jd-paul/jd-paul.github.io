import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-xl w-full rounded-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-zinc-950 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Title: {title}</h2>
          <button onClick={onClose} aria-label="Close">
            <X className="w-5 h-5 text-white hover:text-neutral-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-sm text-zinc-700 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
