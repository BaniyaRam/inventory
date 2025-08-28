import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import { products } from "../data/mockproducts";
import { Link } from "react-router-dom";

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="flex flex-col min-h-screen text-white bg-slate-900">
      <Navbar />

      <div className="w-full overflow-hidden border-b border-gray-700 shadow-lg">
        <img
          src="/images/shooping.jpg"
          alt="shopping"
          className="w-full h-[500px] md:h-[500px] lg:h-[600px] object-cover"
        />
      </div>

      <section className="p-8">
        <h3 className="mb-6 text-3xl font-bold text-center">Featured Products</h3>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 transition shadow-md bg-slate-800 rounded-2xl hover:shadow-xl"
            >
              <Link to={`/product/${product.id}`} className="block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-56 mb-4 rounded-xl"
                />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="mt-2 text-sm text-gray-400">{product.description}</p>
                <p className="mt-3 font-bold text-blue-400">Price:${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
