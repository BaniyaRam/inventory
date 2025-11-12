import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../Context/CartContext";
import { MockProduct } from "../Data/mockproduct";
import { useSearchParams } from "react-router-dom";

export default function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [displayProduct, setDisplayProduct] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );
  const productPerPage = 6;
  const { cartItems, addToCart, clearCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Added to the Cart");
  };

  const handlePaymentSuccess = () => {
    if (cartItems.length === 0) return toast.error("Cart is empty!");
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const newTransaction = {
      id: Date.now(),
      customer: "Guest",
      amount: totalAmount,
      date: new Date().toISOString().split("T")[0],
      items: cartItems,
    };
    localStorage.setItem(
      "transactions",
      JSON.stringify([...transactions, newTransaction])
    );
    toast.success("Payment Successful!");
    clearCart();
  };

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const deletedIds =
      JSON.parse(localStorage.getItem("deletedProducts")) || [];
    const productsWithId = storedProducts.map((p, i) => ({
      ...p,
      id: p.id || `saved-${i}-${Date.now()}`,
    }));
    const combined = [...MockProduct, ...productsWithId].filter(
      (p) => !deletedIds.includes(p.id)
    );
    setAllProducts(combined);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput) setSearchParams({ search: searchInput });
      else setSearchParams({});
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, setSearchParams]);

  const totalPages = Math.ceil(allProducts.length / productPerPage);

  useEffect(() => {
    let filteredProducts = allProducts;
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";
    if (searchQuery)
      filteredProducts = filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery)
      );
    if (
      currentPage > Math.ceil(filteredProducts.length / productPerPage) &&
      filteredProducts.length > 0
    ) {
      setCurrentPage(Math.ceil(filteredProducts.length / productPerPage));
      return;
    }
    const start = (currentPage - 1) * productPerPage;
    const end = start + productPerPage;
    setDisplayProduct(filteredProducts.slice(start, end));
  }, [allProducts, currentPage, searchParams]);

  return (
    <div className="w-full px-6 py-12 bg-white border-b border-gray-700 shadow-lg">
      <h1 className="mb-10 text-3xl font-extrabold text-center text-gray-800">
        All Products
      </h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search Products..."
          className="flex-1 px-4 py-2 border rounded"
        />
      </div>
      {displayProduct.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayProduct.map((item) => (
            <div
              key={item.id || item.name}
              className="p-6 transition duration-300 bg-white border shadow-md rounded-xl hover:shadow-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-56 mb-4 bg-gray-100 rounded-lg"
              />
              <h2 className="mb-2 text-xl font-semibold text-gray-700">
                {item.name}
              </h2>
              <p className="mb-1 text-lg font-bold text-blue-600">
                {item.currency === "usd"
                  ? `$${item.price}`
                  : item.currency === "npr"
                  ? `Rs ${item.price}`
                  : `€${item.price}`}
              </p>
              <p className="mb-1 text-sm text-gray-600">{item.description}</p>
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full px-4 py-2 font-medium text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
      {/* <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={handlePaymentSuccess}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Pay Now
        </button>
      </div> */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-gray-600 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-medium">
          {currentPage} / {totalPages || 1}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 text-white bg-gray-600 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
