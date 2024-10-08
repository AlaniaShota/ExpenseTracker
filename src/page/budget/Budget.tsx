import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Expense } from "../../Interface/Type";
import { db } from "../../firebase";
import AddBudget from "./components/AddBudget";
import { useAuth } from "../../context/AuthProvider";
import Modal from "react-modal";
import EditForm from "../../components/EditForm";
import ExpenseList from "../../components/ExpenseList";
import { toast } from "react-toastify";
import BalanceSummary from "../../components/BalanceSummary";
import AddBanner from "../../components/AddBanner";
import { PAGE_TITLE } from "./constanta";
import { customStyles } from "../../components/customStyles";

Modal.setAppElement("#root");

const Budget: React.FC = () => {
  const { user, expenses, setExpenses } = useAuth();
  const [incomes, setIncomes] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIncome, setCurrentIncome] = useState<Expense | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (user && expenses) {
      const userIncomes = expenses.filter(
        (expense) => expense.type === "income",
      );
      setIncomes(userIncomes);
      setLoading(false);
    } else {
      setIncomes([]);
      setLoading(true);
    }
  }, [user, expenses]);

  const fetchExpenses = async () => {
    if (user) {
      try {
        const q = query(
          collection(db, "expenses"),
          where("userId", "==", user.uid),
        );
        const querySnapshot = await getDocs(q);
        const updatedExpenses = querySnapshot.docs.map((doc) => {
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
        setExpenses(updatedExpenses);
      } catch (error) {
        toast.error(`Error updating document:${error}`, {
          position: "bottom-right",
        });
      }
    }
  };

  const deleteIncome = async (id: string) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
      setExpenses(
        (prev) => prev?.filter((expense) => expense.id !== id) || null,
      );
      toast.error("Income is deleted", { position: "bottom-right" });
    } catch (error) {
      toast.error(`Error updating document:${error}`, {
        position: "bottom-right",
      });
    }
  };

  const editIncome = (income: Expense) => {
    setCurrentIncome(income);
    setShowEditForm(true);
  };

  const updateIncomes = () => {
    setShowEditForm(false);
    toast.success("Income is updated", { position: "bottom-right" });
  };

  const calculateTotalIncome = () => {
    return incomes.reduce((acc, income) => acc + income.amount, 0);
  };

  const calculateDailyIncome = () => {
    const totalIncome = calculateTotalIncome();
    const daysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
    ).getDate();
    const today = new Date().getDate();
    const daysLeft = daysInMonth - today + 1;

    const dailyIncome = totalIncome / daysLeft;
    return dailyIncome > 0 ? dailyIncome : 0;
  };

  return (
    <div className="expenses-content">
      <h2 className="page-title">{PAGE_TITLE}</h2>
      <div className="list-content">
        {user && (
          <div className="banner">
            <AddBanner open={setIsModalOpen} />
            <BalanceSummary
              remainingBalance={calculateTotalIncome()}
              dailySpending={calculateDailyIncome()}
            />
          </div>
        )}
        {showEditForm && currentIncome ? (
          <EditForm
            expenses={currentIncome}
            onUpdate={updateIncomes}
            onCancel={() => setShowEditForm(false)}
          />
        ) : (
          <ExpenseList
            expenses={incomes}
            loading={loading}
            onDelete={deleteIncome}
            onEdit={editIncome}
          />
        )}
        <div className="list-content">
          <Modal
            style={customStyles}
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="+"
          >
            <AddBudget
             onAddExpense={async () => {
              await fetchExpenses();
              setIsModalOpen(false);
            }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Budget;