import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Add({ onAddProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      toast.error("Access denied. Admins only.");
      navigate("/"); // Redirect to home or login
    }
  }, [navigate]);
  const handleAddProduct = () => {
    if (!name || !price || !description || !image) {
      toast.error("please fill all fields and upload an image");
      return;
    }
    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
      description,
      image: URL.createObjectURL(image),
    };
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = [...existingProducts, newProduct];

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    onAddProduct(newProduct);
    toast.success("product added succesfully");
    setName("");
    setPrice("");
    setDescription("");
    setImage(null);
  };

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
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            + Add Product Image
          </button>
          {/* {image && <p>{image.name}</p>} */}
          {image && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="object-cover w-24 h-24 border border-gray-600 rounded-md"
              />
            </div>
          )}
        </div>

        <h2 className="mb-4 text-xl font-semibold">Product Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              placeholder="Enter product name"
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 text-white border border-gray-600 rounded-md bg-slate-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full p-2 text-white border border-gray-600 rounded-md bg-slate-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 text-white border border-gray-600 rounded-md bg-slate-700"
            ></textarea>
          </div>

          <button
            onClick={handleAddProduct}
            className="px-6 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
