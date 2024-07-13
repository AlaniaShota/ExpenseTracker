import React, { useEffect, useState } from "react";
import ExpenseList from "../list/component/ExpenseList";
import { Expense, UserDetails } from "../../Interface/Type";
import { auth, db } from "../../components/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";

// import "../../style/index.css";

const Analytics = () => {
  //   const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchExpenses = async (userId: string) => {
    try {
      const q = query(
        collection(db, "expenses"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const expensesList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          date: data.date,
          category: data.category,
          amount: data.amount,
          type: data.type,
          ...data,
        } as Expense;
      });
      setExpenses(expensesList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching expenses: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchExpenses(user.uid);
        // fetchUserData(user);
      } else {
        setExpenses([]);
        setLoading(false);
        // setUserDetails(null);
      }
    });
    return () => unsubscribe();
  }, []);

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

  //   const handleLogout = async () => {
  //     try {
  //       await auth.signOut();
  //       window.location.href = "/login";
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         console.error("Error logging out:", error.message);
  //       } else {
  //         console.error("Unknown error logging out:", error);
  //       }
  //     }
  //   };

  //   const handleUserProfileClick = () => {
  //     setShowLogout(!showLogout);
  //     setIsClicked(!isClicked);
  //   };

  const deleteExpense = async (id: string) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
      if (auth.currentUser) {
        fetchExpenses(auth.currentUser.uid);
      }
    } catch (error) {
      console.error("Error deleting expense: ", error);
    }
  };

  const editExpense = (expense: Expense) => {
    setCurrentExpense(expense);
    setShowEditForm(true);
  };

  const updateExpenses = () => {
    if (auth.currentUser) {
      fetchExpenses(auth.currentUser.uid);
    }
    setShowEditForm(false);
  };

  return (
    <div className="analytics-content">
      {/* <ExpenseList
            expenses={expenses}
            loading={loading}
            onDelete={deleteExpense}
            onEdit={editExpense}
        /> */}
    </div>
  );
};

export default Analytics;
