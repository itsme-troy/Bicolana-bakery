// Sidebar.tsx

export default function Sidebar({ activeTab, setActiveTab }: any) {
  return (
    <aside className="w-64 bg-neutral-900 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-6">Admin Panel</h2>

      <nav className="flex-1">
        <ul>
          <li
            onClick={() => setActiveTab("products")}
            className={`cursor-pointer px-6 py-3 ${
              activeTab === "products"
                ? "bg-orange-600"
                : "hover:bg-neutral-800"
            }`}
          >
            🧁 Products
          </li>
          <li
            onClick={() => setActiveTab("users")}
            className={`cursor-pointer px-6 py-3 ${
              activeTab === "users" ? "bg-orange-600" : "hover:bg-neutral-800"
            }`}
          >
            👤 Users
          </li>
          <li
            onClick={() => setActiveTab("orders")}
            className={`cursor-pointer px-6 py-3 ${
              activeTab === "orders" ? "bg-orange-600" : "hover:bg-neutral-800"
            }`}
          >
            📦 Orders
          </li>
        </ul>
      </nav>
    </aside>
  );
}
