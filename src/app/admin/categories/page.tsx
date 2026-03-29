"use client";

import { useState } from "react";
import CategoryTable from "./components/CategoryTable";
import CategoryForm from "./components/CategoryForm";

export default function CategoriesPage() {
  const [refresh, setRefresh] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const handleSuccess = () => {
    setEditingCategory(null);
    setRefresh(!refresh); // triggers reload
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🍞 Categories</h1>

      {/* Form */}
      <CategoryForm
        onSuccess={handleSuccess}
        editingCategory={editingCategory}
      />

      {/* Table */}
      <CategoryTable key={refresh} onEdit={setEditingCategory} />
    </div>
  );
}
