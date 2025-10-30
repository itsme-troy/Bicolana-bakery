"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return alert("Name and price are required!");

    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price,
          image,
        }),
      });

      if (!res.ok) throw new Error("Failed to add product");

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setImage("");

      // Refresh list
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Error adding product!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 p-10">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-orange-200 shadow-sm rounded-xl p-6 mb-8 max-w-md"
      >
        <h2 className="text-lg font-semibold mb-4 text-orange-600">
          Add New Product
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
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
            placeholder="Short description"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Price (₱)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. 10"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image URL</label>
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
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <h2 className="text-xl font-semibold mb-4">Product List</h2>
      <ul className="space-y-2">
        {products.length === 0 ? (
          <p className="text-neutral-500">No products yet.</p>
        ) : (
          products.map((p: any) => (
            <li
              key={p.id}
              className="p-3 border border-neutral-200 rounded-md flex justify-between hover:bg-orange-50 transition"
            >
              <span>
                <span className="font-medium">{p.name}</span>{" "}
                <span className="text-sm text-neutral-500">
                  ({p.description || "No description"})
                </span>
              </span>
              <span className="font-semibold text-orange-600">
                ₱{p.price.toFixed(2)}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
