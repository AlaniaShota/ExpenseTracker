import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import { useEffect, useState } from "react";
import { Expense, UserDetails } from "../Interface/Type";
import {
  IoMdAnalytics,
  IoIosList,
  IoIosWallet,
  IoMdPeople,
  IoIosLogOut,
} from "react-icons/io";
import { FaFileDownload } from "react-icons/fa";
import "./style/Navigation.scss";
import { Button } from "./Button";
import jsPDF from "jspdf";
import { useAuth } from "../context/AuthProvider";
import PDF from "./PDF";

const links = [
  { id: 1, title: "Analytics", href: "/analytic", icon: IoMdAnalytics },
  { id: 2, title: "List", href: "/analytic/list", icon: IoIosList },
  { id: 3, title: "Budgets", href: "/analytic/budgets", icon: IoIosWallet },
  { id: 4, title: "Debts", href: "/analytic/debts", icon: IoMdPeople },
];

const Navigation: React.FC = () => {
  const { userDetails } = useAuth();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error logging out:", error.message);
      } else {
        console.error("Unknown error logging out:", error);
      }
    }
  };

  return (
    <div className="navigation">
      <div className="user-profile-section">
        <div className="user-icon">
          <FaUser size={30} />{" "}
        </div>
        {userDetails && (
          <h3 className="user-name">Hello {userDetails.firstName}</h3>
        )}
      </div>
      <div className="links-section">
        {links.map((item) => (
          <Link key={item.id} to={item.href} className="links-content">
            <item.icon size={30} />
            <h3 className="link-title">{item.title}</h3>
          </Link>
        ))}
        <PDF />
      </div>
      <Button
        type="submit"
        logout={handleLogout}
        className="btn-logout btn-3 hover-border-5"
      >
        <div className="logout-icon">
          <IoIosLogOut size={35} color="white" />
          <span>Logout</span>
        </div>
      </Button>
    </div>
  );
};

export default Navigation;
