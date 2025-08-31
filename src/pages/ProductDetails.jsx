import { useParams } from "react-router-dom";
import { products } from "../data/mockproducts";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QRCode from "react-qr-code";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const product = products.find((item) => item.id.toString() === id);

  if (!product) {
    return (
      <>
        <Navbar />
        <p className="mt-10 text-center text-white">Product not found.</p>
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
      <div className="flex items-center justify-center min-h-screen p-6 bg-slate-900">
        <div className="w-full max-w-xl p-6 rounded-lg shadow-lg bg-slate-800 text-slate-200">
          <img
            className="object-cover w-full rounded-md h-60"
            src={product.image}
            alt={product.name}
          />
          <h1 className="mt-4 text-2xl font-bold">{product.name}</h1>
          <p className="mt-2 text-lg text-slate-300">${product.price}</p>
          <p className="mt-3 text-base text-slate-400">{product.description}</p>
          {/* <div className="flex flex-col items-center justify-center mt-6">
            <p className="mb-2 text-center text-slate-300">
              Scan QR code to view this product:
            </p>
            <div className="p-2 rounded bg-slate-700">
              <QRCode
                value={`${window.location.origin}/products/${product.id}`}
                size={128}
                bgColor="#1e293b"
                fgColor="#ffffff"
              />
            </div>
          </div> */}
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
