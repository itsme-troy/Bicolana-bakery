"use client";

import { useState, useMemo } from "react";
import { useUsers } from "./useUsers";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import Drawer from "../components/Drawer";
import Pagination from "../components/Pagination";
import toast from "react-hot-toast";

export default function UserPage() {
  const { users, fetchUsers, search, setSearch, page, setPage, totalPages } =
    useUsers();

  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<any | null>(null);

  // 🔥 NEW STATES
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("customer");

  const handleEdit = (u: any) => {
    setEditUser(u);
    setUserName(u.name);
    setUserEmail(u.email);
    setUserRole(u.role);
    setUserPassword("");
    setShowForm(true);
  };

  // 🔥 FILTER + SORT LAYER
  const processedUsers = useMemo(() => {
    let data = [...users];

    // 🎯 Role filter
    if (roleFilter !== "all") {
      data = data.filter(
        (u) => u.role.toLowerCase() === roleFilter.toLowerCase(),
      );
    }

    // 🔽 Sorting
    if (sortBy === "name-asc") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "newest") {
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (sortBy === "oldest") {
      data.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }

    return data;
  }, [users, roleFilter, sortBy]);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <nav className="text-sm text-neutral-500 mb-1">Dashboard / Users</nav>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* 🔍 SEARCH (already backend-powered) */}
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset page on search
            }}
            placeholder="Search..."
            className="border rounded px-3 py-2 text-gray-900"
          />

          {/* 🎯 ROLE FILTER */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border rounded px-3 py-2 text-gray-900"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          {/* 🔽 SORT */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-3 py-2 text-gray-900"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
          </select>

          <button
            onClick={() => {
              setEditUser(null);
              setShowForm(true);
            }}
            className="bg-orange-600 text-white px-4 py-2 rounded"
          >
            + Create User
          </button>
        </div>
      </div>

      <UserTable
        users={processedUsers} // ✅ IMPORTANT CHANGE
        handleEditUser={handleEdit}
        handleDeleteUser={async (id: number) => {
          if (!confirm("Delete user?")) return;

          try {
            const res = await fetch(`/api/users/${id}`, {
              method: "DELETE",
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            toast.success("User deleted");
            fetchUsers();
          } catch (err: any) {
            toast.error(err.message);
          }
        }}
      />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {showForm && (
        <Drawer
          onClose={() => setShowForm(false)}
          title={editUser ? "Edit User" : "Create User"}
        >
          <UserForm
            editUserMode={!!editUser}
            userName={userName}
            userEmail={userEmail}
            userPassword={userPassword}
            userRole={userRole}
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserPassword={setUserPassword}
            setUserRole={setUserRole}
            handleUserSubmit={async (e: any) => {
              e.preventDefault();

              try {
                const res = await fetch(
                  editUser ? `/api/users/${editUser.id}` : "/api/users",
                  {
                    method: editUser ? "PUT" : "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name: userName,
                      email: userEmail,
                      password: userPassword,
                      role: userRole,
                    }),
                  },
                );

                const data = await res.json();

                if (!res.ok) {
                  console.error("SERVER ERROR:", data);
                  throw new Error(data.error || "Request failed");
                }

                toast.success(editUser ? "User updated" : "User created");

                await fetchUsers();
                setShowForm(false);
              } catch (err: any) {
                toast.error(err.message);
              }
            }}
          />
        </Drawer>
      )}
    </>
  );
}
