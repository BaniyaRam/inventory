import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // not logged in
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // logged in but wrong role
    return <Navigate to="/home" replace />;
  }

  // user authenticated and authorized
  return children;
}
