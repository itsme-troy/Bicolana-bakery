"use client";

import { useState, useEffect, useMemo } from "react";

export function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const perPage = 10;

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchProducts(), fetchCategories()]).finally(() =>
      setLoading(false)
    );
  }, []);

  // ✅ FIX: Memoize filtering so it does NOT affect hook order
  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        if (categoryFilter === "all") return true;
        return String(p.categoryId) === String(categoryFilter);
      })
      .filter((p) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
        );
      });
  }, [products, categoryFilter, search]);

  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = useMemo(() => {
    return filtered.slice((page - 1) * perPage, page * perPage);
  }, [filtered, page]);

  useEffect(() => {
    setPage(1);
  }, [categoryFilter, search]);

  return {
    loading,
    products: paginated,
    categories,

    search,
    setSearch,

    categoryFilter,
    setCategoryFilter,

    fetchProducts,
    fetchCategories,

    page,
    setPage,
    totalPages,
  };
}
