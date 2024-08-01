import { IoIosList, IoIosWallet, IoMdAnalytics } from "react-icons/io";
import { Link } from "react-router-dom";
import "./style/MobileNavigation.scss";
import { FaUser } from "react-icons/fa";

const links = [
  { id: 1, href: "/analytic", icon: IoMdAnalytics },
  { id: 2, href: "/analytic/list", icon: IoIosList },
  { id: 3, href: "/analytic/budgets", icon: IoIosWallet },
  { id: 4, href: "/analytic/setting", icon: FaUser },
];

const MobileNavigation = () => {
  return (
    <div className="mobile-links-section">
      {links.map((item) => (
        <Link key={item.id} to={item.href} className="links-content">
          <item.icon size={30} />
        </Link>
      ))}
    </div>
  );
};

export default MobileNavigation;
