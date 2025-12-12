"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ICONS (use your own imports)
import {
  LayoutGrid,
  Box,
  Tag,
  Users,
  ShoppingCart,
  X,
  Menu,
  ChevronLeft,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();

  // Close sidebar automatically when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobileOpen]);

  const NavItem = ({
    href,
    label,
    icon,
  }: {
    href: string;
    label: string;
    icon: React.ReactNode;
  }) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        className={`
          flex items-center gap-3 rounded-lg px-4 py-3 transition-colors
          ${
            active
              ? "bg-orange-600 text-white"
              : "text-gray-300 hover:bg-white/10"
          }
          ${isCollapsed && "justify-center px-3"}
        `}
      >
        {icon}
        {!isCollapsed && (
          <span className="truncate text-sm font-medium">{label}</span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* MOBILE OVERLAY DARK BACKDROP */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/40 lg:hidden z-30"
        />
      )}

      {/* SIDEBAR PANEL */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-[#0F172A] text-white flex flex-col z-40
          transition-transform duration-300 ease-in-out

          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }

          ${isCollapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        {/* TOP SECTION */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          {/* PROFILE CIRCLE */}
          <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-lg font-bold">
            B
          </div>

          {/* MOBILE CLOSE BUTTON */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 rounded hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* DESKTOP COLLAPSE BUTTON — only when expanded */}
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="hidden lg:flex p-2 rounded hover:bg-white/10"
            >
              <ChevronLeft className="w-5 h-5 text-gray-200" />
            </button>
          )}
        </div>

        {/* NAV ITEMS */}
        <nav className="flex flex-col gap-1 py-4">
          <NavItem href="/admin" label="Dashboard" icon={<LayoutGrid />} />
          <NavItem href="/admin/products" label="Products" icon={<Box />} />
          <NavItem href="/admin/categories" label="Categories" icon={<Tag />} />
          <NavItem href="/admin/users" label="Users" icon={<Users />} />
          <NavItem
            href="/admin/orders"
            label="Orders"
            icon={<ShoppingCart />}
          />
        </nav>

        {/* FOOTER PROFILE (desktop only) */}
        {!isCollapsed && (
          <div className="mt-auto p-4 border-t border-white/10">
            <div className="text-sm text-gray-300">Bakery Admin</div>
            <div className="text-xs text-gray-500">admin@bakery.local</div>
          </div>
        )}
      </aside>
    </>
  );
}
