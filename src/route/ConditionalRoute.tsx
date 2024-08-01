
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface ConditionalRouteProps {
  children: ReactNode;
}

const ConditionalRoute: React.FC<ConditionalRouteProps> = ({ children }) => {
  const { user } = useAuth();

  return user ? <Navigate to="/analytic" /> : <>{children}</>;
};

export default ConditionalRoute;
