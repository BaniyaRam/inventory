import { useEffect, useState } from "react";
import { MockProduct } from "../Data/mockproduct";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    const loadDashboardData = () => {
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const deletedIds =
        JSON.parse(localStorage.getItem("deletedProducts")) || [];
      const combined = [...MockProduct, ...storedProducts].filter(
        (p) => !deletedIds.includes(p.id)
      );
      setProducts(combined);
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(storedOrders);
    };
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 2000);
    return () => clearInterval(interval);
  }, []);

  const totalSales = orders.reduce((sum, o) => sum + o.amount, 0);
  const totalOrders = orders.length;
  const avgOrderValue =
    totalOrders > 0 ? (totalSales / totalOrders).toFixed(2) : 0;

  const handleDeleteConfirm = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    const deletedIds =
      JSON.parse(localStorage.getItem("deletedProducts")) || [];
    localStorage.setItem(
      "deletedProducts",
      JSON.stringify([...deletedIds, id])
    );
    localStorage.setItem(
      "products",
      JSON.stringify(
        updated.filter((p) => !MockProduct.some((mp) => mp.id === p.id))
      )
    );
    toast.success("Product deleted successfully");
    setConfirmDelete(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
    });
  };

  const handleSave = () => {
    const updated = products.map((p) =>
      p.id === editingProduct.id ? { ...p, ...editForm } : p
    );
    setProducts(updated);
    localStorage.setItem(
      "products",
      JSON.stringify(
        updated.filter((p) => !MockProduct.some((mp) => mp.id === p.id))
      )
    );
    setEditingProduct(null);
    toast.success("Product updated successfully");
  };

  const handleResetOrders = () => {
    localStorage.removeItem("orders");
    setOrders([]);
    toast.info("All orders have been reset");
  };

  return (
    <div className="w-full min-h-screen p-8 bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h2 className="text-gray-500">Total Sales</h2>
          <p className="text-2xl font-bold text-blue-600">${totalSales}</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-2xl font-bold text-green-600">{totalOrders}</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h2 className="text-gray-500">Avg. Order Value</h2>
          <p className="text-2xl font-bold text-purple-600">${avgOrderValue}</p>
        </div>
      </div>

      <div className="mb-10 bg-white shadow-md rounded-xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
          <button
            onClick={handleResetOrders}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
          >
            Reset Orders
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4 font-medium text-gray-700">Customer</th>
                <th className="p-4 font-medium text-gray-700">Products</th>
                <th className="p-4 font-medium text-gray-700">Amount</th>
                <th className="p-4 font-medium text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No recent orders
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{o.customer}</td>
                    <td className="max-w-md p-4 truncate">{o.products}</td>
                    <td className="p-4 font-medium text-blue-600">
                      ${o.amount}
                    </td>
                    <td className="p-4 text-gray-600">{o.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">All Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4 font-medium text-gray-700">Image</th>
                <th className="p-4 font-medium text-gray-700">Name</th>
                <th className="p-4 font-medium text-gray-700">Price</th>
                <th className="p-4 font-medium text-gray-700">Stock</th>
                <th className="p-4 font-medium text-gray-700">Description</th>
                <th className="p-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="object-cover w-16 h-16 rounded"
                    />
                  </td>
                  <td className="p-4">{p.name}</td>
                  <td className="p-4 font-medium text-blue-600">${p.price}</td>
                  <td className="p-4">{p.stock}</td>
                  <td className="max-w-xs p-4 text-gray-600 truncate">
                    {p.description}
                  </td>
                  <td className="flex gap-2 p-4">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setConfirmDelete(p)}
                      className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="p-6 bg-white shadow-md rounded-xl w-96">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Edit Product
            </h2>
            <input
              type="text"
              placeholder="Name"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={editForm.price}
              onChange={(e) =>
                setEditForm({ ...editForm, price: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="number"
              placeholder="Stock"
              value={editForm.stock}
              onChange={(e) =>
                setEditForm({ ...editForm, stock: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />
            <textarea
              placeholder="Description"
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="p-6 bg-white shadow-md rounded-xl w-80">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Delete "{confirmDelete.name}"?
            </h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConfirm(confirmDelete.id)}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
