import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetails";
import TransactionHistory from "./pages/TransactionHistory";
import ProtectedRoute from "./components/ProtectedRoute";
import { products as mockProducts } from "./data/mockproducts";
import { AuthProvider } from "./Context/AuthContext";

export default function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : mockProducts;
  });

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => {
      const updated = [...prev, { ...newProduct, id: prev.length + 1 }];
      localStorage.setItem("products", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={800} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/add"
          element={
            <ProtectedRoute requiredRole="admin">
              <Add onAddProduct={handleAddProduct} />
            </ProtectedRoute>
          }
        />
        <Route path="/products" element={<Products products={products} />} />
        <Route path="/home" element={<Home products={products} />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/product/:id"
          element={<ProductDetail products={products} />}
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <Admin products={products} setProducts={setProducts} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactionHistory"
          element={
            <ProtectedRoute requiredRole="admin">
              <TransactionHistory showAll={true} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
