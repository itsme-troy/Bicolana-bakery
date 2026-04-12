"use client";

import { useEffect, useState } from "react";

export default function CategoryTable({ onDeleteSuccess }: any) {
  const [categories, setCategories] = useState([]);

  // 🔥 Track which row is being edited (by ID)
  const [editingId, setEditingId] = useState<number | null>(null);

  // 🔥 Store temporary input value while editing
  const [editName, setEditName] = useState("");

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState<any>(null);

  // 🔥 Store category to delete (for modal)
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  // 🗑 DELETE category
  const handleDelete = async (id: number) => {
    await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    fetchCategories(); //  refresh table
    onDeleteSuccess("Category deleted successfully!");
  };

  // 🔥 UPDATE category (INLINE EDIT SAVE)
  const handleUpdate = async (id: number) => {
    // ✅ Prevent empty input
    if (!editName.trim()) {
      alert("Category name is required");
      return;
    }

    // ✅ Send PUT request to backend
    await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editName }),
    });

    // 🔄 Exit edit mode
    setEditingId(null);

    // 🧹 Clear input
    setEditName("");

    // 🔁 Refresh table data
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-visible">
      {/* HEADER */}
      <div className="px-5 py-4 border-b flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">Category List</h2>

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

              // : Add headers so backend can read JSON
              await fetch(url, {
                method,
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
              });

              //  Reset states after submit
              setName("");
              setShowForm(false);
              setEditingCategory(null);

              //  Refresh table
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
                  <div className="flex items-center gap-2">
                    {/* 🏷️ Category Name */}
                    {editingId === cat.id ? (
                      // 🔥 EDIT MODE
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border px-2 py-1 rounded text-sm"
                      />
                    ) : (
                      // 🔥 NORMAL MODE
                      <span>{cat.name}</span>
                    )}

                    {/* 🔥 Product Count Badge */}
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        cat._count?.products > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {cat._count?.products || 0} items
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-2">
                    {editingId === cat.id ? (
                      <>
                        {/* ✅ SAVE BUTTON */}
                        <button
                          onClick={() => handleUpdate(cat.id)}
                          className="px-3 py-1.5 text-sm rounded-md bg-green-50 text-green-600"
                        >
                          Save
                        </button>

                        {/* ❌ CANCEL BUTTON */}
                        <button
                          onClick={() => {
                            setEditingId(null); // exit edit mode
                            setEditName(""); // reset input
                          }}
                          className="px-3 py-1.5 text-sm rounded-md bg-gray-100 text-gray-600"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        {/* ✏️ EDIT BUTTON */}
                        <button
                          onClick={() => {
                            setEditingId(cat.id); // set row in edit mode
                            setEditName(cat.name); // preload input value
                          }}
                          className="px-3 py-1.5 text-sm rounded-md bg-blue-50 text-blue-600"
                        >
                          Edit
                        </button>

                        {/* 🗑 DELETE BUTTON (unchanged) */}
                        <div className="relative group">
                          <button
                            onClick={() => setDeleteTarget(cat)} // 🔥 open modal instead of deleting immediately
                            className="px-3 py-1.5 text-sm rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* 🔥 DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          {/* Modal Box */}
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg space-y-4">
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800">
              Delete Category
            </h2>

            {/* Message */}
            <p className="text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-medium">{deleteTarget.name}</span>?
            </p>

            {/* 🔥 Conditional warning */}
            {deleteTarget._count?.products > 0 && (
              <p className="text-sm text-red-500">
                ⚠ This category has {deleteTarget._count.products} products.
                They will become <strong>Uncategorized</strong>.
              </p>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              {/* Cancel */}
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-md bg-gray-100 text-gray-600"
              >
                Cancel
              </button>

              {/* Confirm Delete */}
              <button
                onClick={async () => {
                  await handleDelete(deleteTarget.id);
                  setDeleteTarget(null);

                  // 🔥 optional toast (if you want)
                  onDeleteSuccess("Category deleted successfully!");
                }}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
