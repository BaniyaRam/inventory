import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Admin({ products, setProducts }) {
  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [user, setUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "admin") {
      toast.error("Access denied. Admins only.");
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleDeleteClick = (id) => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteProductId !== null) {
      const filtered = products.filter((p) => p.id !== deleteProductId);
      setProducts(filtered);
      localStorage.setItem("products", JSON.stringify(filtered));
      toast.success("Product deleted successfully");
    }
    setShowDeleteModal(false);
    setDeleteProductId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteProductId(null);
  };

  const handleEditClick = (product) => {
    setEditProductId(product.id);
    setEditedProduct({
      name: product.name,
      price: product.price,
      description: product.description,
    });
  };

  const handleSaveEdit = (id) => {
    if (!editedProduct.name || !editedProduct.price) {
      toast.error("Name and price are required");
      return;
    }

    const updated = products.map((product) =>
      product.id === id
        ? {
            ...product,
            name: editedProduct.name.trim(),
            description: editedProduct.description.trim(),
            price: Number(editedProduct.price),
          }
        : product
    );
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
    setEditProductId(null);
    toast.success("Product updated successfully");
  };

  const handleCancelEdit = () => {
    setEditProductId(null);
    setEditedProduct({ name: "", price: "", description: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen px-4 py-6 md:px-6 md:py-10 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
          <div className="w-full md:w-auto">
            <h1 className="text-2xl font-extrabold text-white md:text-4xl">
              Admin Dashboard
            </h1>
            {user && (
              <div className="inline-block px-3 py-2 mt-2 text-sm font-semibold text-white rounded-full shadow-lg md:px-4 md:py-2 md:text-base bg-gradient-to-r from-green-400 to-blue-500">
                Hi, {user.username}! 👋
              </div>
            )}
          </div>
          <div className="flex flex-col w-full gap-2 sm:flex-row md:gap-4 md:w-auto">
            <button
              onClick={() => navigate("/add")}
              className="flex-1 px-3 py-2 text-sm text-white transition-colors bg-blue-600 rounded sm:flex-none md:px-4 md:text-base hover:bg-blue-700"
            >
              + Add Product
            </button>
            <button
              onClick={() => navigate("/transactionHistory")}
              className="flex-1 px-3 py-2 text-sm text-white transition-colors bg-purple-600 rounded sm:flex-none md:px-4 md:text-base hover:bg-purple-700"
            >
              History
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 px-3 py-2 text-sm text-white transition-colors bg-red-600 rounded sm:flex-none md:px-4 md:text-base hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-lg">
          <table className="w-full text-xs text-left text-gray-200 border-collapse md:text-sm">
            <thead className="text-xs text-gray-400 uppercase bg-gray-800 md:text-sm">
              <tr>
                <th className="p-2 border-b border-gray-700 md:p-4">ID</th>
                <th className="p-2 border-b border-gray-700 md:p-4">Image</th>
                <th className="p-2 border-b border-gray-700 md:p-4">Name</th>
                <th className="p-2 border-b border-gray-700 md:p-4">Price</th>
                <th className="hidden p-2 border-b border-gray-700 lg:table-cell md:p-4">
                  Description
                </th>
                <th className="p-2 text-center border-b border-gray-700 md:p-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-8 text-sm text-center text-gray-400 md:text-base"
                  >
                    No products available
                  </td>
                </tr>
              ) : (
                products.map(({ id, name, price, description, image }) => (
                  <tr
                    key={id}
                    className="transition-colors border-b border-gray-800 hover:bg-gray-800/50"
                  >
                    <td className="p-2 text-xs md:p-4 md:text-sm">{id}</td>
                    <td className="p-2 md:p-4">
                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          className="object-cover w-10 h-10 rounded-md shadow-sm md:w-14 md:h-14"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-10 h-10 text-xs font-medium text-gray-500 bg-gray-800 rounded-md md:text-sm md:w-14 md:h-14">
                          —
                        </div>
                      )}
                    </td>
                    <td className="p-2 md:p-4">
                      {editProductId === id ? (
                        <input
                          type="text"
                          value={editedProduct.name}
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-2 py-2 text-xs text-gray-900 bg-white rounded-md md:px-3 md:text-sm"
                        />
                      ) : (
                        <div className="text-xs truncate md:text-sm">
                          {name}
                        </div>
                      )}
                    </td>
                    <td className="p-2 md:p-4">
                      {editProductId === id ? (
                        <input
                          type="number"
                          value={editedProduct.price}
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              price: e.target.value,
                            })
                          }
                          className="w-20 px-2 py-2 text-xs text-gray-900 bg-white rounded-md md:px-3 md:text-sm md:w-28"
                        />
                      ) : (
                        <div className="text-xs md:text-sm">
                          ${Number(price).toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="hidden p-2 lg:table-cell md:p-4">
                      {editProductId === id ? (
                        <textarea
                          value={editedProduct.description}
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              description: e.target.value,
                            })
                          }
                          className="w-full px-2 py-2 text-xs text-gray-900 bg-white rounded-md md:px-3 md:text-sm"
                          rows={2}
                        />
                      ) : (
                        <div className="text-xs md:text-sm line-clamp-2">
                          {description}
                        </div>
                      )}
                    </td>
                    <td className="p-2 md:p-4">
                      {editProductId === id ? (
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <button
                            onClick={() => handleSaveEdit(id)}
                            className="px-2 py-2 text-xs font-medium text-white transition-colors bg-green-600 rounded-md md:px-3 md:text-sm hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-2 py-2 text-xs font-medium text-white transition-colors bg-gray-600 rounded-md md:px-3 md:text-sm hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <button
                            onClick={() =>
                              handleEditClick({ id, name, price, description })
                            }
                            className="px-2 py-2 text-xs font-medium text-white transition-colors bg-yellow-600 rounded-md md:px-3 md:text-sm hover:bg-yellow-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(id)}
                            className="px-2 py-2 text-xs font-medium text-white transition-colors bg-red-600 rounded-md md:px-3 md:text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl md:p-8">
            <h2 className="mb-4 text-xl font-bold text-white md:text-2xl">
              Delete Product?
            </h2>
            <p className="mb-8 text-sm text-gray-300 md:text-base">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-3 text-sm font-semibold text-white transition-colors bg-red-600 rounded-md md:text-base hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-3 text-sm font-semibold text-white transition-colors bg-gray-600 rounded-md md:text-base hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
