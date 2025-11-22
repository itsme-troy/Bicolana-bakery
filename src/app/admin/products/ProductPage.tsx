"use client";

import { useState } from "react";
import { useProducts } from "./useProducts";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import Drawer from "../components/Drawer";
import Pagination from "../components/Pagination";

export default function ProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");

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
  const [editItem, setEditItem] = useState(null);

  if (loading) return <p>Loading...</p>;

  const handleEdit = (p) => {
    setEditMode(true);
    setEditItem(p);
    setShowForm(true);

    // populate form fields
    setName(p.name || "");
    setDescription(p.description || "");
    setPrice(String(p.price) || "");
    setImage(p.image || "");
    setCategoryId(String(p.categoryId) || "");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;

    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts(); // refresh table
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      price: Number(price),
      image,
      categoryId: Number(categoryId),
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      alert("Failed to create product");
      return;
    }

    await fetchProducts(); // refresh list
    setShowForm(false); // close drawer
  };

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
            onClick={() => {
              setShowForm(true);
              setEditMode(false);
              setEditItem(null);

              // reset fields
              setName("");
              setDescription("");
              setPrice("");
              setImage("");
              setCategoryId("");
            }}
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
            handleSubmit={handleCreate}
            loading={loading}
          />
        </Drawer>
      )}
    </>
  );
}
