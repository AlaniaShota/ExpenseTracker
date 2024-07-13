import { Navigate } from "react-router-dom";

const ConditionalRoute = ({ user, children }) => {
  return user ? <Navigate to="/analytic" /> : children;
};

export default ConditionalRoute;
