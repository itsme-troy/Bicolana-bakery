"use client";

import { useState, useEffect } from "react"; //
import { useOrders } from "./useOrders";
import OrderTable from "./OrderTable";
import OrderForm from "./OrderForm";
import Drawer from "../components/Drawer";
import Pagination from "../components/Pagination";

type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};

export default function OrderPage() {
  const {
    orders,
    fetchOrders,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
  } = useOrders();

  const [showForm, setShowForm] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [status, setStatus] = useState("pending");

  const [cart, setCart] = useState<CartItem[]>([]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser || cart.length === 0) {
      alert("Select customer and at least 1 product");
      return;
    }

    // ✅ decide if CREATE or UPDATE
    if (editOrder) {
      // 🔁 UPDATE existing order
      await fetch(`/api/orders/${editOrder.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: selectedUser,
          items: cart,
          status,
        }),
      });
    } else {
      // ➕ CREATE new order
      await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: selectedUser,
          items: cart,
          status,
        }),
      });
    }

    // ✅ reset form after save/update
    setCart([]);
    setSelectedUser("");
    setStatus("pending");
    setEditOrder(null);

    setShowForm(false);

    // ✅ refresh table
    fetchOrders();
  };
  useEffect(() => {
    const fetchData = async () => {
      const [usersRes, productsRes] = await Promise.all([
        fetch("/api/users"),
        fetch("/api/products"),
      ]);

      const usersData = await usersRes.json();
      const productsData = await productsRes.json();

      setUsers(usersData);
      setProducts(productsData);
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">Order Management</h1>

        <div className="flex gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="border rounded px-3 py-2"
          />

          <button
            onClick={() => {
              setEditOrder(null); // clear edit mode

              // ✅ reset form fields
              setSelectedUser("");
              setStatus("pending");
              setCart([]);

              setShowForm(true); // open empty form
            }}
            className="bg-orange-600 text-white px-4 py-2 rounded"
          >
            + Create Order
          </button>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        {["all", "pending", "completed", "cancelled"].map((s) => (
          <button
            key={s}
            className={`px-3 py-1 rounded ${
              statusFilter === s ? "bg-orange-500 text-white" : "bg-gray-50"
            }`}
            onClick={() => setStatusFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <OrderTable
        orders={orders}
        handleEditOrder={(o) => {
          setEditOrder(o); // store current order being edited

          setPage(1); // optional: reset pagination

          // ✅ populate form fields
          setSelectedUser(o.userId.toString()); // set selected customer
          setStatus(o.status); // set order status

          // ✅ convert backend products → cart format
          setCart(
            o.products.map((p: any) => ({
              productId: p.id,
              name: p.name,
              price: p.price,
              quantity: p.quantity,
            })),
          );

          setShowForm(true); // open drawer AFTER data is ready
        }}
        handleDeleteOrder={() => {}}
      />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {showForm && (
        <Drawer onClose={() => setShowForm(false)} title="Order Form">
          <OrderForm
            users={users}
            products={products}
            selectedUser={selectedUser}
            status={status}
            setSelectedUser={setSelectedUser}
            setStatus={setStatus}
            cart={cart}
            setCart={setCart}
            handleOrderSubmit={handleSubmit}
            editMode={!!editOrder}
          />
        </Drawer>
      )}
    </>
  );
}
