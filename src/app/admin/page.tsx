"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProductPage from "./products/ProductPage";
import UserPage from "./users/UserPage";
import OrderPage from "./orders/OrderPage";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"products" | "users" | "orders">(
    "products"
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-10 bg-white text-gray-900">
        {activeTab === "products" && <ProductPage />}
        {activeTab === "users" && <UserPage />}
        {activeTab === "orders" && <OrderPage />}
      </main>
    </div>
  );
}
