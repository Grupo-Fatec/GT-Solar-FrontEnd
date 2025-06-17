import { ReactNode, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "superuser" | "admin" | "user";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("user"));
  const [user, setUser] = useState<string>(localStorage.getItem("user.userRole"));
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user) {
    return <Navigate to="/pages" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
