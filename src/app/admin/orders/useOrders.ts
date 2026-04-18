"use client";

import { useState, useEffect } from "react";

/* ✅ DEFINE TYPES */
export type Product = {
  name: string;
};

export type User = {
  name: string;
};

export type Order = {
  id: number;
  status: string;
  total: number;
  user?: User;
  products: Product[];
};

/* ✅ HOOK */
export default function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/orders?page=${page}&limit=5`);
      const data = await res.json();

      setOrders(data.orders || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  return {
    orders,
    page,
    setPage,
    totalPages,
    fetchOrders,
  };
}