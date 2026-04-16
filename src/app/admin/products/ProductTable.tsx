"use client";

import { Edit3, Trash2 } from "lucide-react";

interface ProductTableProps {
  products: any[];
  loading: boolean;
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({
  products,
  loading,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const getStatus = (stock?: number) => {
    if (!stock || stock === 0)
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
          <th className="px-4 py-3 text-left font-medium">Category</th>
          <th className="px-4 py-3 text-left font-medium">Price</th>
          <th className="px-4 py-3 text-left font-medium">Stock</th>
          <th className="px-4 py-3 text-left font-medium">Status</th>
          <th className="px-4 py-3 text-center font-medium">Actions</th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          // 🔄 SKELETON LOADER
          Array.from({ length: 6 }).map((_, i) => (
            <tr key={i} className="animate-pulse border-t">
              {/* Product (image + name) */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>

                  <div className="h-4 w-32 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
                </div>
              </td>

              {/* Category */}
              <td className="px-4 py-3">
                <div className="h-4 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
              </td>

              {/* Price */}
              <td className="px-4 py-3">
                <div className="h-4 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
              </td>

              {/* Stock */}
              <td className="px-4 py-3">
                <div className="h-4 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <div className="h-6 w-20 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
              </td>

              {/* Actions */}
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-2">
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                </div>
              </td>
            </tr>
          ))
        ) : products.length === 0 ? (
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
                className="hover:bg-orange-50 transition duration-200 cursor-pointer"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image || "/default_product_image.png"}
                      onError={(e) => {
                        e.currentTarget.src = "/default_product_image.png";
                      }}
                      className="h-10 w-10 rounded-md object-cover border"
                    />
                    <span className="font-medium">{p.name}</span>
                  </div>
                </td>

                <td className="px-4 py-3">{p.category?.name}</td>

                <td className="px-4 py-3">
                  ₱{Number(p.price).toLocaleString()}
                </td>

                <td className="px-4 py-3">{p.stock ?? 0}</td>

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
