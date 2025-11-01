"use client";

import { useEffect, useState } from "react";
import { Trash2, Edit3 } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"products" | "users">("products");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  // 🧡 Handle Add or Update Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return alert("Name and price are required!");
    setLoading(true);

    try {
      const method = editMode ? "PUT" : "POST";
      const url = editMode ? `/api/products/${editId}` : "/api/products";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price, image }),
      });

      if (!res.ok) throw new Error("Failed to save product");

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setEditMode(false);
      setEditId(null);
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Error saving product!");
    } finally {
      setLoading(false);
    }
  };

  // 🗑 Handle Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  // ✏️ Handle Edit (fill form)
  const handleEdit = (product: any) => {
    setEditMode(true);
    setEditId(product.id);
    setName(product.name);
    setDescription(product.description || "");
    setPrice(product.price);
    setImage(product.image || "");
    setShowForm(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-neutral-900">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 text-white p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8 text-orange-500">
            Admin Panel
          </h1>
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
        <p className="text-xs text-neutral-400 mt-10">
          © 2025 Bicolana’s Bakery
        </p>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {activeTab === "products" ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Product Management</h1>
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setEditMode(false);
                  setName("");
                  setDescription("");
                  setPrice("");
                  setImage("");
                }}
                className="bg-orange-600 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-700 transition"
              >
                {showForm ? "✖ Cancel" : "➕ Create"}
              </button>
            </div>

            {/* Product List */}
            <div className="bg-white shadow-sm rounded-lg border border-neutral-200 mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-orange-100 text-left text-sm">
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-center w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center p-4 text-neutral-500"
                      >
                        No products yet.
                      </td>
                    </tr>
                  ) : (
                    products.map((p: any) => (
                      <tr
                        key={p.id}
                        className="group border-t hover:bg-orange-50 text-sm transition-all duration-200"
                      >
                        <td className="p-3">{p.id}</td>
                        <td className="p-3 font-medium">{p.name}</td>
                        <td className="p-3 text-orange-600">₱{p.price}</td>
                        <td className="p-3">
                          {p.description || "No description"}
                        </td>
                        <td className="p-3 text-center flex justify-center gap-3">
                          <button
                            onClick={() => handleEdit(p)}
                            className="opacity-0 group-hover:opacity-100 transition text-blue-600 hover:text-blue-800"
                            title="Edit Product"
                          >
                            <Edit3 size={26} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="opacity-0 group-hover:opacity-100 transition text-red-600 hover:text-red-800"
                            title="Delete Product"
                          >
                            <Trash2 size={26} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Add/Edit Product Form */}
            {showForm && (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-orange-200 shadow-md rounded-xl p-6 max-w-lg animate-fadeIn"
              >
                <h2 className="text-lg font-semibold mb-4 text-orange-600">
                  {editMode ? "Edit Product" : "Add New Product"}
                </h2>

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. Pandesal"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
                    placeholder="Short description"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">
                    Price (₱)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. 10"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
                    placeholder="/pandesal.png"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 text-white py-2 rounded-md font-semibold hover:bg-orange-700 transition disabled:opacity-60"
                >
                  {loading
                    ? editMode
                      ? "Updating..."
                      : "Adding..."
                    : editMode
                    ? "Update Product"
                    : "Add Product"}
                </button>
              </form>
            )}
          </>
        ) : (
          <>
            {/* Users Table */}
            <h1 className="text-3xl font-bold mb-6">User Management</h1>
            <div className="bg-white shadow-sm rounded-lg border border-neutral-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-orange-100 text-left text-sm">
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center p-4 text-neutral-500"
                      >
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((u: any) => (
                      <tr
                        key={u.id}
                        className="border-t hover:bg-orange-50 text-sm"
                      >
                        <td className="p-3">{u.id}</td>
                        <td className="p-3 font-medium">{u.name}</td>
                        <td className="p-3">{u.email}</td>
                        <td className="p-3">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
