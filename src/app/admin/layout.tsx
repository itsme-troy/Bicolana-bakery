import Sidebar from "./components/Sidebar";
import "../globals.css";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-neutral-100">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Page content */}
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
