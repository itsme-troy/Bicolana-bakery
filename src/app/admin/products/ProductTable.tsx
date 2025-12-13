"use client";

import { Edit3, Trash2 } from "lucide-react";

interface ProductTableProps {
  products: any[];
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const getStatus = (stock: number) => {
    if (stock === 0)
      return { label: "Out of Stock", color: "bg-red-100 text-red-600" };
    if (stock < 10)
      return { label: "Low Stock", color: "bg-yellow-100 text-yellow-700" };
    return { label: "In Stock", color: "bg-green-100 text-green-600" };
  };

  return (
    <table className="w-full text-sm">
      <thead className="bg-neutral-50 text-neutral-600 border-b">
        <tr>
          <th className="px-4 py-3 text-left font-medium">Product</th>
          <th className="px-4 py-3 font-medium">Category</th>
          <th className="px-4 py-3 font-medium">Price</th>
          <th className="px-4 py-3 font-medium">Stock</th>
          <th className="px-4 py-3 font-medium">Status</th>
          <th className="px-4 py-3 text-center font-medium">Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan={6} className="py-14 text-center text-neutral-400">
              No products yet
            </td>
          </tr>
        ) : (
          products.map((p) => {
            const status = getStatus(p.stock);

            return (
              <tr
                key={p.id}
                className="border-b last:border-none hover:bg-neutral-50"
              >
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={p.image || "/placeholder.png"}
                    className="h-10 w-10 rounded-md object-cover border"
                  />
                  <span className="font-medium">{p.name}</span>
                </td>

                <td className="px-4 py-3">{p.category?.name}</td>
                <td className="px-4 py-3">
                  ₱{Number(p.price).toLocaleString()}
                </td>
                <td className="px-4 py-3">{p.stock}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}
                  >
                    {status.label}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(p)}
                      className="p-1.5 rounded hover:bg-neutral-200"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="p-1.5 rounded hover:bg-red-100 text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
