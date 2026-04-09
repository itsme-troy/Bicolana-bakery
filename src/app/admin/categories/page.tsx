"use client";
import { useState, useEffect } from "react";

import CategoryForm from "./components/CategoryForm";
import CategoryTable from "./components/CategoryTable";
export default function CategoriesPage() {
  const [refresh, setRefresh] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const handleSuccess = (message: string) => {
    setEditingCategory(null);
    setRefresh(!refresh);

    setToast({
      message,
      type: "success",
    });
  };

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

        {/* GRID LAYOUT */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* FORM */}
          <div className="md:col-span-1">
            <CategoryForm
              onSuccess={handleSuccess}
              editingCategory={editingCategory}
            />
          </div>

          {/* TABLE */}
          <div className="md:col-span-2">
            <CategoryTable
              key={refresh}
              onEdit={setEditingCategory}
              onDeleteSuccess={(msg: string) =>
                setToast({ message: msg, type: "success" })
              }
            />
          </div>
        </div>
      </div>

      {/* ✅ Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50">
          <div
            className={`px-4 py-3 rounded-lg shadow-lg text-white animate-fadeIn ${
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
