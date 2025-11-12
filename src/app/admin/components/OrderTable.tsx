"use client";

import { Trash2, Edit3 } from "lucide-react";

interface OrderTableProps {
  orders: any[];
  handleEditOrder: (order: any) => void;
  handleDeleteOrder: (id: number) => void;
}

export default function OrderTable({
  orders,
  handleEditOrder,
  handleDeleteOrder,
}: OrderTableProps) {
  return (
    <div className="overflow-x-auto bg-white shadow-sm rounded-lg border border-neutral-200 mb-8">
      <table className="min-w-full border-collapse">
        <thead className="bg-orange-100 text-left text-sm">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Customer</th>
            <th className="py-3 px-4">Products</th>
            <th className="py-3 px-4">Total</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4 text-center w-32">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-6 text-gray-500">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order: any, index: number) => (
              <tr
                key={order.id}
                className="group border-t hover:bg-orange-50 text-sm transition-all duration-200"
              >
                <td className="py-3 px-4 text-neutral-500 font-semibold">
                  {index + 1}
                </td>
                <td className="py-3 px-4">{order.user?.name || "Guest"}</td>
                <td className="py-3 px-4">
                  {order.products.map((p: any) => p.name).join(", ")}
                </td>
                <td className="py-3 px-4">₱{order.total}</td>
                <td className="py-3 px-4 capitalize">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-center flex justify-center gap-3">
                  <button
                    onClick={() => handleEditOrder(order)}
                    className="opacity-0 group-hover:opacity-100 transition text-blue-600 hover:text-blue-800"
                    title="Edit Order"
                  >
                    <Edit3 size={22} />
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="opacity-0 group-hover:opacity-100 transition text-red-600 hover:text-red-800"
                    title="Delete Order"
                  >
                    <Trash2 size={22} />
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
