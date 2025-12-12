"use client";

import { Edit3, Trash2 } from "lucide-react";

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
  const getStatus = (stock: number) => {
    if (stock === 0)
      return { label: "Out of Stock", color: "bg-red-100 text-red-600" };
    if (stock < 10)
      return { label: "Low Stock", color: "bg-yellow-100 text-yellow-700" };
    return { label: "In Stock", color: "bg-green-100 text-green-600" };
  };

  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden w-full">
      <table className="w-full table-auto">
        {/* HEADER */}
        <thead className="bg-neutral-50 text-neutral-600 text-sm border-b">
          <tr>
            <th className="px-4 py-3 font-medium">PRODUCT</th>
            <th className="px-4 py-3 font-medium">CATEGORY</th>
            <th className="px-4 py-3 font-medium">PRICE</th>
            <th className="px-4 py-3 font-medium">STOCK</th>
            <th className="px-4 py-3 font-medium">STATUS</th>
            <th className="px-4 py-3 font-medium text-center w-[90px]">
              ACTIONS
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="text-neutral-700">
          {products.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-10 text-center text-neutral-500">
                No products yet
              </td>
            </tr>
          ) : (
            products.map((p, i) => {
              const status = getStatus(p.stock);

              return (
                <tr
                  key={p.id}
                  className="border-b last:border-none hover:bg-neutral-50 transition"
                >
                  {/* PRODUCT CELL */}
                  <td className="px-4 py-4 flex items-center gap-3">
                    <img
                      src={p.image || "/placeholder.png"}
                      alt={p.name}
                      className="h-12 w-12 rounded-lg object-cover border"
                    />
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-neutral-400">ID: {p.id}</p>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-4 py-4">
                    <span className="px-2.5 py-1 text-xs rounded-full bg-orange-100 text-orange-700 font-medium">
                      {p.category?.name || "—"}
                    </span>
                  </td>

                  {/* PRICE */}
                  <td className="px-4 py-4 font-medium text-neutral-800">
                    ₱{Number(p.price).toLocaleString()}
                  </td>

                  {/* STOCK */}
                  <td className="px-4 py-4">{p.stock}</td>

                  {/* STATUS PILL */}
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleEdit(p)}
                        className="p-1.5 rounded-lg hover:bg-neutral-200 transition"
                        title="Edit Product"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition"
                        title="Delete Product"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
