import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Expense } from "../../Interface/Type";
import EditForm from "../../components/EditForm";
import { db } from "../../firebase";
import AddCard from "./component/AddCard";
import ExpenseList from "../../components/ExpenseList";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "./style/index.scss";
import { useAuth } from "../../context/AuthProvider";
import BalanceSummary from "../../components/BalanceSummary";
import AddBanner from "../../components/AddBanner";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(152, 152, 152, 0.718)",
  
    zIndex: "100",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    height:'540px',
    width:"340px",
    display: "flex",
    flexDirection: "column" as "column", 
    justifyContent: "center",
    color:'black',
    fontSize:"14px",
    marginRight: "-50%",
    padding:"0px 35px",
    transform: "translate(-50%, -50%)",
  },
};

const List: React.FC = () => {
  const { user, expenses, setExpenses } = useAuth();
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchExpenses = async () => {
    if (user) {
      try {
        const q = query(
          collection(db, "expenses"),
          where("userId", "==", user.uid)
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

  const deleteExpense = async (id: string) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
      fetchExpenses();
      toast.error("Expense is deleted", {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(`Error updating document:${error}`, {
        position: "bottom-right",
      });
    }
  };

  const editExpense = (expense: Expense) => {
    setCurrentExpense(expense);
    setShowEditForm(true);
  };

  const updateExpenses = async () => {
    await fetchExpenses();
    toast.success("Expense is updated", {
      position: "bottom-right",
    });
    setShowEditForm(false);
  };

  const calculateIncome = () => {
    return (
      expenses
        ?.filter((expense) => expense.type === "income")
        .reduce((acc, expense) => acc + expense.amount, 0) || 0
    );
  };

  const calculateExpenses = () => {
    return (
      expenses
        ?.filter((expense) => expense.type === "expense")
        .reduce((acc, expense) => acc + expense.amount, 0) || 0
    );
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
    <div className="expenses-content">
      <h2 className="page-title">Transaction</h2>

      <div className="list-content">
        {user && (
          <div className="banner">
            <AddBanner open={setIsModalOpen} />
            <BalanceSummary
              remainingBalance={calculateRemainingAmount()}
              dailySpending={calculateDailySpending()}
            />
          </div>
        )}
        {showEditForm && currentExpense ? (
          <EditForm
            expenses={currentExpense}
            onUpdate={updateExpenses}
            onCancel={() => setShowEditForm(false)}
          />
        ) : (
          <ExpenseList
            expenses={expenses || []}
            loading={loading}
            onDelete={deleteExpense}
            onEdit={editExpense}
          />
        )}
        <Modal
          style={customStyles}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="+"
        >
          <AddCard
            onAddExpense={async () => {
              await fetchExpenses();
              setIsModalOpen(false);
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default List;
