import { useState, useMemo } from "react";
import { useCart } from "../Context/cartcontext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/authcontext";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increasedQuantity,
    decreasedQuantity,
  } = useCart();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const grandTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const confirmRemove = () => {
    if (productToRemove) {
      removeFromCart(productToRemove.id);
      toast.success(`${productToRemove.name} Successfully Removed`);
      setProductToRemove(null);
    }
  };

  const handlePayment = () => {
    const order = {
      id: Date.now(),
      customer: user?.email || "Guest",
      products: cartItems
        .map((item) => `${item.name} (x${item.quantity})`)
        .join(", "),
      items: cartItems,
      amount: grandTotal,
      date: new Date().toLocaleDateString(),
      timestamp: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));

    toast.success("Payment Successful!");
    clearCart();
    setShowPaymentModal(false);
  };

  return (
    <>
      <div className="min-h-screen px-4 py-10 bg-slate-400 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="max-w-5xl p-6 mx-auto bg-white shadow-xl rounded-xl">
          <h1 className="mb-8 text-4xl font-extrabold text-center text-indigo-700">
            Your Cart 🛒
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className="mb-4 text-lg text-gray-500">Your cart is empty.</p>
              <button
                onClick={() => navigate("/shop")}
                className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
              >
                Go to Shop
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center gap-4 p-5 transition bg-white border border-gray-200 shadow sm:flex-row rounded-xl hover:shadow-md"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-24 border border-gray-200 rounded-lg sm:w-24"
                    />
                    <div className="flex-1 space-y-1 text-center sm:text-left">
                      <p className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </p>
                      <p className="font-medium text-blue-600">
                        Price: ${item.price}
                      </p>
                      <p>Total: ${item.price * item.quantity}</p>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <button
                          onClick={() => decreasedQuantity(item.id)}
                          disabled={item.quantity === 1}
                          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => increasedQuantity(item.id)}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => setProductToRemove(item)}
                      className="px-4 py-2 mt-2 text-sm font-semibold text-white transition bg-red-600 rounded-lg shadow sm:mt-0 hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-right">
                <h2 className="text-xl font-bold">
                  Grand Total: ${grandTotal}
                </h2>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="px-6 py-3 text-lg font-semibold text-white transition bg-green-600 rounded-lg shadow hover:bg-green-700"
                >
                  Proceed To Pay
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showPaymentModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50"
          onClick={() => setShowPaymentModal(false)}
        >
          <div
            className="p-6 bg-white rounded-lg shadow-xl w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="mb-4 text-xl font-bold">Order Description</h1>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t">
                <h2 className="text-lg font-semibold">Total: ${grandTotal}</h2>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Close
              </button>
              <button
                onClick={handlePayment}
                className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {productToRemove && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="p-6 text-center bg-white rounded-lg shadow-xl w-96">
            <h1 className="mb-4 text-lg font-bold">
              Are you sure you want to remove <br />
              <span className="font-semibold">{productToRemove.name}</span> from
              the cart?
            </h1>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmRemove}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setProductToRemove(null)}
                className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
