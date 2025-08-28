import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { toast } from "react-toastify";
import { products as mockProducts } from "../data/mockproducts";

export default function Products() {
  const { addToCart, cartItems } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 9;
  const navigate = useNavigate();
  const [totalProducts, setTotalProducts] = useState(0);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Added to Cart");
  };

  const handleSearch = () => {
    setSearchParams({ search: searchInput });
    setCurrentPage(1);
  };

  useEffect(() => {
    let filteredProducts = [...mockProducts];
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    if (sortOption === "price-asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-des") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-asc") {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-des") {
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    setTotalProducts(filteredProducts.length);
    const paginatedProducts = filteredProducts.slice(
      (currentPage - 1) * productPerPage,
      currentPage * productPerPage
    );
    setProducts(paginatedProducts);
  }, [sortOption, searchParams, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  return (
    <div className="min-h-screen p-6 text-white bg-slate-900">
      <div className="relative sticky top-0 z-50 flex items-center justify-between py-4 mb-4 shadow-md bg-slate-900">
        <button
          onClick={() => navigate("/home")}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Back to Home
        </button>
        <h1 className="flex-1 text-3xl font-bold text-center">All Products</h1>
        <Link
          to="/cart"
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Your Cart ({cartItems.length})
        </Link>
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search products..."
          className="px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Search
        </button>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 text-gray-900 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-des">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-des">Name: Z to A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 ? (
          products.map((item) => (
            <div
              key={item.id}
              className="flex flex-col overflow-hidden transition-transform transform rounded-md shadow-md bg-slate-800 hover:scale-105 hover:shadow-lg"
            >
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h2 className="mb-2 text-xl font-semibold">{item.name}</h2>
                  <p className="mb-1 text-gray-300">${item.price}</p>
                  <p className="mb-4 text-gray-400 line-clamp-1">
                    {item.description}
                  </p>
                </div>
              </Link>
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full py-2 text-white bg-blue-600 rounded-b hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No products found.
          </p>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-600 rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          {currentPage} / {Math.ceil(totalProducts / productPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev * productPerPage < totalProducts ? prev + 1 : prev
            )
          }
          disabled={currentPage * productPerPage >= totalProducts}
          className="px-4 py-2 bg-gray-600 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
