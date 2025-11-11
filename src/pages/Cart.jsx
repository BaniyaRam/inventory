import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/CartContext.jsx";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { toast } from "react-toastify";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext);

  const [productToRemove, setProductToRemove] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    console.log("Current cart items:", cartItems);
  }, [cartItems]);

  const grandTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const confirmRemove = () => {
    if (productToRemove) {
      removeFromCart(productToRemove.id);
      setProductToRemove(null);
    }
  };

  const handlePay = () => {
    // Get logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser) {
      toast.error("Please login to place an order");
      return;
    }

    const order = {
      id: Date.now(),
      username: loggedInUser.username,
      role: loggedInUser.role,
      items: cartItems,
      total: grandTotal,
      date: new Date().toISOString(),
    };

    const previousOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...previousOrders, order]));

    toast.success(`Payment of $${grandTotal.toFixed(2)} successful! Thank you`);
    setShowPaymentModal(false);
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen text-white bg-slate-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
          <h2 className="mb-4 text-2xl font-semibold text-red-400">
            Your cart is empty
          </h2>
          <Link
            to="/products"
            className="px-4 py-2 mt-2 font-medium text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-slate-900">
      <Navbar />
      <div className="max-w-5xl p-6 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center">Your Cart</h1>

        <div className="flex flex-col gap-4">
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 rounded-md shadow-md bg-slate-800"
            >
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-24 h-24 rounded"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-green-400">Price: ${product.price}</p>
                <p className="text-yellow-400">
                  Total: ${product.price * product.quantity}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-blue-300">Quantity:</p>
                  <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="px-2 py-1 bg-gray-600 rounded hover:bg-gray-500"
                  >
                    -
                  </button>
                  <span className="px-1">{product.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(product.id)}
                    className="px-2 py-1 bg-gray-600 rounded hover:bg-gray-500"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setProductToRemove(product)}
                    className="px-3 py-1 ml-auto text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between p-4 mt-6 rounded-md shadow-md bg-slate-800">
          <h2 className="text-xl font-bold">
            Grand Total: ${grandTotal.toFixed(2)}
          </h2>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Proceed to Pay
          </button>
        </div>
      </div>

      {productToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 rounded shadow-lg bg-slate-800 w-80">
            <h2 className="mb-4 text-lg font-semibold text-center">
              Are you sure you want to remove <br />
              <span className="text-red-400">{productToRemove.name}</span> from
              the cart?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmRemove}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setProductToRemove(null)}
                className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 rounded shadow-lg bg-slate-800 w-96">
            <h2 className="mb-4 text-lg font-semibold text-center">
              Order Summary
            </h2>
            <div className="mb-4 space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <h3 className="mb-4 font-bold text-right">
              Total: ${grandTotal.toFixed(2)}
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handlePay}
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                Pay Now
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
