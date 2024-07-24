import { Navigate } from "react-router-dom";

import {  ReactNode } from "react";
import { User } from "firebase/auth"; // Adjust the import based on where User is defined

interface ConditionalRouteProps {
  user: User | null; // Adjust this type based on your user authentication
  children: ReactNode; // This will cover any valid React children
}

const ConditionalRoute: React.FC<ConditionalRouteProps> = ({ user, children }) => {
  return user ? <Navigate to="/analytic" /> : <>{children}</>;
};

export default ConditionalRoute;

