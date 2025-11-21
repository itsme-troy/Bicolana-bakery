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
  const [editUser, setEditUser] = useState(null);

  const handleEdit = (u) => {
    setEditUser(u);
    setShowForm(true);
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">User Management</h1>

        <div className="flex gap-3">
          <input
            type="text"
            value={search}
            placeholder="Search…"
            onChange={(e) => setSearch(e.target.value)}
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

      <UserTable users={users} handleEditUser={handleEdit} />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {showForm && (
        <Drawer onClose={() => setShowForm(false)} title="User Form">
          <UserForm
            editUserMode={!!editUser}
            {...editUser}
            handleUserSubmit={fetchUsers}
          />
        </Drawer>
      )}
    </>
  );
}
