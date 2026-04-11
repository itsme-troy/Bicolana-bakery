"use client";

import { useEffect, useState } from "react";

export default function CategoryTable({ onDeleteSuccess  }: any) {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };
  const [showForm, setShowForm] = useState(false);
const [name, setName] = useState("");
const [editingCategory, setEditingCategory] = useState<any>(null);

const handleDelete = async (id: number) => {
  if (!confirm("Delete this category?")) return;

  await fetch(`/api/categories/${id}`, {
    method: "DELETE",
  });

  // ✅ Refresh table AFTER delete
  fetchCategories();

  // ✅ Toast
  onDeleteSuccess("Category deleted successfully!");
};


  useEffect(() => {
    fetchCategories();
  }, []);

  return (
  <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
    {/* HEADER */}
   <div className="px-5 py-4 border-b flex justify-between items-center">
  <h2 className="font-semibold text-gray-800">
    Category List
  </h2>

  <button
    onClick={() => {
      setEditingCategory(null);
      setShowForm((prev) => !prev);
    }}
    className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-500"
  >
    + Add Category
  </button>
</div>

{showForm && (
  <div className="p-4 border-b bg-gray-50">
    <form
            onSubmit={async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("Category name is required");
            return;
        }

        const url = editingCategory
            ? `/api/categories/${editingCategory.id}`
            : "/api/categories";

        const method = editingCategory ? "PUT" : "POST";

        // ✅ FIX: Add headers so backend can read JSON
        await fetch(url, {
            method,
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });

        // ✅ Reset states after submit
        setName("");
        setShowForm(false);
        setEditingCategory(null);

        // ✅ Refresh table
        fetchCategories();
        }}
      className="flex gap-2"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Cakes, Bread"
        className="flex-1 border px-3 py-2 rounded-lg"
      />

      <button className="bg-green-600 text-white px-4 rounded-lg">
        {editingCategory ? "Update" : "Add"}
      </button>
    </form>
  </div>
)}
    <table className="w-full text-sm">
      <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
        <tr>
          <th className="px-5 py-3 text-left">Name</th>
          <th className="px-5 py-3 text-center w-32">Actions</th>
        </tr>
      </thead>

      <tbody>
        {categories.length === 0 ? (
          <tr>
            <td colSpan={2} className="text-center py-10 text-gray-400">
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-2">📦</span>
                No categories yet
              </div>
            </td>
          </tr>
        ) : (
          categories.map((cat: any) => (
            <tr
              key={cat.id}
            className="border-t odd:bg-white even:bg-gray-50 hover:bg-orange-50/50 transition"
            >
              <td className="px-5 py-4 font-medium text-gray-800">
                {cat.name}
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-center gap-2">
               <button
  onClick={() => {
    setEditingCategory(cat);
    setName(cat.name);
    setShowForm(true);
  }}
  className="px-3 py-1.5 text-sm rounded-md bg-blue-50 text-blue-600"
>
  Edit
</button>

                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="px-3 py-1.5 text-sm rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);
