import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserDetails, Expense } from "../../Interface/Type";
import EditForm from "../../components/EditForm";
import { db } from "../../components/firebase";
import AddCard from "./component/AddCard";
import ExpenseList from "./component/ExpenseList";
import Modal from "react-modal";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import "./style/index.scss";
import BalanceSummary from "./component/BalanceSummary";
import { useAuth } from "../../context/AuthProvider";

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
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const List: React.FC = () => {
  const { user, expenses, userDetails, setExpenses } = useAuth();
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log(expenses);

  useEffect(() => {
    if (user) {
      setLoading(false); // Assuming data is loaded after user is set
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
        console.error("Error fetching expenses: ", error);
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
      console.error("Error deleting expense: ", error);
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
    <>
      <h2 className="list-page-title">Transaction</h2>

      <div className="list-content">
        {user && (
          <div className="banner">
            <div className="expense-add-content">
              <button
                onClick={() => setIsModalOpen(true)}
                className="expense-add add expense hover-border-5"
              >
                <AiOutlinePlus color="#fff" size={30} />
              </button>
            </div>
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
    </>
  );
};

export default List;
