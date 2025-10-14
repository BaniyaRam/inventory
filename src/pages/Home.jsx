import { toast } from "react-toastify";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import { products } from "../data/mockproducts";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/CartContext";

export default function Home() {
  const [user, setUser] = useState(null);
  const featuredProducts = products.filter((p) => p.featured);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to Cart`);
  };

  return (
    <div className="flex flex-col min-h-screen text-white bg-slate-900">
      <Navbar />
      <div className="flex items-center justify-center my-6">
        <div className="px-6 py-3 transition-all transform rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105">
          <h2 className="text-2xl font-bold text-white animate-pulse">
            {user ? `Hi, ${user.username}! 👋` : "Welcome!"}
          </h2>
        </div>
      </div>
      <div className="w-full overflow-hidden border-b border-gray-700 shadow-lg">
        <img
          src="/images/shooping.jpg"
          alt="shopping"
          className="w-full h-[500px] md:h-[500px] lg:h-[600px] object-cover"
        />
      </div>
      <section className="p-8">
        <h3 className="mb-6 text-3xl font-bold text-center">
          Featured Products
        </h3>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id || index}
              className="flex flex-col overflow-hidden transition-transform transform rounded-md shadow-md bg-slate-800 hover:scale-105 hover:shadow-lg"
            >
              <Link to={`/product/${product.id}`} className="block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-56 mb-4 rounded-xl"
                />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="mt-2 text-sm text-gray-400">
                  {product.description.length > 100
                    ? product.description.slice(0, 100) + "..."
                    : product.description}
                </p>
                <p className="mt-3 font-bold text-blue-400">
                  Price: ${product.price}
                </p>
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full py-2 mt-2 text-white bg-blue-600 rounded-b hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
