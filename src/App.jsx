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

export default function App() {
  return (
    <>
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add" element={<Add />} />
        <Route path="/products" element={<Products />} />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductDetail />}></Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
