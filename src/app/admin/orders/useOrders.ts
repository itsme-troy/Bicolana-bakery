"use client";

import { useState, useEffect } from "react";

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    const res = await fetch(`/api/orders?page=${page}&limit=${perPage}`);
    const data = await res.json();
    setOrders(data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const filtered = orders
    .filter((o) => (statusFilter === "all" ? true : o.status === statusFilter))
    .filter(
      (o) =>
        o.id.toString().includes(search.toLowerCase()) ||
        o.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        o.products.some((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
    );

  // ← FIX: correct page count
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return {
    orders: paginated,
    fetchOrders,
    page,
    setPage,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    totalPages,
  };
}
