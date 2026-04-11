"use client";

import { useEffect, useState } from "react";

export default function CategoryForm({ onSuccess, editingCategory }: any) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
    }
  }, [editingCategory]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name is required");
      return;
    }

    // Decide endpoint and method
    const url = editingCategory
      ? `/api/categories/${editingCategory.id}`
      : "/api/categories";

    const method = editingCategory ? "PUT" : "POST";

    // FIX: Add headers so backend can read JSON
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json", // 🔥 REQUIRED
      },
      body: JSON.stringify({ name }),
    });

    // Optional: check if request succeeded
    if (!res.ok) {
      alert("Something went wrong");
      return;
    }

    // Reset form
    setName("");

    // Trigger refresh + toast
    onSuccess("Category saved successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-xl p-4 space-y-3"
    >
      <h2 className="font-semibold">
        {editingCategory ? "Edit Category" : "Add Category"}
      </h2>

      <input
        type="text"
        placeholder="e.g. Cakes, Bread, Pastries"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        {editingCategory ? "Update" : "Add"}
      </button>
    </form>
  );
}
