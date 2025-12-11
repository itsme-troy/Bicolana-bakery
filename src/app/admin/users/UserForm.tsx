// UserForm.tsx
"use client";

export default function UserForm({
  editUserMode,
  userName,
  userEmail,
  userPassword,
  userRole,
  setUserName,
  setUserEmail,
  setUserPassword,
  setUserRole,
  handleUserSubmit,
}: any) {
  return (
    <form
      onSubmit={handleUserSubmit}
      className="bg-white border border-orange-100 rounded-lg p-6 max-w-lg space-y-4"
    >
      <h2 className="text-lg font-semibold text-orange-600">
        {editUserMode ? "Edit User" : "Add User"}
      </h2>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          value={userName}
          onChange={(e: any) => setUserName(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e: any) => setUserEmail(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          value={userPassword}
          onChange={(e: any) => setUserPassword(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Role</label>
        <select
          value={userRole}
          onChange={(e: any) => setUserRole(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-orange-600 text-white py-2 rounded"
      >
        {editUserMode ? "Update User" : "Add User"}
      </button>
    </form>
  );
}
