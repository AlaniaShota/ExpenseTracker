import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import "../style/index.css";

const Layout = () => {
  return (
    <div className="wallet">
      <div className="navigation-section">
        <Navigation />
      </div>
      <div className="wallet-section">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
