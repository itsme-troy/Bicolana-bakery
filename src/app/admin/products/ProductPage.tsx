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

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Reset all form fields
  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setImage("");
    setCategoryId("");
  };

  // Populate form for editing
  const loadFormData = (p) => {
    setName(p.name || "");
    setDescription(p.description || "");
    setPrice(String(p.price) || "");
    setImage(p.image || "");
    setCategoryId(String(p.categoryId) || "");
  };

  // When clicking edit
  const handleEdit = (product) => {
    setEditMode(true);
    setEditItem(product);
    loadFormData(product);
    setShowForm(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  // Unified submit handler (auto-detects add/update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      description,
      price: Number(price),
      image,
      categoryId: Number(categoryId),
    };

    const url = editMode ? `/api/products/${editItem.id}` : "/api/products";

    const method = editMode ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert("Failed to save product");
      return;
    }

    await fetchProducts();
    setShowForm(false);
  };

  // When clicking add product
  const startCreate = () => {
    resetForm();
    setEditMode(false);
    setEditItem(null);
    setShowForm(true);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">Product Management</h1>

        <div className="flex gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id}>{c.name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search…"
            className="border rounded px-3 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={startCreate}
            className="bg-orange-600 text-white px-4 py-2 rounded"
          >
            + Add Product
          </button>
        </div>
      </div>

      <ProductTable
        products={products}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {showForm && (
        <Drawer onClose={() => setShowForm(false)} title="Product Form">
          <ProductForm
            editMode={editMode}
            name={name}
            description={description}
            price={price}
            image={image}
            categoryId={categoryId}
            setName={setName}
            setDescription={setDescription}
            setPrice={setPrice}
            setImage={setImage}
            setCategoryId={setCategoryId}
            categories={categories}
            fetchCategories={fetchCategories}
            handleSubmit={handleSubmit} // unified handler
            loading={loading}
          />
        </Drawer>
      )}
    </>
  );
}
