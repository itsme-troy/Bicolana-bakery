"use client";

import { useEffect, useState } from "react";

export default function CategoryTable({ onEdit, onDeleteSuccess  }: any) {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

const handleDelete = async (id: number) => {
  if (!confirm("Delete this category?")) return;

  await fetch(`/api/categories/${id}`, {
    method: "DELETE",
  });

  fetchCategories();

  onDeleteSuccess("Category deleted successfully!");
};
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
  <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
    {/* HEADER */}
    <div className="px-5 py-4 border-b">
      <h2 className="font-semibold text-gray-800">
        Category List
      </h2>
    </div>

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
                    onClick={() => onEdit(cat)}
                    className="px-3 py-1.5 text-sm rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
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
