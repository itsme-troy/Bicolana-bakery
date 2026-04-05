"use client";

type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};

interface OrderFormProps {
  users: any[];
  products: any[];
  selectedUser: string;
  status: string;
  setSelectedUser: (val: string) => void;
  setStatus: (val: string) => void;
  handleOrderSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
  editMode?: boolean;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function OrderForm({
  users,
  products,
  selectedUser,
  status,
  setSelectedUser,
  setStatus,
  handleOrderSubmit,
  loading = false,
  editMode = false,
  cart,
  setCart,
}: OrderFormProps) {
  return (
    <form
      onSubmit={handleOrderSubmit}
      className="bg-white border border-orange-200 shadow-md rounded-xl p-6 max-w-lg animate-fadeIn"
    >
      <h2 className="text-lg font-semibold mb-4 text-orange-600">
        {editMode ? "Edit Order" : "Create New Order"}
      </h2>

      {/* Select Customer */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Customer</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select a customer</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      {/* Select Products */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Products</label>

        {/* Add Product */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Add Product</label>

          <select
            onChange={(e) => {
              const product = products.find((p) => p.id == e.target.value);
              if (!product) return;

              setCart((prev) => {
                const exists = prev.find((i) => i.productId === product.id);
                if (exists) return prev;

                return [
                  ...prev,
                  {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                  },
                ];
              });
            }}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (₱{p.price})
              </option>
            ))}
          </select>
        </div>

        {/* Cart */}
        <div className="border rounded-lg overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Product</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Price</th>
                <th className="p-2">Subtotal</th>
                <th className="p-2"></th>
              </tr>
            </thead>

            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-3 text-gray-500">
                    No items added
                  </td>
                </tr>
              ) : (
                cart.map((item, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{item.name}</td>

                    <td className="p-2 text-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const qty = Number(e.target.value);

                          setCart((prev) =>
                            prev.map((c, idx) =>
                              idx === i ? { ...c, quantity: qty } : c,
                            ),
                          );
                        }}
                        className="w-16 border rounded text-center"
                      />
                    </td>

                    <td className="p-2 text-center">₱{item.price}</td>

                    <td className="p-2 text-center">
                      ₱{item.price * item.quantity}
                    </td>

                    <td className="p-2 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          setCart((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        className="text-red-500"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="text-right font-semibold text-lg mb-4">
          Total: ₱{cart.reduce((sum, i) => sum + i.price * i.quantity, 0)}
        </div>
      </div>

      {/* ✅ Status Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Order Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition disabled:opacity-60"
      >
        {loading ? "Saving..." : editMode ? "Update Order" : "Save Order"}
      </button>
    </form>
  );
}
