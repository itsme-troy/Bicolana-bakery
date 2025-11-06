"use client";

interface SidebarProps {
  activeTab: "products" | "users";
  setActiveTab: (tab: "products" | "users") => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 bg-neutral-900 text-white p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-8 text-orange-500">Admin Panel</h1>
        <nav className="space-y-3">
          <button
            onClick={() => setActiveTab("products")}
            className={`block w-full text-left px-4 py-2 rounded-md transition ${
              activeTab === "products"
                ? "bg-orange-600"
                : "hover:bg-neutral-800"
            }`}
          >
            📦 Products
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`block w-full text-left px-4 py-2 rounded-md transition ${
              activeTab === "users" ? "bg-orange-600" : "hover:bg-neutral-800"
            }`}
          >
            👤 Users
          </button>
        </nav>
      </div>
      <p className="text-xs text-neutral-400 mt-10">© 2025 Bicolana’s Bakery</p>
    </aside>
  );
}
