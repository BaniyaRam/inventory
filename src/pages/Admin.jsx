import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Admin({ products, setProducts }) {
  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      toast.error("Access denied. Admins only.");
      window.location.href = "/";
    }
  }, []);

  const handleDelete = (id) => {
    const filtered = products.filter((p) => p.id !== id);
    setProducts(filtered);
    localStorage.setItem("products", JSON.stringify(filtered));
    toast.success("Product deleted");
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
    const updated = products.map((product) =>
      product.id === id
        ? { ...product, ...editedProduct, price: Number(editedProduct.price) }
        : product
    );
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
    setEditProductId(null);
    toast.success("Product updated");
  };

  const handleCancelEdit = () => {
    setEditProductId(null);
    setEditedProduct({ name: "", price: "", description: "" });
  };

  return (
    <div className="max-w-6xl p-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-white">Admin Dashboard</h1>

      <table className="w-full text-left text-white border-collapse">
        <thead>
          <tr>
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Image</th>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Price</th>
            <th className="p-2 border-b">Description</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, name, price, description, image }) => (
            <tr key={id} className="border-b hover:bg-slate-800">
              <td className="p-2">{id}</td>
              <td className="p-2">
                {image && (
                  <img
                    src={image}
                    alt="product"
                    className="object-cover w-12 h-12 rounded"
                  />
                )}
              </td>
              <td className="p-2">
                {editProductId === id ? (
                  <input
                    type="text"
                    value={editedProduct.name}
                    onChange={(e) =>
                      setEditedProduct({ ...editedProduct, name: e.target.value })
                    }
                    className="px-2 py-1 text-black rounded"
                  />
                ) : (
                  name
                )}
              </td>
              <td className="p-2">
                {editProductId === id ? (
                  <input
                    type="number"
                    value={editedProduct.price}
                    onChange={(e) =>
                      setEditedProduct({ ...editedProduct, price: e.target.value })
                    }
                    className="px-2 py-1 text-black rounded"
                  />
                ) : (
                  `$${price.toFixed(2)}`
                )}
              </td>
              <td className="p-2">
                {editProductId === id ? (
                  <textarea
                    value={editedProduct.description}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-2 py-1 text-black rounded"
                  />
                ) : (
                  description
                )}
              </td>
              <td className="flex gap-2 p-2">
                {editProductId === id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(id)}
                      className="px-2 py-1 text-white bg-green-600 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-2 py-1 text-white bg-gray-600 rounded hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick({ id, name, price, description })}
                      className="px-2 py-1 text-white bg-yellow-600 rounded hover:bg-yellow-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
