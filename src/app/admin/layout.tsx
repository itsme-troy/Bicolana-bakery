"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex bg-neutral-100 min-h-screen">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* MAIN AREA — FIXED WITH LEFT MARGIN ADJUSTMENT */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300
          ${isCollapsed ? "lg:ml-20" : "lg:ml-64"}
        `}
      >
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white border-b px-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            {/* ALWAYS VISIBLE HAMBURGER */}
            <button
              onClick={() => {
                if (window.innerWidth < 1024) setIsMobileOpen(true);
                else setIsCollapsed((prev) => !prev);
              }}
              className="p-2 rounded hover:bg-neutral-200"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            <h1 className="text-lg font-semibold text-gray-800">
              Admin Dashboard
            </h1>
          </div>

          {/* PROFILE BUTTON */}
          <button className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            N
          </button>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
