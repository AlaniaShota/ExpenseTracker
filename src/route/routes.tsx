import { Navigate } from "react-router-dom";

import { ReactNode } from "react";
import { User } from "firebase/auth";

interface ConditionalRouteProps {
  user: User | null;
  children: ReactNode;
}

const ConditionalRoute: React.FC<ConditionalRouteProps> = ({
  user,
  children,
}) => {
  return user ? <Navigate to="/analytic" /> : <>{children}</>;
};

export default ConditionalRoute;
