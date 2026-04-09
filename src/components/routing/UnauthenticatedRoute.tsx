import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface UnauthenticatedRouteProps {
  children: React.ReactNode;
}

const UnauthenticatedRoute = ({ children }: UnauthenticatedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default UnauthenticatedRoute;
