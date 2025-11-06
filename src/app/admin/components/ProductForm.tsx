"use client";

interface ProductFormProps {
  editMode: boolean;
  name: string;
  description: string;
  price: string;
  image: string;
  loading: boolean;
  setName: (val: string) => void;
  setDescription: (val: string) => void;
  setPrice: (val: string) => void;
  setImage: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function ProductForm({
  editMode,
  name,
  description,
  price,
  image,
  loading,
  setName,
  setDescription,
  setPrice,
  setImage,
  handleSubmit,
}: ProductFormProps) {
  return (
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
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Price (₱)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
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
  );
}
