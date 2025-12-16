// src/app/admin/products/ProductPage.tsx
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

  /* ---------------------------
     FORM STATE (FIX)
  --------------------------- */
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  /* ---------------------------
     CREATE PRODUCT
  --------------------------- */
  const startCreate = () => {
    setEditMode(false);

    setName("");
    setPrice("");
    setImage("");
    setCategoryId("");
    setDescription("");
    setStock("");

    setShowForm(true);
  };

  /* ---------------------------
     EDIT PRODUCT
  --------------------------- */
  const handleEdit = (product: any) => {
    setEditMode(true);

    setName(product.name || "");
    setPrice(String(product.price || ""));
    setImage(product.image || "");
    setCategoryId(String(product.categoryId || ""));
    setDescription(product.description || "");
    setStock(String(product.stock || ""));

    setShowForm(true);
  };

  /* ---------------------------
     DELETE PRODUCT
  --------------------------- */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  /* ---------------------------
     LOCK SCROLL WHEN MODAL OPEN
  --------------------------- */
  useEffect(() => {
    document.body.style.overflow = showForm ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showForm]);

  if (loading) {
    return <p className="p-6 text-sm text-neutral-500">Loading products…</p>;
  }

  return (
    <div className="p-4 sm:p-6 text-neutral-800">
      {/* Breadcrumb */}
      <nav className="mb-1 text-xs text-neutral-500">
        Dashboard / <span className="text-neutral-700">Products</span>
      </nav>

      {/* HEADER */}
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        <h1 className="flex-1 text-xl font-semibold">Product Management</h1>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 lg:w-64"
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

        <span className="whitespace-nowrap text-sm text-neutral-500">
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
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* PAGINATION */}
      <div className="mt-4 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>

      {/* MODAL */}
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editMode ? "Edit Product" : "Add Product"}
      >
        <ProductForm
          editMode={editMode}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          price={price}
          setPrice={setPrice}
          image={image}
          setImage={setImage}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          stock={stock}
          setStock={setStock}
          categories={categories}
          fetchCategories={fetchCategories}
          loading={loading}
          handleSubmit={async (e) => {
            e.preventDefault();

            if (!categoryId) {
              alert("Please select a category");
              return;
            }

            const payload = {
              name,
              price: Number(price),
              image,
              categoryId: Number(categoryId),
              description: description || null,
              stock: stock ? Number(stock) : null,
            };

            const res = await fetch("/api/products", {
              method: editMode ? "PUT" : "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            if (!res.ok) {
              const error = await res.json();
              alert(error.message || "Failed to save product");
              return;
            }

            await fetchProducts();
            setShowForm(false);
          }}
        />
      </Modal>
    </div>
  );
}
