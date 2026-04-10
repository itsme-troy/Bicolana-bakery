"use client";
import { useState, useEffect } from "react";
import CategoryTable from "./components/CategoryTable";

export default function CategoriesPage() {
  const [refresh, setRefresh] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <>
      <div className="p-6 space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Category Management
          </h1>
        </div>

        {/* ✅ ONLY TABLE NOW */}
        <CategoryTable
          key={refresh}
          onDeleteSuccess={(msg: string) => {
            setToast({ message: msg, type: "success" });
            setRefresh((prev) => !prev); // 🔥 refresh after delete
          }}
        />
      </div>

      {/* ✅ Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50">
          <div
            className={`px-4 py-3 rounded-lg shadow-lg text-white ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </>
  );
}
