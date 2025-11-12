import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/cartcontext";
import { useAuth } from "../Context/authcontext";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const cartCount = (cartItems || []).reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModel, setShowLogoutModel] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logout success");
  };

  const navLinks = ["home", "shop", "about", "contact"];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-3 mx-auto max-w-7xl">
        <h1 className="text-2xl font-extrabold text-gray-700">
          Online Store <span className="text-slate-500">🛍️</span>
        </h1>
        <nav className="items-center hidden gap-8 md:flex">
          {navLinks.map((path) => (
            <Link
              key={path}
              to={`/${path}`}
              className="text-lg font-medium text-gray-700 transition hover:text-slate-500"
            >
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </Link>
          ))}
        </nav>
        <div className="items-center hidden gap-4 md:flex">
          {user && (
            <>
              <button
                className="font-semibold text-gray-700 transition hover:text-red-500"
                onClick={() => setShowLogoutModel(true)}
              >
                Logout
              </button>
              <Link
                to="/cart"
                className="relative inline-flex items-center font-medium text-gray-700 hover:text-indigo-500"
              >
                Cart
                {cartCount > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-1 ml-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? (
              <span className="text-2xl">&#10005;</span>
            ) : (
              <span className="text-2xl">&#9776;</span>
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="px-4 pt-2 pb-4 space-y-2 bg-gray-100 md:hidden">
          {navLinks.map((path) => (
            <Link
              key={path}
              to={`/${path}`}
              className="block px-3 py-2 font-medium text-gray-700 rounded hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </Link>
          ))}
          {user && (
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-gray-700">{`Hello, ${user.email}`}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="font-semibold text-left text-gray-700 hover:text-red-500"
              >
                Logout
              </button>
              <Link
                to="/cart"
                className="relative inline-flex items-center text-gray-700 hover:text-indigo-500"
                onClick={() => setIsOpen(false)}
              >
                Cart
                {cartCount > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-1 ml-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          )}
        </div>
      )}
      {showLogoutModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="p-6 bg-white rounded-md shadow-md">
            <h1 className="mb-4 text-lg font-bold">
              Are you sure you want to logout?
            </h1>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 text-white bg-red-500 rounded-md"
                onClick={() => {
                  handleLogout();
                  setShowLogoutModel(false);
                }}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setShowLogoutModel(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
