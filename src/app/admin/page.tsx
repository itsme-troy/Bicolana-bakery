"use client";

interface User {
  id: number;
  name: string;
  email: string;
}
interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId: number;
  category?: { id: number; name: string };
}
import { useEffect, useState } from "react";

// 🧩 Modular components
import Sidebar from "./components/Sidebar";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import OrderTable from "./components/OrderTable";
import OrderForm from "./components/OrderForm";
import Drawer from "./components/Drawer";

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
  const [status, setStatus] = useState("pending");
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  // STATES for order creation
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // SEARCH QUERY STATE
  const [searchQuery, setSearchQuery] = useState("");

  // CATEGORY STATES
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("all");

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 🔄 Fetch data on mount
  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // ------------------------------
  // 🧁 PRODUCTS/
  // ------------------------------
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("Products API returned non-array:", data);
        setProducts([]); // fallback
      }
    } catch (err) {
      console.error(err);
      setProducts([]);
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
        body: JSON.stringify({ name, description, price, image, categoryId }),
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
    setCategoryId(product.categoryId.toString());
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

    const method = editMode ? "PUT" : "POST";
    const url = editMode ? `/api/orders/${editId}` : "/api/orders";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: selectedUser,
        productIds: selectedProducts,
        status, // ✅ include order status
      }),
    });

    if (res.ok) {
      setShowForm(false);
      setEditMode(false);
      setEditId(null);
      setStatus("pending");
      fetchOrders();
    } else {
      alert("Failed to save order");
    }
  };

  // ✏️ Edit order
  const handleEditOrder = (order: any) => {
    setShowForm(true);
    setSelectedUser(order.userId.toString());
    setSelectedProducts(order.products.map((p: any) => p.id.toString()));
    setStatus(order.status); // ✅ load current status
    setEditMode(true);
    setEditId(order.id);
  };

  // 🗑️ Delete order
  const handleDeleteOrder = async (id: number) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete order");
      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to delete order");
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

      // Handle non-OK responses
      if (!res.ok) {
        console.error("Error fetching orders:", await res.text());
        setOrders([]);
        return;
      }

      const data = await res.json();

      // ✅ Ensure data is always an array
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error("Unexpected orders response:", data);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const filteredProducts = products
    .filter((p) => {
      if (categoryFilter === "all") return true;
      return p.category?.name === categoryFilter;
    })
    .filter((p) => {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    });

  // PAGINATED PRODUCTS
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter by status
  const filteredOrders = orders.filter((order) => {
    if (statusFilter === "all") return true;
    return order.status.toLowerCase() === statusFilter;
  });

  // Filter by search (AFTER status filter)
  const searchedOrders = filteredOrders.filter((order) => {
    const q = searchQuery.toLowerCase();

    return (
      order.id.toString().includes(q) ||
      `#${order.id}`.toLowerCase().includes(q) ||
      order.user?.name?.toLowerCase().includes(q) ||
      order.products.some((p) => p.name.toLowerCase().includes(q))
    );
  });

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

              <div className="flex items-center gap-3">
                {/* CATEGORY FILTER */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c: any) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>

                {/* SEARCH BAR */}
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 w-64 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>

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
              products={paginatedProducts}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            {/* PAGINATION */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
              >
                Prev
              </button>

              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>

            {/* Drawer for ProductForm */}
            {showForm && (
              <Drawer
                onClose={() => setShowForm(false)}
                width="max-w-lg"
                title={editMode ? "Edit Product" : "Add New Product"}
              >
                <ProductForm
                  editMode={editMode}
                  name={name}
                  description={description}
                  price={price}
                  image={image}
                  categoryId={categoryId}
                  setName={setName}
                  setDescription={setDescription}
                  setPrice={setPrice}
                  setImage={setImage}
                  setCategoryId={setCategoryId}
                  categories={categories}
                  loading={loading}
                  handleSubmit={handleSubmit}
                  fetchCategories={fetchCategories}
                />
              </Drawer>
            )}
          </>
        ) : activeTab === "users" ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">User Management</h1>

              {/* GLOBAL SEARCH BAR */}
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 w-64 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-orange-400 outline-none"
              />

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
              users={filteredUsers}
              handleEditUser={handleEditUser}
              handleDeleteUser={handleDeleteUser}
            />

            {/* Drawer for UserForm */}
            {showForm && (
              <Drawer
                onClose={() => setShowForm(false)}
                title={editUserMode ? "Edit User" : "Create User"}
              >
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
              </Drawer>
            )}
          </>
        ) : (
          <>
            {/* 📦 ORDER MANAGEMENT */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Order Management</h1>

              {/* GLOBAL SEARCH BAR */}
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 w-64 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-orange-400 outline-none"
              />

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
                {/* STATUS FILTER BUTTONS */}
                <div className="flex gap-3 mb-4">
                  {["all", "pending", "completed", "cancelled"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`
        px-4 py-2 rounded-full border text-sm capitalize
        ${
          statusFilter === s
            ? "bg-orange-500 text-white"
            : "bg-white hover:bg-gray-100"
        }
      `}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* FILTERED ORDER TABLE */}
                <OrderTable
                  orders={searchedOrders}
                  handleEditOrder={handleEditOrder}
                  handleDeleteOrder={handleDeleteOrder}
                />

                {/* Drawer for OrderForm */}
                {showForm && (
                  <Drawer
                    onClose={() => setShowForm(false)}
                    width="max-w-2xl"
                    title={editMode ? "Edit Order" : "Create Order"}
                  >
                    <OrderForm
                      users={users}
                      products={products}
                      selectedUser={selectedUser}
                      selectedProducts={selectedProducts}
                      status={status}
                      setSelectedUser={setSelectedUser}
                      setSelectedProducts={setSelectedProducts}
                      setStatus={setStatus}
                      handleOrderSubmit={handleOrderSubmit}
                      loading={loadingOrders}
                      editMode={editMode}
                    />
                  </Drawer>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
