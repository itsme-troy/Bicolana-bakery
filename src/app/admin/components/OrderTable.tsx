export default function OrderTable({ orders }: any) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
        <thead className="bg-orange-100 text-left">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Customer</th>
            <th className="py-3 px-4">Products</th>
            <th className="py-3 px-4">Total</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order: any, index: number) => (
              <tr key={order.id} className="border-t hover:bg-orange-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{order.user?.name || "Guest"}</td>
                <td className="py-3 px-4">
                  {order.products.map((p: any) => p.name).join(", ")}
                </td>
                <td className="py-3 px-4">₱{order.total}</td>
                <td className="py-3 px-4">
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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
