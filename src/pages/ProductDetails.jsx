import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { products as mockProducts } from "../data/mockproducts";
import { toast } from "react-toastify";
import Navbar from "../components/navbar";

export default function ProductDetail({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    const all = [...mockProducts, ...saved];
    const found = all.find((p) => String(p.id) === String(id));
    setProduct(found);
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen text-white bg-slate-900">
          <p className="text-lg">Product not found.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen p-6 bg-slate-900 text-slate-100">
        <div className="w-full max-w-3xl p-6 rounded-lg shadow-lg bg-slate-800">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-64 rounded-md"
          />
          <h1 className="mt-4 text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-xl text-gray-300">${product.price}</p>
          <p className="mt-3 text-gray-400">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="w-full py-3 mt-5 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
