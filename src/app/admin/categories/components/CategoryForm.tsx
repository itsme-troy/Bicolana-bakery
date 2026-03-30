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

    if (editingCategory) {
      // UPDATE
      await fetch(`/api/categories/${editingCategory.id}`, {
        method: "PUT",
        body: JSON.stringify({ name }),
      });
    } else {
      // CREATE
      await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({ name }),
      });
    }

    setName("");
    onSuccess();
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
