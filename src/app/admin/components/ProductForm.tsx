"use client";

import { useState } from "react";

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

  // NEW: parent must pass fetchCategories()
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
  fetchCategories, // NEW
}: ProductFormProps) {
  // NEW: States for inline category creation
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [savingCategory, setSavingCategory] = useState(false);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      setSavingCategory(true);

      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      });

      const newCategory = await res.json();

      // Refresh category dropdown
      if (fetchCategories) await fetchCategories();

      // Auto-select newly added category
      setCategoryId(String(newCategory.id));

      // Reset
      setNewCategoryName("");
      setShowAddCategory(false);
    } finally {
      setSavingCategory(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-orange-200 shadow-md rounded-xl p-6 max-w-lg animate-fadeIn"
    >
      <h2 className="text-lg font-semibold mb-4 text-orange-600">
        {editMode ? "Edit Product" : "Add New Product"}
      </h2>

      {/* NAME */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* DESCRIPTION */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* CATEGORY DROPDOWN */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Category</label>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* ADD NEW CATEGORY BUTTON */}
        <button
          type="button"
          onClick={() => setShowAddCategory(!showAddCategory)}
          className="text-orange-600 mt-2 text-sm hover:underline"
        >
          ➕ Add New Category
        </button>
      </div>

      {/* INLINE CATEGORY CREATOR */}
      {showAddCategory && (
        <div className="mb-3 p-3 border rounded bg-orange-50 animate-fadeIn">
          <label className="block text-sm font-medium mb-1">
            New Category Name
          </label>

          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="w-full border border-neutral-300 rounded-md px-3 py-2"
          />

          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={handleCreateCategory}
              disabled={savingCategory}
              className="bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-700"
            >
              {savingCategory ? "Saving..." : "Save Category"}
            </button>

            <button
              type="button"
              onClick={() => setShowAddCategory(false)}
              className="px-3 py-1 rounded-md border"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* PRICE */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Price (₱)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* IMAGE */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* SUBMIT BUTTON */}
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
  );
}
