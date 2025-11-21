"use client";

import { useState } from "react";
import { useOrders } from "./useOrders";
import OrderTable from "./OrderTable";
import OrderForm from "./OrderForm";
import Drawer from "../components/Drawer";
import Pagination from "../components/Pagination";

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
              setEditOrder(null);
              setShowForm(true);
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
          setEditOrder(o);
          setShowForm(true);
        }}
        handleDeleteOrder={() => {}}
      />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {showForm && (
        <Drawer onClose={() => setShowForm(false)} title="Order Form">
          <OrderForm
            users={[]}
            products={[]}
            selectedUser=""
            selectedProducts={[]}
            status="pending"
            setSelectedUser={() => {}}
            setSelectedProducts={() => {}}
            setStatus={() => {}}
            handleOrderSubmit={fetchOrders}
          />
        </Drawer>
      )}
    </>
  );
}
