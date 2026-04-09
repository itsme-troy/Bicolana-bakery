"use client";
import { useState } from "react";

import CategoryForm from "./components/CategoryForm";
import CategoryTable from "./components/CategoryTable";
export default function CategoriesPage() {
  const [refresh, setRefresh] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const handleSuccess = () => {
    setEditingCategory(null);
    setRefresh(!refresh);
  };

  return (
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
          <CategoryTable key={refresh} onEdit={setEditingCategory} />
        </div>
      </div>
    </div>
  );
}
