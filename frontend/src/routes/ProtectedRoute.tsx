import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/hooks";
import type { JSX } from "react/jsx-runtime";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, authLoading } = useAppSelector(
    (state) => state.auth
  );

  // Wait for auth check 
  if (authLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
