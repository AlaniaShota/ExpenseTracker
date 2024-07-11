import { Navigate } from "react-router-dom";

const ConditionalRoute = ({ user, children }) => {
  return user ? <Navigate to="/profile" /> : children;
};

export default ConditionalRoute;
