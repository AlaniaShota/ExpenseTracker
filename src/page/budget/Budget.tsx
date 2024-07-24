import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserDetails, Expense } from "../../Interface/Type";
import { db } from "../../components/firebase";

import AddBudget from "./components/AddBudget";
import { useAuth } from "../../context/AuthProvider";

const Budget: React.FC = () => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async (userId: string) => {
    try {
      const q = query(
        collection(db, "expenses"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const expensesBudget = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          category: data.category,
          salary: data.salary,
          rent: data.rent,
          bonuses: data.bonuses,
          freelance: data.freelance,
          ...data,
        } as Expense;
      });
      setExpenses(expensesBudget);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching expenses: ", error);
      setLoading(false);
    }
  };

  const fetchUserData = async (userId: string) => {
    try {
      const docRef = doc(db, "Users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data() as UserDetails);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchExpenses(user.uid);
      fetchUserData(user.uid);
    } else {
      setExpenses([]);
      setLoading(false);
      setUserDetails(null);
    }
  }, [user]);

  return (
    <>
      <h2 className="list-page-title">Transaction</h2>

      {loading ? (
        <p>Loading...</p>
      ) : userDetails ? (
        <div className="list-content">
          <AddBudget
            onAddExpense={() => {
              if (user) {
                fetchExpenses(user.uid);
              }
            }}
          />
        </div>
      ) : (
        <p>No user details found.</p>
      )}
    </>
  );
};

export default Budget;
