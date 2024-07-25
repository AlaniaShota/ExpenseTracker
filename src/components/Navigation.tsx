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
import jsPDF from "jspdf";
import { useAuth } from "../context/AuthProvider";

const links = [
  { id: 1, title: "Analytics", href: "/analytic", icon: IoMdAnalytics },
  { id: 2, title: "List", href: "/analytic/list", icon: IoIosList },
  { id: 3, title: "Budgets", href: "/analytic/budgets", icon: IoIosWallet },
  { id: 4, title: "Debts", href: "/analytic/debts", icon: IoMdPeople },
];

const Navigation: React.FC = () => {
  // const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const { userDetails } = useAuth();
  console.log(userDetails, "userDetails");

  // useEffect(() => {
  //   const fetchUserData = async (user: FirebaseUser) => {
  //     if (user) {
  //       const docRef = doc(db, "Users", user.uid);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         setUserDetails(docSnap.data() as UserDetails);
  //       } else {
  //         console.log("No such document!");
  //       }
  //     } else {
  //       console.log("User is not logged in");
  //     }
  //   };

  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       fetchUserData(user);
  //     } else {
  //       setUserDetails(null);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  // const handleLogout = async () => {
  //   try {
  //     await auth.signOut();
  //     window.location.href = "/login";
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error("Error logging out:", error.message);
  //     } else {
  //       console.error("Unknown error logging out:", error);
  //     }
  //   }
  // };

  // const generatePDF = () => {
  //   if (!userDetails) return;

  //   const doc = new jsPDF();

  //   doc.setFontSize(18);
  //   doc.text(`${userDetails.firstName} ${userDetails.lastName}`, 10, 30);

  //   doc.setFontSize(14);
  //   doc.text(`Income: $${userDetails.income}`, 10, 50);
  //   doc.text(`Expenses: $${userDetails.expenses}`, 10, 60);

  //   if (userDetails.expensesList && userDetails.expensesList.length > 0) {
  //     let y = 70; // Начальная позиция Y для списка расходов
  //     userDetails.expensesList.forEach((expense, index) => {
  //       doc.text(
  //         `${index + 1}. ${expense.category}: $${expense.amount}`,
  //         10,
  //         y
  //       );
  //       y += 10; // Смещение вниз для следующего элемента
  //     });
  //   }

  //   doc.save("user_report.pdf");
  // };

  // return (
  //   <div className="navigation">
  //     <div className="user-profile-section">
  //       <div className="user-icon">
  //         <FaUser size={30} />{" "}
  //       </div>
  //       {userDetails && (
  //         <h3 className="user-name">Hello {userDetails.firstName}</h3>
  //       )}
  //     </div>
  //     <div className="links-section">
  //       {links.map((item) => (
  //         <Link key={item.id} to={item.href} className="links-content">
  //           <item.icon size={30} />
  //           <h3 className="link-title">{item.title}</h3>
  //         </Link>
  //       ))}
  //     </div>
  //     <Button
  //       type="submit"
  //       logout={handleLogout}
  //       className="btn-logout btn-3 hover-border-5"
  //     >
  //       <div className="logout-icon">
  //         <IoIosLogOut size={35} color="white" />
  //         <span>Logout</span>
  //       </div>
  //     </Button>
  //     <Button
  //       type="button"
  //       onClick={generatePDF}
  //       className="btn-logout btn-3 hover-border-5"
  //     >
  //       <div className="pdf-icon">
  //         <IoIosLogOut size={35} color="white" />
  //         <span>Download PDF</span>
  //       </div>
  //     </Button>
  //   </div>
  // );
};

export default Navigation;
