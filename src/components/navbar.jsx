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
    navigate("/");
    toast.success("Logged Out");
    setShowLogoutModal(false);
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchText)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 px-6 py-2 shadow-md bg-slate-900 md:py-3">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-white">
          <Link to="/home">WEBSITE</Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-white"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        <div className="hidden md:flex md:items-center md:gap-6">
          <ul className="flex gap-6 text-sm font-medium">
            <li>
              <Link to="/home" className="text-white hover:text-blue-300">Home</Link>
            </li>
            <li>
              <Link to="/products" className="text-white hover:text-blue-300">Products</Link>
            </li>
            <li>
              <Link to="/home" className="text-white hover:text-blue-300">Services</Link>
            </li>
            <li>
              <Link to="/home" className="text-white hover:text-blue-300">Contact Us</Link>
            </li>
          </ul>

          <div className="flex items-center gap-4 ml-6">
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
              className="relative px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              <HiShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full -top-2 -right-2">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-4 mt-4 text-center md:hidden">
          <ul className="flex flex-col gap-2 font-medium text-white">
            <li onClick={() => setMenuOpen(false)}><Link to="/home">Home</Link></li>
            <li onClick={() => setMenuOpen(false)}><Link to="/products">Products</Link></li>
            <li onClick={() => setMenuOpen(false)}><Link to="/services">Services</Link></li>
            <li onClick={() => setMenuOpen(false)}><Link to="/contact">Contact Us</Link></li>
          </ul>
          <div className="flex flex-col gap-2 mt-2">
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
            <button onClick={handleCart} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
              Cart ({cartItems.length})
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 text-white rounded shadow-lg bg-slate-800 w-80">
            <h2 className="mb-4 text-lg font-semibold text-center">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Yes, Log Out
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-500"
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
