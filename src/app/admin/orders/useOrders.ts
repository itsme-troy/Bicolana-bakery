"use client";

import { useState, useEffect } from "react";

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async () => {
    const res = await fetch(
      `/api/orders?page=${page}&limit=5`
    );

    const data = await res.json();

    let filtered = data.orders;

    // ✅ apply filters HERE (not before pagination)
    if (statusFilter !== "all") {
      filtered = filtered.filter((o: any) => o.status === statusFilter);
    }

    if (search) {
      filtered = filtered.filter((o: any) =>
        o.id.toString().includes(search.toLowerCase()) ||
        o.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        o.products.some((p: any) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    setOrders(filtered);
    setTotalPages(data.totalPages); // ✅ use backend pagination
  };

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter, search]);

  return {
    orders,
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