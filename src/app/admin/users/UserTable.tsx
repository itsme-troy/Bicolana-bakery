// UserTable.tsx
"use client";

import { Trash2, Edit3 } from "lucide-react";

export default function UserTable({
  users,
  handleEditUser,
  handleDeleteUser,
}: any) {
  return (
    <div className="bg-white shadow-sm rounded-lg border border-neutral-200 mb-6">
      <table className="w-full">
        <thead>
          <tr className="bg-orange-50 text-left text-sm">
            <th className="p-3">#</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Created</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-8 text-neutral-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map((u: any, i: number) => (
              <tr
                key={u.id}
                className="group border-t hover:bg-orange-50 transition"
              >
                <td className="p-3 text-neutral-500">{i + 1}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize">{u.role}</td>
                <td className="p-3">
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => handleEditUser(u)} title="Edit">
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
