import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import AddProduct from "./pages/addproduct";
import Shop from "./pages/shop";
import Cart from "./pages/cart";
import About from "./pages/about";
import Contact from "./pages/contact";
import ProtectedRoute from "./Context/protectedroute";
import AdminDashboard from "./pages/admin";

export default function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/admin/dashboard"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute requiredRole="admin">
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={500} />
    </>
  );
}
