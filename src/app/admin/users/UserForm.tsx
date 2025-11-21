"use client";

interface UserFormProps {
  editUserMode: boolean;
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: string;
  setUserName: (val: string) => void;
  setUserEmail: (val: string) => void;
  setUserPassword: (val: string) => void;
  setUserRole: (val: string) => void;
  handleUserSubmit: (e: React.FormEvent) => void;
}

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
}: UserFormProps) {
  return (
    <form
      onSubmit={handleUserSubmit}
      className="bg-white border border-orange-200 shadow-md rounded-xl p-6 max-w-lg animate-fadeIn"
    >
      <h2 className="text-lg font-semibold mb-4 text-orange-600">
        {editUserMode ? "Edit User" : "Add New User"}
      </h2>

      {/* Name */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
          placeholder="Full name"
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
          placeholder="user@example.com"
        />
      </div>

      {/* Password */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
          placeholder="********"
        />
      </div>

      {/* Role */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-orange-600 text-white py-2 rounded-md font-semibold hover:bg-orange-700 transition"
      >
        {editUserMode ? "Update User" : "Add User"}
      </button>
    </form>
  );
}
