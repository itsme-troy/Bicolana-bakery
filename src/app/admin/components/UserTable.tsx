"use client";

import { Trash2, Edit3 } from "lucide-react";

interface UserTableProps {
  users: any[];
  handleEditUser: (user: any) => void;
  handleDeleteUser: (id: number) => void;
}

export default function UserTable({
  users,
  handleEditUser,
  handleDeleteUser,
}: UserTableProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg border border-neutral-200 mb-8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-orange-100 text-left text-sm">
            <th className="p-3">#</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Created At</th>
            <th className="p-3 text-center w-32">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4 text-neutral-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((u, index) => (
              <tr
                key={u.id}
                className="group border-t hover:bg-orange-50 text-sm transition-all duration-200"
              >
                <td className="p-3 text-neutral-500 font-semibold">
                  {index + 1}
                </td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize">{u.role}</td>
                <td className="p-3">
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="p-3 text-center flex justify-center gap-3">
                  <button
                    onClick={() => handleEditUser(u)}
                    className="opacity-0 group-hover:opacity-100 transition text-blue-600 hover:text-blue-800"
                    title="Edit User"
                  >
                    <Edit3 size={22} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(u.id)}
                    className="opacity-0 group-hover:opacity-100 transition text-red-600 hover:text-red-800"
                    title="Delete User"
                  >
                    <Trash2 size={22} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
