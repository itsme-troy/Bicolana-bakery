// ProductPage.tsx
"use client";

import { useState, useEffect } from "react";
import { useProducts } from "./useProducts";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";

export default function ProductPage() {
  const {
    loading,
    products,
    categories,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    fetchProducts,
    fetchCategories,
    page,
    setPage,
    totalPages,
  } = useProducts();

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);

  const startCreate = () => {
    setEditMode(false);
    setEditItem(null);
    setShowForm(true);
  };

  const handleEdit = (product: any) => {
    setEditMode(true);
    setEditItem(product);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  useEffect(() => {
    document.body.style.overflow = showForm ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showForm]);

  if (loading) {
    return <p className="p-6 text-sm text-neutral-500">Loading products…</p>;
  }

  return (
    <div className="p-4 sm:p-6 text-neutral-800">
      {/* Breadcrumb */}
      <nav className="text-xs text-neutral-500 mb-1">
        Dashboard / <span className="text-neutral-700">Products</span>
      </nav>

      {/* HEADER ROW */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
        <h1 className="text-xl font-semibold flex-1">Product Management</h1>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full lg:w-64 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>

        <span className="text-sm text-neutral-500 whitespace-nowrap">
          {products.length} products
        </span>

        <button
          onClick={startCreate}
          className="inline-flex items-center gap-1 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-500"
        >
          + Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>

      {/* Modal */}
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editMode ? "Edit Product" : "Add Product"}
      >
        <ProductForm
          editMode={editMode}
          name={editItem?.name || ""}
          description={editItem?.description || ""}
          price={String(editItem?.price || "")}
          image={editItem?.image || ""}
          categoryId={String(editItem?.categoryId || "")}
          categories={categories}
          fetchCategories={fetchCategories}
          loading={loading}
          handleSubmit={async (e: any) => {
            e.preventDefault();
            await fetchProducts();
            setShowForm(false);
          }}
        />
      </Modal>
    </div>
  );
}
