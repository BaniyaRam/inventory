import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const EmptyState = ({ message }) => (
  <div className="min-h-screen px-4 py-8 sm:px-6 sm:py-10 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="max-w-6xl mx-auto">
      <p className="p-6 text-center text-gray-400">{message}</p>
    </div>
  </div>
);

export default function TransactionHistory({ showAll = true }) {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadTransactions = useCallback(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);

      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

      const ordersWithUser = storedOrders.map((order) => ({
        ...order,
        username: order.username || "Unknown",
      }));

      if (showAll) {
        setTransactions(ordersWithUser);
      } else if (storedUser) {
        const userOrders = ordersWithUser.filter(
          (order) => order.username === storedUser.username
        );
        setTransactions(userOrders);
      }
    } catch (error) {
      console.error("Error loading transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [showAll]);

  useEffect(() => {
    loadTransactions();
    window.addEventListener("storage", loadTransactions);
    return () => window.removeEventListener("storage", loadTransactions);
  }, [loadTransactions]);

  if (loading) {
    return <EmptyState message="Loading transactions..." />;
  }

  if (!user) {
    return <EmptyState message="Please login to see transactions." />;
  }

  if (transactions.length === 0) {
    return <EmptyState message="No transactions found." />;
  }

  const title = showAll
    ? "All Users Transaction History"
    : `${user.username}'s Transaction History`;

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 sm:py-10 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 mb-4 text-sm font-semibold text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
        >
          ← Back to Admin Panel
        </button>

        <h2 className="mb-6 text-2xl font-extrabold text-center text-white sm:text-3xl">
          {title}
        </h2>

        <div className="hidden md:block overflow-x-auto bg-gray-900 rounded-lg shadow-lg max-h-[70vh] overflow-y-auto">
          <table className="w-full text-left text-gray-200 border-collapse">
            <thead className="sticky top-0 text-sm text-gray-400 uppercase bg-gray-800">
              <tr>
                <th className="p-4 border-b border-gray-700">ID</th>
                <th className="p-4 border-b border-gray-700">Products</th>
                <th className="p-4 border-b border-gray-700">Quantities</th>
                <th className="p-4 border-b border-gray-700">Date</th>
                <th className="p-4 border-b border-gray-700">Amount</th>
                {showAll && (
                  <th className="p-4 border-b border-gray-700">User</th>
                )}
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr
                  key={txn.id}
                  className={`transition-colors ${
                    index % 2 === 0 ? "bg-gray-800/60" : "bg-gray-800/30"
                  } hover:bg-gray-700/40`}
                >
                  <td className="p-4 text-sm">{txn.id}</td>
                  <td className="p-4 text-sm">
                    {txn.items?.length > 0
                      ? txn.items.map((item) => item.name).join(", ")
                      : "N/A"}
                  </td>
                  <td className="p-4 text-sm">
                    {txn.items?.length > 0
                      ? txn.items.map((item) => item.quantity || 1).join(", ")
                      : "N/A"}
                  </td>
                  <td className="p-4 text-sm">
                    {txn.date ? new Date(txn.date).toLocaleString() : "N/A"}
                  </td>
                  <td className="p-4 text-sm font-semibold text-green-400">
                    ${Number(txn.total || 0).toFixed(2)}
                  </td>
                  {showAll && (
                    <td className="p-4 text-sm font-medium text-blue-300">
                      {txn.username || "N/A"}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4 max-h-[70vh] overflow-y-auto">
          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="p-4 space-y-3 transition-colors rounded-lg shadow-md bg-gray-800/60 hover:bg-gray-700/40"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  ID
                </span>
                <span className="font-mono text-sm">{txn.id}</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Products
                </span>
                <span className="text-sm text-right">
                  {txn.items?.length > 0
                    ? txn.items.map((item) => item.name).join(", ")
                    : "N/A"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Quantity
                </span>
                <span className="text-sm text-right">
                  {txn.items?.length > 0
                    ? txn.items.map((item) => item.quantity || 1).join(", ")
                    : "N/A"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Date
                </span>
                <span className="text-sm text-right">
                  {txn.date ? new Date(txn.date).toLocaleDateString() : "N/A"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Amount
                </span>
                <span className="text-sm font-semibold text-green-400">
                  ${Number(txn.total || 0).toFixed(2)}
                </span>
              </div>

              {showAll && (
                <div className="flex items-start justify-between gap-2 pt-2 border-t border-gray-700">
                  <span className="text-xs font-semibold text-gray-400 uppercase">
                    User
                  </span>
                  <span className="text-sm font-medium text-blue-300">
                    {txn.username || "N/A"}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 text-right text-gray-400">
          <p className="text-sm">Total Transactions: {transactions.length}</p>
        </div>
      </div>
    </div>
  );
}
