"use client";

import { useEffect, useState } from "react";

export default function CategoryTable({ onEdit }: any) {
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
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="font-semibold mb-3">Category List</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th className="w-40">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat: any) => (
            <tr key={cat.id} className="border-b">
              <td>{cat.name}</td>
              <td className="space-x-2">
                <button
                  onClick={() => onEdit(cat)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(cat.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
