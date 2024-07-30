import {
  IoIosList,
  IoIosWallet,
  IoMdAnalytics,
  IoIosSettings,
} from "react-icons/io";
import { Link } from "react-router-dom";
import PDF from "./PDF";
import "./style/MobileNavigation.scss";

const links = [
  { id: 1, href: "/analytic", icon: IoMdAnalytics },
  { id: 2, href: "/analytic/list", icon: IoIosList },
  { id: 3, href: "/analytic/budgets", icon: IoIosWallet },
  { id: 4, href: "/analytic/setting", icon: IoIosSettings },
];

const MobileNavigation = () => {
  return (
    <div className="mobile-links-section">
      {links.map((item) => (
        <Link key={item.id} to={item.href} className="links-content">
          <item.icon size={30} />
        </Link>
      ))}
      <PDF />
    </div>
  );
};

export default MobileNavigation;
