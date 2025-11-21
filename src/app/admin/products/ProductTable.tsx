"use client";

import { Trash2, Edit3 } from "lucide-react";

interface ProductTableProps {
  products: any[];
  handleEdit: (product: any) => void;
  handleDelete: (id: number) => void;
}

export default function ProductTable({
  products,
  handleEdit,
  handleDelete,
}: ProductTableProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg border border-neutral-200 mb-8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-orange-100 text-left text-sm">
            <th className="p-3">#</th>
            <th className="p-3">Name</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Description</th>
            <th className="p-3 text-center w-32">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4 text-neutral-500">
                No products yet.
              </td>
            </tr>
          ) : (
            products.map((p, i) => (
              <tr
                key={p.id}
                className="group border-t hover:bg-orange-50 text-sm transition-all duration-200"
              >
                <td className="p-3 text-neutral-500 font-semibold">{i + 1}</td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="px-4 py-3">{p.category?.name || "—"}</td>
                <td className="p-3 text-orange-600">₱{p.price}</td>
                <td className="p-3">{p.description || "No description"}</td>
                <td className="p-3 text-center flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(p)}
                    className="opacity-0 group-hover:opacity-100 transition text-blue-600 hover:text-blue-800"
                    title="Edit Product"
                  >
                    <Edit3 size={26} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="opacity-0 group-hover:opacity-100 transition text-red-600 hover:text-red-800"
                    title="Delete Product"
                  >
                    <Trash2 size={26} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
