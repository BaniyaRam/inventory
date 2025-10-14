import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Add({ onAddProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || storedUser.role !== "admin") {
        toast.error("Access denied. Admins only.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleAddProduct = useCallback(() => {
    if (!name.trim() || !price || !description.trim() || !image) {
      toast.error("Please fill all fields and upload an image");
      return;
    }

    if (isNaN(Number(price)) || Number(price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    try {
      const newProduct = {
        id: Date.now(),
        name: name.trim(),
        price: Number(price),
        description: description.trim(),
        image: URL.createObjectURL(image),
      };

      const existingProducts =
        JSON.parse(localStorage.getItem("products")) || [];
      const updatedProducts = [...existingProducts, newProduct];

      localStorage.setItem("products", JSON.stringify(updatedProducts));
      onAddProduct(newProduct);
      toast.success("Product added successfully");

      setTimeout(() => {
        navigate("/admin");
      }, 500);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    }
  }, [name, price, description, image, onAddProduct, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-slate-900">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-slate-900">
      <div className="w-full max-w-lg p-8 text-white rounded-md shadow-md bg-slate-800">
        <h1 className="mb-6 text-3xl font-bold text-center">Add Product</h1>

        <input
          type="file"
          id="product-image"
          accept="image/*"
          className="hidden"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="mb-6">
          <button
            type="button"
            onClick={() => document.getElementById("product-image").click()}
            className="px-4 py-2 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
            aria-label="Add product image"
          >
            + Add Product Image
          </button>
          {image && (
            <div className="mt-4">
              <p className="mb-2 text-sm text-gray-300">Image preview:</p>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="object-cover w-32 h-32 border border-gray-600 rounded-md shadow-md"
              />
            </div>
          )}
        </div>

        <h2 className="mb-4 text-xl font-semibold">Product Details</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="product-name"
              className="block mb-2 text-sm font-medium"
            >
              Product Name
            </label>
            <input
              id="product-name"
              type="text"
              value={name}
              placeholder="Enter product name"
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 text-white border border-gray-600 rounded-md bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="product-price"
              className="block mb-2 text-sm font-medium"
            >
              Price
            </label>
            <input
              id="product-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              step="0.01"
              min="0"
              className="w-full p-2 text-white border border-gray-600 rounded-md bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="product-description"
              className="block mb-2 text-sm font-medium"
            >
              Description
            </label>
            <textarea
              id="product-description"
              rows="4"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 text-white border border-gray-600 rounded-md bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddProduct}
              className="flex-1 px-6 py-2 font-medium text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
              aria-label="Add product to inventory"
            >
              Add Product
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="flex-1 px-6 py-2 font-medium text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
              aria-label="Go back to admin dashboard"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
