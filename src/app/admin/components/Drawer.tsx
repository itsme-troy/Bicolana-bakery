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

  // Close drawer on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Mobile drag-to-close support
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;

      const translate = Math.min(0, currentX - startX);
      drawer.style.transform = `translateX(${translate}px)`;
      drawer.style.transition = "none";
    };

    const onTouchEnd = () => {
      isDragging = false;

      // If dragged more than 70px → close drawer
      if (currentX - startX > 70) {
        drawer.style.transition = "transform 0.25s ease";
        drawer.style.transform = "translateX(100%)";
        setTimeout(onClose, 200);
      } else {
        // Snap back to position
        drawer.style.transition = "transform 0.25s ease";
        drawer.style.transform = "translateX(0px)";
      }
    };

    drawer.addEventListener("touchstart", onTouchStart);
    drawer.addEventListener("touchmove", onTouchMove);
    drawer.addEventListener("touchend", onTouchEnd);

    return () => {
      drawer.removeEventListener("touchstart", onTouchStart);
      drawer.removeEventListener("touchmove", onTouchMove);
      drawer.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Subtle blurred overlay */}
      <div
        className="absolute inset-0 bg-black/10 backdrop-blur-[1px] transition-opacity"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className={`relative w-full ${width} h-full bg-white shadow-2xl animate-slideIn p-6 overflow-y-auto`}
      >
        {/* top-right close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
          aria-label="Close drawer"
        >
          ✖
        </button>

        {/* Title */}
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
