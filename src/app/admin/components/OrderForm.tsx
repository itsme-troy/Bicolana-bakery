"use client";

interface OrderFormProps {
  users: any[];
  products: any[];
  selectedUser: string;
  selectedProducts: string[];
  status: string;
  setSelectedUser: (val: string) => void;
  setSelectedProducts: (val: string[]) => void;
  setStatus: (val: string) => void;
  handleOrderSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
  editMode?: boolean;
}

export default function OrderForm({
  users,
  products,
  selectedUser,
  selectedProducts,
  status,
  setSelectedUser,
  setSelectedProducts,
  setStatus,
  handleOrderSubmit,
  loading = false,
  editMode = false,
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
        <select
          multiple
          value={selectedProducts}
          onChange={(e) =>
            setSelectedProducts(
              Array.from(e.target.selectedOptions, (opt) => opt.value)
            )
          }
          className="w-full border border-neutral-300 rounded-md px-3 py-2 h-40 focus:ring-2 focus:ring-orange-500"
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Hold Ctrl/Cmd to select multiple products
        </p>
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
