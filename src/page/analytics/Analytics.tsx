import { Expense } from "../../Interface/Type";
import { auth, db } from "../../components/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import AnalyticsBar from "./components/AnalyticsBar";
import BalanceSummary from "../list/component/BalanceSummary";
import "./style/index.scss";
import { useEffect, useState } from "react";

const Analytics: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

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
      } else {
        setExpenses([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const calculateIncome = () => {
    return expenses
      .filter((expense) => expense.type === "income")
      .reduce((acc, expense) => acc + expense.amount, 0);
  };

  const calculateExpenses = () => {
    return expenses
      .filter((expense) => expense.type === "expense")
      .reduce((acc, expense) => acc + expense.amount, 0);
  };

  const calculateRemainingAmount = () => {
    return calculateIncome() - calculateExpenses();
  };

  const calculateDailySpending = () => {
    const remainingAmount = calculateRemainingAmount();
    const daysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();
    const today = new Date().getDate();
    const daysLeft = daysInMonth - today + 1;

    const dailySpending = remainingAmount / daysLeft;
    return dailySpending > 0 ? dailySpending : 0;
  };
  return (
    <div className="analytics-content">
      <h2 className="analytics-page-title">Analytics</h2>
      <BalanceSummary
        remainingBalance={calculateRemainingAmount()}
        dailySpending={calculateDailySpending()}
      />
      <div className="analytics-secondary-diagram">
        <AnalyticsBar expenses={expenses} />
      </div>
    </div>
  );
};

export default Analytics;
