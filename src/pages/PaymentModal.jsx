import React from "react";

export default function PaymentModal({
  cartItems,
  grandTotal,
  onClose,
  onPay,
}) {
  return (
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
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <h3 className="mb-4 font-bold text-right">Total: ${grandTotal}</h3>
        <div className="flex justify-center gap-4">
          <button
            onClick={onPay}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Pay Now
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
