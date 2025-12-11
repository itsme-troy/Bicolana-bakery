// ProductForm.tsx
"use client";

import { useState, useEffect } from "react";

interface ProductFormProps {
  editMode: boolean;
  name: string;
  description: string;
  price: string;
  image: string;
  categoryId: string;
  loading: boolean;

  setName: (val: string) => void;
  setDescription: (val: string) => void;
  setPrice: (val: string) => void;
  setImage: (val: string) => void;
  setCategoryId: (val: string) => void;

  categories: { id: number; name: string }[];

  handleSubmit: (e: React.FormEvent) => void;

  fetchCategories?: () => Promise<void>;
}

export default function ProductForm({
  editMode,
  name,
  description,
  price,
  image,
  categoryId,
  setName,
  setDescription,
  setPrice,
  setImage,
  setCategoryId,
  categories,
  loading,
  handleSubmit,
  fetchCategories,
}: ProductFormProps) {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [savingCategory, setSavingCategory] = useState(false);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    setSavingCategory(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      });
      const newCat = await res.json();
      if (fetchCategories) await fetchCategories();
      setCategoryId(String(newCat.id));
      setNewCategoryName("");
      setShowAddCategory(false);
    } finally {
      setSavingCategory(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-orange-100 rounded-lg p-6 max-w-2xl space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div className="md:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold text-orange-600">
            {editMode ? "Edit Product" : "Add Product"}
          </h2>

          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium">Price (₱)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setShowAddCategory((s) => !s)}
                className="text-sm mt-2 text-orange-600 hover:underline"
              >
                ➕ Add New Category
              </button>
            </div>
          </div>

          {showAddCategory && (
            <div className="p-3 bg-orange-50 rounded mt-2">
              <label className="block text-sm font-medium">New Category</label>
              <div className="flex gap-2 mt-1">
                <input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1 border rounded px-3 py-2"
                />
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  disabled={savingCategory}
                  className="px-3 py-2 bg-orange-600 text-white rounded"
                >
                  {savingCategory ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right column: image + preview */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2"
            />
          </div>

          {image ? (
            <div className="border rounded overflow-hidden">
              <img
                src={image}
                alt="preview"
                className="w-full h-40 object-cover"
              />
            </div>
          ) : (
            <div className="h-40 w-full bg-neutral-50 border rounded flex items-center justify-center text-neutral-400">
              No image
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 rounded"
          >
            {loading
              ? editMode
                ? "Updating…"
                : "Adding…"
              : editMode
              ? "Update Product"
              : "Add Product"}
          </button>
        </div>
      </div>
    </form>
  );
}
