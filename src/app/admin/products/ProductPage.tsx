// ProductPage.tsx (Improved UI Edition)
"use client";

import { useState } from "react";
import { useProducts } from "./useProducts";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import Drawer from "../components/Drawer";
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

  const handleEdit = (p: any) => {
    setEditMode(true);
    setEditItem(p);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  if (loading) return <p className="text-neutral-600 p-6">Loading…</p>;

  return (
    <div className="p-4 sm:p-6 text-neutral-800">
      {/* Breadcrumb */}
      <div className="mb-4">
        <nav className="text-sm text-neutral-500">
          <span className="hover:text-neutral-700 cursor-pointer">
            Dashboard
          </span>
          <span className="mx-1">/</span>
          <span className="text-neutral-700 font-medium">Products</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight mt-1">
          Product Management
        </h1>
      </div>

      {/* Filter Bar + Add Button */}
      <div className="bg-white border rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Categories</option>
            {categories.map((c: any) => (
              <option key={c.id} value={String(c.id)}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Search Bar */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="border border-neutral-300 rounded-lg px-3 py-2 text-sm flex-1 min-w-[180px] focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />

          {/* Refresh Btn */}
          <button
            onClick={() => {
              setPage(1);
              fetchProducts();
            }}
            className="px-4 py-2 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-100 transition"
          >
            Refresh
          </button>

          {/* Advanced Filters Btn */}
          <button className="px-4 py-2 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-100 transition">
            Advanced Filters
          </button>

          {/* Add Product Button - right side */}
          <button
            onClick={startCreate}
            className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-lg shadow-sm font-medium transition ml-auto md:ml-3"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <ProductTable
          products={products}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>

      {/* Drawer */}
      {showForm && (
        <Drawer
          onClose={() => setShowForm(false)}
          title={editMode ? "Edit Product" : "Add Product"}
          className="p-6"
        >
          <div className="space-y-4">
            <ProductForm
              editMode={editMode}
              name={editItem?.name || ""}
              description={editItem?.description || ""}
              price={String(editItem?.price || "")}
              image={editItem?.image || ""}
              categoryId={String(editItem?.categoryId || "")}
              categories={categories}
              fetchCategories={fetchCategories}
              handleSubmit={async (e: any) => {
                e.preventDefault();
                await fetchProducts();
                setShowForm(false);
              }}
              loading={loading}
            />
          </div>
        </Drawer>
      )}
    </div>
  );
}
