// UserPage.tsx
"use client";

import { useState } from "react";
import { useUsers } from "./useUsers";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import Drawer from "../components/Drawer";
import Pagination from "../components/Pagination";

export default function UserPage() {
  const { users, fetchUsers, search, setSearch, page, setPage, totalPages } =
    useUsers();

  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<any | null>(null);

  const handleEdit = (u: any) => {
    setEditUser(u);
    setShowForm(true);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <nav className="text-sm text-neutral-500 mb-1">Dashboard / Users</nav>
          <h1 className="text-3xl font-bold">User Management</h1>
        </div>

        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="border rounded px-3 py-2"
          />
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
        users={users}
        handleEditUser={handleEdit}
        handleDeleteUser={async (id: number) => {
          if (!confirm("Delete user?")) return;
          await fetch(`/api/users/${id}`, { method: "DELETE" });
          fetchUsers();
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
            userName={editUser?.name || ""}
            userEmail={editUser?.email || ""}
            userPassword={""}
            userRole={editUser?.role || "customer"}
            setUserName={() => {}}
            setUserEmail={() => {}}
            setUserPassword={() => {}}
            setUserRole={() => {}}
            handleUserSubmit={async (e: any) => {
              e.preventDefault();
              await fetchUsers();
              setShowForm(false);
            }}
          />
        </Drawer>
      )}
    </>
  );
}
