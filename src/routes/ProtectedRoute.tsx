import { ReactNode, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "superuser" | "admin" | "user";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState<string>("SUPER_USER");
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user == "SUPER_USER") {
    return <Navigate to="/pages" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
