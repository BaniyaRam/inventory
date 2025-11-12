import { useState } from "react";
import { toast } from "react-toastify";

export default function AddProduct({ onAddProduct }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [image, setImage] = useState(null);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!name || !price || !description || !image) {
      toast.error("please fill all the field and upload an image");
      return;
    }

    const newproduct = {
      name,
      price: Number(price),
      currency,
      description,
      image: URL.createObjectURL(image),
    };

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = [...existingProducts, newproduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    if (onAddProduct) onAddProduct(newproduct);

    toast.success("product added sucessfully");

    setName("");
    setPrice("");
    setDescription("");
    setCurrency("usd");
    setImage(null);
  };

  return (
    <div className="max-w-3xl p-8 mx-auto mt-10 bg-white shadow-lg rounded-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Add New Product
        </h1>
      </div>

      <form className="space-y-6" onSubmit={handleAddProduct}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            📝 Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your product"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Product Images
          </label>
          <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-400">
            <div className="text-center">
              <h1 className="text-3xl">📤</h1>
              <p className="mt-2 text-gray-500">
                Click to upload product images
              </p>
              <button
                type="button"
                onClick={() => document.getElementById("product-image").click()}
                className="px-4 py-2 mt-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                📂 Choose Files
              </button>
              <input
                id="product-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {image && (
                <div className="mt-3">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="object-cover w-32 h-32 rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Pricing
          </label>
          <div className="grid grid-cols-2 gap-4">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="usd">USD ($)</option>
              <option value="npr">NPR (Rs)</option>
              <option value="eur">EUR (€)</option>
            </select>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Enter product price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
