import { deleteDoc, doc } from "firebase/firestore";
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
    flexDirection: "column" as "column", // Specify 'column' explicitly as a FlexDirection type
    justifyContent: "center",
    color:'black',
    fontSize:"14px",
    marginRight: "-50%",
    padding:"0px 35px",
    transform: "translate(-50%, -50%)",
  },
};

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
        (expense) => expense.type === "income"
      );
      setIncomes(userIncomes);
      setLoading(false);
    } else {
      setIncomes([]);
      setLoading(true);
    }
  }, [user, expenses]);

  const deleteIncome = async (id: string) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
      setExpenses(
        (prev) => prev?.filter((expense) => expense.id !== id) || null
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
      0
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
              onAddExpense={() => {
                if (user) {
                  setIsModalOpen(false);
                }
              }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Budget;
