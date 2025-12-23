"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";

interface ProductFormProps {
  editMode: boolean;
  name: string;
  description?: string;
  price: string;
  image: string;
  categoryId: string;
  stock?: string;
  loading: boolean;

  setName: (val: string) => void;
  setDescription?: (val: string) => void;
  setPrice: (val: string) => void;
  setImage: (val: string) => void;
  setCategoryId: (val: string) => void;
  setStock?: (val: string) => void;

  categories: { id: number; name: string }[];
  handleSubmit: (e: React.FormEvent) => void;
  fetchCategories?: () => Promise<void>;
}

export default function ProductForm({
  editMode,
  name,
  description = "",
  price,
  image,
  categoryId,
  stock,
  setName,
  setDescription,
  setPrice,
  setImage,
  setCategoryId,
  setStock,
  categories,
  loading,
  handleSubmit,
  fetchCategories,
}: ProductFormProps) {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [savingCategory, setSavingCategory] = useState(false);

  /* -----------------------------
     Image Upload Handler
  ----------------------------- */
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => setImage("/default_product_image.png");

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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Product Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          required
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
          className="mt-2 inline-flex items-center gap-1 text-sm text-orange-600 hover:underline"
        >
          ➕ Add New Category
        </button>
      </div>

      {/* Inline Add Category */}
      {showAddCategory && (
        <div className="rounded-lg border bg-orange-50 p-3">
          <label className="block text-sm font-medium mb-1">New Category</label>
          <div className="flex gap-2">
            <input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-1 rounded-lg border px-3 py-2"
            />
            <button
              type="button"
              onClick={handleCreateCategory}
              disabled={savingCategory}
              className="rounded-lg bg-orange-600 px-4 py-2 text-white"
            >
              {savingCategory ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* Price */}
      <div>
        <label className="block text-sm font-medium mb-1">Price (₱)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>

      {/* Stock (optional) */}
      {setStock && (
        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>
      )}

      {/* IMAGE UPLOAD */}
      <div>
        <label className="block text-sm font-medium mb-2">Product Image</label>

        <div className="relative">
          <label
            htmlFor="image-upload"
            className={`
                relative flex h-40 w-full cursor-pointer items-center justify-center
                overflow-hidden rounded-lg border-2 border-dashed transition
                bg-neutral-50
                ${
                  image
                    ? "border-transparent"
                    : "border-neutral-300 hover:border-orange-500 hover:bg-orange-50/30"
                }
            `}
          >
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files && handleImageUpload(e.target.files[0])
              }
            />

            {!image ? (
              <>
                <Upload className="h-6 w-6 text-neutral-400" />
                <p className="mt-2 text-sm text-neutral-500">
                  Drag & drop or click to upload
                </p>
                <span className="mt-2 rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm">
                  Upload Image
                </span>
              </>
            ) : (
              <img
                src={image}
                alt="Preview"
                className="absolute inset-0 h-full w-full object-contain object-cover bg-neutral-100"
              />
            )}
          </label>

          {/* Remove Image Button */}
          {image && (
            <button
              type="button"
              onClick={removeImage}
              className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black"
              title="Remove image"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {!image && (
          <p className="mt-1 text-xs text-neutral-400">
            PNG, JPG, or WEBP recommended
          </p>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end border-t pt-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-orange-600 px-6 py-2.5 font-medium text-white hover:bg-orange-500"
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
    </form>
  );
}
