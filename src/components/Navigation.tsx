import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import { useEffect, useState } from "react";
import { UserDetails } from "../Interface/Type";
import {
  IoMdAnalytics,
  IoIosList,
  IoIosWallet,
  IoMdPeople,
  IoIosLogOut,
} from "react-icons/io";

import "./style/Navigation.scss";
import { Button } from "./Button";

const links = [
  { id: 1, title: "Analytics", href: "/analytic", icon: IoMdAnalytics },
  { id: 2, title: "List", href: "/analytic/list", icon: IoIosList },
  { id: 3, title: "Budgets", href: "/budgets", icon: IoIosWallet },
  { id: 4, title: "Debts", href: "/debts", icon: IoMdPeople },
];

const Navigation: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  useEffect(() => {
    const fetchUserData = async (user: FirebaseUser) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data() as UserDetails);
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User is not logged in");
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user);
      } else {
        setUserDetails(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
      </div>
      <Button logout={handleLogout}>
        <IoIosLogOut size={30} />
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default Navigation;
