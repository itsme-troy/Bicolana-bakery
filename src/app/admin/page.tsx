"use client";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

import { useEffect, useState } from "react";

// 🧩 Modular components
import Sidebar from "./components/Sidebar";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import OrderTable from "./components/OrderTable";

export default function AdminPage() {
  // 🧭 Add "orders" to the allowed tab options
  const [activeTab, setActiveTab] = useState<"products" | "users" | "orders">(
    "products"
  );

  // Shared UI states
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // 📦 PRODUCT STATES
  const [products, setProducts] = useState<Product[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // 👤 USER STATES
  const [users, setUsers] = useState<User[]>([]);
  const [editUserMode, setEditUserMode] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("customer");

  // 📦 ORDER STATES
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // STATES for order creation
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // 🔄 Fetch data on mount
  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, []);

  // ------------------------------
  // 🧁 PRODUCTS
  // ------------------------------
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return alert("Name and price are required!");
    setLoading(true);

    try {
      const method = editMode ? "PUT" : "POST";
      const url = editMode ? `/api/products/${editId}` : "/api/products";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price, image }),
      });

      if (!res.ok) throw new Error("Failed to save product");

      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setEditMode(false);
      setEditId(null);
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Error saving product!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: any) => {
    setEditMode(true);
    setEditId(product.id);
    setName(product.name);
    setDescription(product.description || "");
    setPrice(product.price);
    setImage(product.image || "");
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || selectedProducts.length === 0)
      return alert("Select a user and at least one product!");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: selectedUser,
        productIds: selectedProducts,
      }),
    });

    if (res.ok) {
      setShowForm(false);
      fetchOrders();
    } else {
      alert("Failed to create order");
    }
  };

  // ------------------------------
  // 👥 USERS
  // ------------------------------
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail || !userPassword)
      return alert("All fields are required!");

    try {
      const method = editUserMode ? "PUT" : "POST";
      const url = editUserMode ? `/api/users/${editUserId}` : "/api/users";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          password: userPassword,
          role: userRole,
        }),
      });

      if (!res.ok) throw new Error("Error saving user");

      setUserName("");
      setUserEmail("");
      setUserPassword("");
      setUserRole("customer");
      setEditUserMode(false);
      setEditUserId(null);
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Error saving user!");
    }
  };

  const handleEditUser = (u: any) => {
    setEditUserMode(true);
    setEditUserId(u.id);
    setUserName(u.name);
    setUserEmail(u.email);
    setUserPassword(u.password);
    setUserRole(u.role);
    setShowForm(true);
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };

  // ------------------------------
  // 📦 ORDERS
  // ------------------------------
  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  // ------------------------------
  // 🧩 UI
  // ------------------------------
  return (
    <div className="flex min-h-screen bg-gray-100 text-neutral-900">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 p-10">
        {activeTab === "products" ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Product Management</h1>
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setEditMode(false);
                  setName("");
                  setDescription("");
                  setPrice("");
                  setImage("");
                }}
                className="bg-orange-600 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-700 transition"
              >
                {showForm ? "✖ Cancel" : "➕ Create"}
              </button>
            </div>

            <ProductTable
              products={products}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />

            {showForm && (
              <ProductForm
                editMode={editMode}
                name={name}
                description={description}
                price={price}
                image={image}
                loading={loading}
                setName={setName}
                setDescription={setDescription}
                setPrice={setPrice}
                setImage={setImage}
                handleSubmit={handleSubmit}
              />
            )}
          </>
        ) : activeTab === "users" ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">User Management</h1>
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setEditUserMode(false);
                  setUserName("");
                  setUserEmail("");
                  setUserPassword("");
                  setUserRole("customer");
                }}
                className="bg-orange-600 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-700 transition"
              >
                {showForm ? "✖ Cancel" : "➕ Create User"}
              </button>
            </div>

            <UserTable
              users={users}
              handleEditUser={handleEditUser}
              handleDeleteUser={handleDeleteUser}
            />

            {showForm && (
              <UserForm
                editUserMode={editUserMode}
                userName={userName}
                userEmail={userEmail}
                userPassword={userPassword}
                userRole={userRole}
                setUserName={setUserName}
                setUserEmail={setUserEmail}
                setUserPassword={setUserPassword}
                setUserRole={setUserRole}
                handleUserSubmit={handleUserSubmit}
              />
            )}
          </>
        ) : (
          <>
            {/* 📦 ORDER MANAGEMENT */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Order Management</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-700 transition"
                >
                  {showForm ? "✖ Cancel" : "➕ Create Order"}
                </button>
                <button
                  onClick={fetchOrders}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-600 transition"
                >
                  🔄 Refresh Orders
                </button>
              </div>
            </div>

            {loadingOrders ? (
              <p className="text-gray-500">Loading orders...</p>
            ) : (
              <>
                <OrderTable orders={orders} />

                {/* ✅ Show form when toggled */}
                {showForm && (
                  <form
                    onSubmit={handleOrderSubmit}
                    className="bg-white p-6 rounded-md shadow-md mt-6 space-y-4"
                  >
                    <h2 className="text-xl font-semibold mb-2">
                      Create New Order
                    </h2>

                    {/* Select customer */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Customer
                      </label>
                      <select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        className="border rounded-md p-2 w-full"
                      >
                        <option value="">Select a customer</option>
                        {users.map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Select products */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Products
                      </label>
                      <select
                        multiple
                        value={selectedProducts}
                        onChange={(e) =>
                          setSelectedProducts(
                            Array.from(
                              e.target.selectedOptions,
                              (opt) => opt.value
                            )
                          )
                        }
                        className="border rounded-md p-2 w-full h-32"
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                    >
                      Save Order
                    </button>
                  </form>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
