"use client";

import { useState } from "react";
import useOrders, { Order } from "./useOrders";
import OrderTable from "./OrderTable";
import OrderForm from "./OrderForm";
import FilterBar from "@/components/FilterBar";

export default function OrderPage() {
  const { orders } = useOrders();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState(false);

  // ✅ FILTER LOGIC
 // ✅ FILTER LOGIC (FIXED)
const filteredOrders = orders.filter((order: Order) => {
  const matchesSearch =
    order.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    order.id.toString().includes(search) ||
    order.products.some((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

  const matchesStatus =
    status === "all" || order.status.toLowerCase() === status;

  return matchesSearch && matchesStatus;
});

return (
  <div className="p-6">
    {/* ✅ TITLE (keep this) */}
    <h1 className="text-2xl font-semibold mb-4">
      Order Management
    </h1>

    {/* ✅ 👉 ADD FILTER BAR HERE (REPLACE old controls) */}
    <FilterBar
      search={search}
      onSearchChange={setSearch}
      filters={[
        { label: "all", value: "all" },
        { label: "pending", value: "pending" },
        { label: "completed", value: "completed" },
        { label: "cancelled", value: "cancelled" },
      ]}
      activeFilter={status}
      onFilterChange={setStatus}
      actionLabel="Create Order"
      onActionClick={() => setOpen(true)}
    />

    {/* ✅ TABLE stays below */}
    <OrderTable orders={filteredOrders} />

    {/* ✅ MODAL */}
    {open && <OrderForm onClose={() => setOpen(false)} />}
  </div>
);