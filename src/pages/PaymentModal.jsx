import React from "react";
import { toast } from "react-toastify";

export default function PaymentModal({ cartItems, grandTotal, onClose, user }) {
  const handlePayNow = () => {
    if (!user) {
      toast.error("Please login to pay");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

      const newOrder = {
        id: Date.now(),
        username: user.username,
        role: user.role,
        date: new Date().toISOString(),
        total: grandTotal,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const updatedOrders = [...storedOrders, newOrder];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      toast.success("Payment successful!");
      onClose();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="p-6 rounded shadow-lg bg-slate-800 w-96 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-semibold text-center text-white">
          Order Summary
        </h2>

        <div className="mb-4 space-y-2 overflow-y-auto max-h-64">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-400">No items in cart</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-2 text-gray-200"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded"
                  />
                )}
                <span className="flex-1">
                  {item.name} x {item.quantity}
                </span>
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="pt-4 mb-6 border-t border-gray-600">
          <h3 className="text-lg font-bold text-right text-white">
            Total: ${grandTotal.toFixed(2)}
          </h3>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handlePayNow}
            disabled={cartItems.length === 0}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Pay Now
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
