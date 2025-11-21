"use client";

import { useState, useEffect } from "react";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const perPage = 5;

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    setUsers(await res.json());
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return {
    users: paginated,
    fetchUsers,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
  };
}
