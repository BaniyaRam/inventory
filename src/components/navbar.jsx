import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../Context/CartContext.jsx";
import { useContext, useState } from "react";
import { HiMenu, HiShoppingCart, HiX } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleCart = () => navigate("/cart");

  const handleLogoutConfirm = () => {
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/", { replace: true });
    setShowLogoutModal(false);
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchText)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 px-4 py-3 shadow-md bg-slate-900 md:px-8">
      <div className="flex items-center justify-between w-full">
        <Link to="/home" className="self-center text-2xl font-bold text-white">
          WEBSITE
        </Link>

        <div className="items-center hidden gap-6 md:flex">
          <ul className="flex gap-6 font-medium text-white">
            <li>
              <Link to="/home" className="hover:text-blue-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-300">
                Products
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-blue-300">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-300">
                Contact
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
            >
              Search
            </button>
            <button
              onClick={handleCart}
              className="relative px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              <HiShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 px-2 py-1 -mt-1 -mr-1 text-xs font-bold text-white bg-red-600 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            >
              Log Out
            </button>
          </div>
        </div>

        <button
          className="self-center text-2xl text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-4 mt-4 text-center md:hidden">
          <ul className="flex flex-col gap-2 font-medium text-white">
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/home">Home</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/products">Products</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/services">Services</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Search
          </button>
          <button
            onClick={handleCart}
            className="relative px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            <HiShoppingCart className="inline-block w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 px-2 py-1 -mt-1 -mr-1 text-xs font-bold text-white bg-red-600 rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Log Out
          </button>
        </div>
      )}

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-11/12 max-w-sm p-6 text-white rounded shadow-lg bg-slate-800">
            <h2 className="mb-4 text-lg font-semibold text-center">
              Are you sure you want to log out?
            </h2>
            <div className="flex flex-col justify-center gap-3 md:flex-row">
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                Yes, Log Out
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
