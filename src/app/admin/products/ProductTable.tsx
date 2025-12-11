// ProductTable.tsx
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
    <div className="bg-white shadow-sm rounded-lg border border-neutral-200 mb-6">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-orange-50 text-left text-sm">
            <th className="p-3">#</th>
            <th className="p-3">Product</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Description</th>
            <th className="p-3 text-center w-28">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-8 text-neutral-500">
                <div className="space-y-2">
                  <div className="text-lg font-medium">No products yet</div>
                  <div className="text-sm">
                    Add your first product to get started.
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            products.map((p, i) => (
              <tr
                key={p.id}
                className="group border-t hover:bg-orange-50 transition"
              >
                <td className="p-3 text-neutral-500 font-semibold">{i + 1}</td>

                <td className="p-3 flex items-center gap-3">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-12 w-12 rounded object-cover border"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded bg-neutral-100 flex items-center justify-center text-neutral-400">
                      —
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-neutral-500">
                      {p.sku || ""}
                    </div>
                  </div>
                </td>

                <td className="p-3">
                  {p.category?.name ? (
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                      {p.category.name}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>

                <td className="p-3 text-orange-600 font-semibold">
                  ₱{p.price}
                </td>

                <td className="p-3 max-w-xs truncate">
                  {p.description || "No description"}
                </td>

                <td className="p-3 text-center">
                  <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleEdit(p)}
                      title="Edit"
                      className="p-1 rounded hover:bg-white/30"
                    >
                      <Edit3 size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      title="Delete"
                      className="p-1 rounded hover:bg-white/30"
                    >
                      <Trash2 size={18} />
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
}
