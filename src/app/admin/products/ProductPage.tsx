// src/app/admin/products/ProductPage.tsx
"use client";

import { useState, useEffect } from "react";
import { useProducts } from "./useProducts";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import toast from "react-hot-toast";

export default function ProductPage() {
  const {
    products = [],
    loading,
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
    sort,
    setSort,
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
  const [productId, setProductId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  /* ---------------------------
     CREATE PRODUCT
  --------------------------- */
  const startCreate = () => {
    setEditMode(false);

    setName("");
    setPrice("");
    setImage("/default_product_image.png");
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

    setProductId(product.id); // ⭐ ADD THIS

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

    const loadingToast = toast.loading("Deleting product...");

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to delete product");
      }

      await fetchProducts();

      toast.dismiss(loadingToast);
      toast.success("Product deleted successfully");
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(err.message);
    }
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

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="nameAsc">Name (A–Z)</option>
          <option value="nameDesc">Name (Z–A)</option>
          <option value="priceHigh">Price (High → Low)</option>
          <option value="priceLow">Price (Low → High)</option>
          <option value="stockHigh">Stock (High → Low)</option>
          <option value="stockLow">Stock (Low → High)</option>
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
          loading={loading}
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
          loading={saving}
          handleSubmit={async (e) => {
            e.preventDefault();

            if (!categoryId) {
              toast.error("Please select a category");
              return;
            }

            if (Number(price) < 0) {
              toast.error("Price cannot be negative");
              return;
            }

            if (stock && Number(stock) < 0) {
              toast.error("Stock cannot be negative");
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

            setSaving(true);

            const loadingToast = toast.loading("Saving product...");

            try {
              const res = await fetch(
                editMode ? `/api/products/${productId}` : "/api/products",
                {
                  method: editMode ? "PUT" : "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                },
              );

              if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Failed to save product");
              }

              await fetchProducts();
              setShowForm(false);

              toast.dismiss(loadingToast);
              toast.success(
                editMode
                  ? "Product updated successfully"
                  : "Product added successfully",
              );
            } catch (err: any) {
              toast.dismiss(loadingToast);
              toast.error(err.message);
            } finally {
              setSaving(false);
            }
          }}
        />
      </Modal>
    </div>
  );
}
