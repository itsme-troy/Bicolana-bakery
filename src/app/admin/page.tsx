// AdminPage.tsx
"use client";

import { useState } from "react";
import Dashboard from "./dashboard/Dashboard";
import ProductPage from "./products/ProductPage";
import UserPage from "./users/UserPage";
import OrderPage from "./orders/OrderPage";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "products" | "users" | "orders"
  >("dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex w-full">
        <main className="flex-1 p-6 md:p-10">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "products" && <ProductPage />}
          {activeTab === "users" && <UserPage />}
          {activeTab === "orders" && <OrderPage />}
        </main>
      </div>
    </div>
  );
}
