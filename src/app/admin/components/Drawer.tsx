// Drawer.tsx
"use client";

import { useEffect, useRef } from "react";

export default function Drawer({
  children,
  onClose,
  title,
  width = "max-w-md",
}: {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  width?: string;
}) {
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // lock body scroll while drawer open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div
        className="absolute inset-0 bg-black/25 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={drawerRef}
        className={`relative w-full ${width} h-full bg-white shadow-2xl p-6 overflow-y-auto transform transition-transform animate-slideIn`}
      >
        <button
          onClick={onClose}
          aria-label="Close drawer"
          className="absolute top-4 right-4 text-neutral-600 hover:text-black"
        >
          ✖
        </button>

        {title && (
          <h2 className="text-xl font-semibold mb-4 text-neutral-800">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
