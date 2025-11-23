"use client";

import { useState, useEffect } from "react";

export function useProducts() {

const [products, setProducts] = useState<any[]>([]);
const [categories, setCategories] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const perPage = 5;

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

const fetchProducts = async () => {
  const res = await fetch("/api/products");
  const data = await res.json();
  setProducts(Array.isArray(data) ? data : []);
};


  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    setLoading(false);
  }, []);

  const filtered = products
    .filter((p) =>
      categoryFilter === "all" ? true : p.category?.name === categoryFilter
    )
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
    );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

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
