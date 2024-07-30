import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import "../style/index.css";
import { useMobile } from "../context/Mobile";
import MobileNavigation from "./MobileNavigation";

const Layout: React.FC = () => {
  const isMobile = useMobile();

  return (
    <div className="wallet">
      {!isMobile && (
        <div className="navigation-section">
          <Navigation />
        </div>
      )}
      <div className="wallet-section">
        <Outlet />
      </div>
      {isMobile && (
        <div className="mobile-navigation">
          <MobileNavigation />
        </div>
      )}
    </div>
  );
};

export default Layout;
