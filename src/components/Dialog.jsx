import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const isVisible = (el) =>
  el.getClientRects().length > 0 &&
  getComputedStyle(el).visibility !== "hidden";

const Dialog = ({ open, onClose, ariaLabel, className = "", children }) => {
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    previousFocusRef.current = document.activeElement;

    const autofocus = panel.querySelector("[data-autofocus]");
    const firstFocusable = Array.from(
      panel.querySelectorAll(FOCUSABLE_SELECTOR),
    ).find(isVisible);
    (autofocus || firstFocusable || panel).focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") return onClose();
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        panel.querySelectorAll(FOCUSABLE_SELECTOR),
      ).filter(isVisible);
      if (focusable.length === 0) return event.preventDefault();
      const active = document.activeElement;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey) {
        if (active === first || !focusable.includes(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !focusable.includes(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={className}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Dialog;
