import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { toast } from "react-toastify";
import { products as mockProducts } from "../data/mockproducts";
import { HiShoppingCart, HiArrowLeft, HiViewGrid, HiViewList } from "react-icons/hi";

export default function Products() {
  const { addToCart, cartItems } = useContext(CartContext);
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("grid");
  const productPerPage = 9;
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} Added to Cart`);
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      setSearchParams({ search: searchInput });
    }
  };

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const processedSaved = savedProducts.map((p, i) => ({
      ...p,
      id: p.id || `saved-${i}-${Date.now()}`,
    }));
    const productMap = new Map();
    [...mockProducts, ...processedSaved].forEach((p) => productMap.set(p.id, p));
    let mergedProducts = Array.from(productMap.values());

    const searchQuery = searchParams.get("search")?.toLowerCase() || "";
    if (searchQuery) {
      mergedProducts = mergedProducts.filter((p) => p.name.toLowerCase().includes(searchQuery));
    }

    if (sortOption === "price-asc") mergedProducts.sort((a, b) => a.price - b.price);
    else if (sortOption === "price-des") mergedProducts.sort((a, b) => b.price - a.price);
    else if (sortOption === "name-asc") mergedProducts.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortOption === "name-des") mergedProducts.sort((a, b) => b.name.localeCompare(a.name));

    setAllProducts(mergedProducts);
    setCurrentPage(1);
  }, [searchParams, sortOption]);

  useEffect(() => {
    const totalPages = Math.ceil(allProducts.length / productPerPage);
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
    const start = (currentPage - 1) * productPerPage;
    const end = start + productPerPage;
    setDisplayProducts(allProducts.slice(start, end));
  }, [allProducts, currentPage]);

  const totalPages = Math.ceil(allProducts.length / productPerPage);

  return (
    <div className="min-h-screen p-6 text-white bg-slate-900">
      <div className="relative sticky top-0 z-50 flex items-center justify-between py-4 mb-4 shadow-md bg-slate-900">
        <button onClick={() => navigate("/home")} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-green-700">
          <HiArrowLeft />
        </button>
        <h1 className="flex-1 text-3xl font-bold text-center">All Products</h1>
        <button
          onClick={() => navigate("/cart")}
          className="relative flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          <HiShoppingCart className="w-5 h-5" />
          {cartItems.length > 0 && (
            <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full -top-2 -right-2">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search products..."
          className="px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Search</button>
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
        <div className="flex gap-2 ml-2">
          <button onClick={() => setView("grid")} className="p-2 text-white bg-gray-700 rounded hover:bg-gray-600">
            <HiViewGrid />
          </button>
          <button onClick={() => setView("list")} className="p-2 text-white bg-gray-700 rounded hover:bg-gray-600">
            <HiViewList />
          </button>
        </div>
      </div>

      <div className={view === "grid" ? "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"}>
        {displayProducts.length > 0 ? (
          displayProducts.map((item, index) => (
            <div
              key={item.id || index}
              className={view === "grid"
                ? "flex flex-col overflow-hidden transition-transform transform rounded-md shadow-md bg-slate-800 hover:scale-105 hover:shadow-lg"
                : "flex items-center gap-4 p-4 rounded-md shadow-md bg-slate-800"}
            >
              <Link to={`/product/${item.id || index}`} className={view === "list" ? "flex items-center gap-4 w-full" : ""}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={view === "grid" ? "object-cover w-full h-48" : "w-32 h-32 object-cover rounded"}
                />
                <div className={view === "grid" ? "p-4" : "flex-1"}>
                  <h2 className="mb-2 text-xl font-semibold">{item.name}</h2>
                  <p className="mb-1 text-gray-300">${item.price}</p>
                  <p className="mb-4 text-gray-400 line-clamp-2">{item.description}</p>
                </div>
              </Link>
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full py-2 mt-2 text-white bg-blue-600 rounded-b hover:bg-blue-700 md:mt-0"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">No products found.</p>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 bg-gray-600 rounded disabled:bg-gray-400">
          Previous
        </button>
        <span className="px-4 py-2">{currentPage} / {totalPages}</span>
        <button onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))} disabled={currentPage === totalPages || totalPages === 0} className="px-4 py-2 bg-gray-600 rounded disabled:bg-gray-400">
          Next
        </button>
      </div>
    </div>
  );
}
