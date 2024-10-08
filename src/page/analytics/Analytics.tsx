import { Expense } from "../../Interface/Type";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import AnalyticsBar from "./components/AnalyticsBar";
import "./style/index.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import BalanceSummary from "../../components/BalanceSummary";
import { useMobile } from "../../context/Mobile";
import MobileAnalyticsPie from "./components/MobileAnalyticsPie";
import { toast } from "react-toastify";
import { ANALYTICS } from "./constanta";

const Analytics: React.FC = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const isMobile = useMobile();

  const fetchExpenses = async (userId: string) => {
    try {
      const q = query(
        collection(db, "expenses"),
        where("userId", "==", userId),
      );
      const querySnapshot = await getDocs(q);
      const expensesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          date: data.date,
          category: data.category,
          amount: data.amount,
          type: data.type,
          salary: data.salary,
          rent: data.rent,
          bonuses: data.bonuses,
          freelance: data.freelance,
          ...data,
        } as Expense;
      });
      setExpenses(expensesData);
    } catch (error) {
      toast.error(`Error updating document:${error}`, {
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchExpenses(user.uid);
    } else {
      setExpenses([]);
    }
  }, [user]);

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
      0,
    ).getDate();
    const today = new Date().getDate();
    const daysLeft = daysInMonth - today + 1;

    const dailySpending = remainingAmount / daysLeft;
    return dailySpending > 0 ? dailySpending : 0;
  };

  return (
    <div className="analytics-content">
      <h2 className="page-title">{ANALYTICS}</h2>
      <BalanceSummary
        remainingBalance={calculateRemainingAmount()}
        dailySpending={calculateDailySpending()}
      />
      <div className="analytics-diagram">
        {isMobile ? (
          <MobileAnalyticsPie expenses={expenses} />
        ) : (
          <AnalyticsBar expenses={expenses} />
        )}
      </div>
    </div>
  );
};

export default Analytics;
