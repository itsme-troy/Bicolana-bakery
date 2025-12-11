"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  ChevronLeft,
  LayoutDashboard,
  Package2,
  Users,
  ShoppingCart,
  Bell,
} from "lucide-react";

/**
 * Sidebar
 * - Uses next/link + usePathname() so navigation is route-based
 * - Collapsible (open/closed) with smooth animations for the labels
 * - Tooltips appear when collapsed
 * - Badges supported (static example; replace with props/API)
 * - Improved colors for contrast (dark background, light text)
 * - Active item shows an indicator bar
 *
 * Put this at: src/app/admin/components/Sidebar.tsx
 */

const menu = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    id: "products",
    label: "Products",
    href: "/admin/products",
    icon: Package2,
  },
  { id: "users", label: "Users", href: "/admin/users", icon: Users },
  { id: "orders", label: "Orders", href: "/admin/orders", icon: ShoppingCart },
];

export default function Sidebar() {
  const pathname = usePathname() || "/admin";
  const [open, setOpen] = useState(true);

  // Example badge counts (replace with API / props)
  const badgeCounts: Record<string, number> = {
    orders: 12,
    products: 3,
  };

  return (
    <>
      <aside
        className={`h-screen bg-neutral-900 text-neutral-100 transition-all duration-300
          ${open ? "w-64" : "w-16"} hidden md:flex flex-col shadow-lg`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/6">
          <div className="flex items-center gap-3">
            <div
              className="bg-orange-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-white shadow-inner"
              aria-hidden
            >
              N
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                open ? "max-w-[240px] opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              <h2 className="text-lg font-semibold leading-tight">
                Admin Panel
              </h2>
              <p className="text-xs text-neutral-300">Bakery dashboard</p>
            </div>
          </div>

          <button
            aria-label={open ? "Collapse sidebar" : "Open sidebar"}
            onClick={() => setOpen((s) => !s)}
            className="p-1 rounded hover:bg-white/6"
            title="Toggle"
          >
            {open ? <ChevronLeft size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* nav */}
        <nav className="px-2 py-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {menu.map((item) => {
              const ActiveIcon = item.icon;
              const isActive =
                pathname === item.href || pathname?.startsWith(item.href + "/");

              return (
                <li key={item.id} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors duration-200
                      ${
                        isActive
                          ? "text-white bg-orange-600"
                          : "text-neutral-200 hover:bg-white/5"
                      }`}
                    title={open ? undefined : item.label} // standard tooltip fallback for accessibility
                    aria-current={isActive ? "page" : undefined}
                  >
                    {/* active indicator bar (left) */}
                    <span
                      aria-hidden
                      className={`absolute left-0 top-0 h-full w-1 rounded-tr-md rounded-br-md transition-opacity duration-200
                        ${
                          isActive ? "bg-orange-400 opacity-100" : "opacity-0"
                        }`}
                    />

                    <span className="flex items-center justify-center w-7">
                      <ActiveIcon size={18} />
                    </span>

                    {/* label: animate width and opacity */}
                    <span
                      className={`overflow-hidden transition-all duration-300 ${
                        open ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
                      }`}
                    >
                      <span className="inline-flex items-center gap-3">
                        <span>{item.label}</span>

                        {/* badge example */}
                        {item.id === "orders" && badgeCounts.orders > 0 && (
                          <span className="ml-2 inline-flex items-center justify-center text-xs font-medium px-2 py-0.5 rounded-full bg-red-600 text-white">
                            {badgeCounts.orders}
                          </span>
                        )}

                        {item.id === "products" && badgeCounts.products > 0 && (
                          <span className="ml-2 inline-flex items-center justify-center text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-600 text-neutral-900">
                            {badgeCounts.products}
                          </span>
                        )}
                      </span>
                    </span>

                    {/* collapsed tooltip box (custom) */}
                    {!open && (
                      <span
                        className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 rounded-md bg-neutral-900/95 px-3 py-1 text-sm text-neutral-100 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50"
                        role="tooltip"
                      >
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* section header when open */}
          <div className={`mt-8 px-3 ${open ? "" : "hidden"}`}>
            <h3 className="text-xs text-neutral-400 uppercase tracking-wider">
              Management
            </h3>
          </div>

          {/* a small utility action that always shows (icon + optional label) */}
          <div className="mt-6 px-2">
            <button
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-md transition ${
                open ? "text-neutral-200 hover:bg-white/5" : "justify-center"
              }`}
              title={!open ? "Notifications" : undefined}
            >
              <Bell size={18} />
              <span
                className={`overflow-hidden transition-all duration-300 ${
                  open ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
                }`}
              >
                Notifications
              </span>
              {/* example badge on utility */}
              {open && (
                <span className="ml-auto inline-flex items-center justify-center text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                  3
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* footer */}
        <div className="px-4 py-6 text-sm text-neutral-400 border-t border-white/6">
          <div className="flex items-center gap-3">
            <div className="bg-neutral-800 rounded-full w-8 h-8 flex items-center justify-center text-sm">
              N
            </div>

            <div className={`${open ? "block" : "hidden"}`}>
              <div className="text-sm">Bakery Admin</div>
              <div className="text-xs text-neutral-500">admin@bakery.local</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile header (when md:hidden) */}
      <header className="md:hidden bg-neutral-900 text-white flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="p-1 rounded bg-white/6"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>

          <h1 className="font-semibold">Admin</h1>
        </div>

        <div className="text-xs text-neutral-300">Manage site</div>
      </header>
    </>
  );
}
