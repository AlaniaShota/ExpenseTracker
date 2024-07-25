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
import { db } from "../../components/firebase";
import AddBudget from "./components/AddBudget";
import { useAuth } from "../../context/AuthProvider";
import { AiOutlinePlus } from "react-icons/ai";
import BalanceSummary from "../list/component/BalanceSummary";
import Modal from "react-modal";
import EditForm from "../../components/EditForm";
import ExpenseList from "../list/component/ExpenseList";
import { toast } from "react-toastify";

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

const Budget: React.FC = () => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [incomes, setIncomes] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIncome, setCurrentIncome] = useState<Expense | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchIncomes = async (userId: string) => {
    try {
      const q = query(
        collection(db, "expenses"),
        where("userId", "==", userId),
        where("type", "==", "income")
      );
      const querySnapshot = await getDocs(q);
      const incomesList = querySnapshot.docs.map((doc) => {
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
      setIncomes(incomesList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching incomes: ", error);
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
      fetchIncomes(user.uid);
      fetchUserData(user.uid);
    } else {
      setIncomes([]);
      setLoading(false);
      setUserDetails(null);
    }
  }, [user]);

  const deleteIncome = async (id: string) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
      if (user) {
        fetchIncomes(user.uid);
        toast.error("Income is deleted", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error deleting income: ", error);
    }
  };

  const editIncome = (income: Expense) => {
    setCurrentIncome(income);
    setShowEditForm(true);
  };

  const updateIncomes = () => {
    if (user) {
      fetchIncomes(user.uid);
      toast.success("Income is updated", {
        position: "bottom-right",
      });
    }
    setShowEditForm(false);
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
    <>
      <h2 className="list-page-title">Income</h2>
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
                fetchIncomes(user.uid);
              }
            }}
          />
        </Modal>
      </div>
    </>
  );
};

export default Budget;
