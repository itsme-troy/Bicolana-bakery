"use client";

import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  /* -----------------------------
     ESC key close
  ----------------------------- */
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />

      {/* MODAL PANEL */}
      <div
        className="
          relative z-10 w-full max-w-3xl mx-4
          bg-white rounded-xl shadow-xl
          animate-in fade-in zoom-in
        "
      >
        {/* HEADER */}
        {(title || onClose) && (
          <div className="flex items-center justify-between px-6 py-4 border-b">
            {title && (
              <h2 className="text-lg font-semibold text-neutral-800">
                {title}
              </h2>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-neutral-100"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* BODY */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
