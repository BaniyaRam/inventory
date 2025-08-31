import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Add from "./pages/Add";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { useState } from "react";
import { products as mockProducts } from "./data/mockproducts"; // make sure to import

export default function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products"); // ✅ key must be a string
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
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add" element={<Add onAddProduct={handleAddProduct} />} />
        <Route path="/products" element={<Products products={products} />} />
        <Route path="/home" element={<Home products={products} />} />
        <Route
          path="/products/:id"
          element={<ProductDetail products={products} />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
