import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../Context/CartContext.jsx";
import { useContext, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCart = () => navigate("/cart");
  const handleLogout = () => {
    navigate("/");
    toast.success("Logged Out");
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
              <Link to="/home" className="text-white hover:text-blue-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-white hover:text-blue-300">
                Products
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-white hover:text-blue-300">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-blue-300">
                Contact Us
              </Link>
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
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Cart ({cartItems.length})
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
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
              <Link to="/contact">Contact Us</Link>
            </li>
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
            <button
              onClick={handleCart}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Cart ({cartItems.length})
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
